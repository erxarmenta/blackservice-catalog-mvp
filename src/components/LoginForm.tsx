"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const fieldClass = "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
const labelClass = "text-xs font-medium uppercase tracking-wide text-neutral-500"
const errorClass = "text-xs text-red-500"

interface LoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>();

    const login = async ({ email, password }: LoginData) => {
        const { error } = await authClient.signIn.email({
            email: email.trim().toLowerCase(),
            password,
        });

        if (error) {
            toast.error("Correo o contraseña incorrecta");
            return
        }

        router.replace("/admin");
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit(login)}
            className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="mb-6">
                <h1 className="text-lg font-semibold text-neutral-900">Acceso administrador</h1>
                <p className="mt-1 text-sm text-neutral-500">Ingresa tus credenciales para continuar.</p>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={labelClass}>Correo</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        className={fieldClass}
                        {...register("email", { required: "Ingresa tu correo" })}
                    />
                    {errors.email && <span className={errorClass}>{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className={labelClass}>Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className={fieldClass}
                        {...register("password", { required: "Ingresa tu contraseña" })}
                    />
                    {errors.password && <span className={errorClass}>{errors.password.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                </button>
            </div>
        </form>
    )

}