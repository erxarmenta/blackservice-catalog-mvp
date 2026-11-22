import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { and, eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { createInterface } from "node:readline/promises";
import { user, account, session } from "../src/db/auth-schema";
import { Akshar } from "next/font/google";

config({ path: ".env.local" });

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;
const reset = process.argv.includes("--reset");

async function ask(question: string): Promise<string> {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question(question);
    rl.close();
    return answer.trim();
}

function askHidden(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        const stdin = process.stdin;
        let value = "";
        process.stdout.write(prompt);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding("utf8");

        const onData = (chunk: string) => {
            for (const ch of chunk) {
                if (ch === "\r" || ch === "\n") {
                    stdin.setRawMode(false);
                    stdin.pause();
                    stdin.off("data", onData);
                    process.stdout.write("\n");
                    return resolve(value);
                }
                if (ch === "\u0003") process.exit(1); // Ctrl+C
                if (ch === "\u007f") value = value.slice(0, -1); // Backspace
                else value += ch;
            }
        };
        stdin.on("data", onData);
    });
}

async function main() {
    const url = process.env.TURSO_CONNECTION_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url || !authToken) {
        throw new Error("Faltan TURSO_CONNECTION_URL / TURSO_AUTH_TOKEN");
    }

    const client = createClient({ url, authToken });
    const db = drizzle(client);
    console.log(`Base de datos: ${new URL(url).host}`)

    const email = (await ask("Correo Electronico del admin: ")).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Correo no válido");

    const [existing] = await db.select().from(user).where(eq(user.email, email));
    if (existing && !reset) {
        throw new Error("Ese usuario ya existe. Usa --reset para cambiar su contraseña.");
    }
    if (!existing && reset) {
        throw new Error("No existe un usuario con ese correo para resetear.");
    }

    const name = existing ? existing.name : (await ask("Nombre (Enter = Admin): ")) || "Admin";
    const password = await askHidden("Contraseña: ")
    const confirm = await askHidden("Repite la contraseña: ")
    if (password !== confirm) throw new Error("Las contraseñas no coinciden");
    if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
        throw new Error(`La contraseña debe tener entre ${MIN_PASSWORD} y ${MAX_PASSWORD} caracteres`);
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    if (existing) {
        await db.batch([
            db
                .update(account)
                .set({ password: passwordHash, updatedAt: now })
                .where(and(eq(account.userId, existing.id), eq(account.providerId, "credential"))),
            db.delete(session).where(eq(session.userId, existing.id)),
        ]);
        console.log("Contraseña actualizada y sesiones cerradas.")
    } else {
        const userId = crypto.randomUUID();
        await db.batch([
            db.insert(user).values({
                id: userId, name, email, emailVerified: true, createdAt: now, updatedAt: now
            }),
            db.insert(account).values({
                id: crypto.randomUUID(),
                accountId: userId,
                providerId: "credential",
                userId,
                password: passwordHash,
                createdAt: now,
                updatedAt: now,
            }),
        ]);
        console.log(`Admin creado: ${email}`);
    }
    client.close();
}

main().catch((e) => {
    console.error(`\nError: ${e.message}`);
    process.exit(1);
});