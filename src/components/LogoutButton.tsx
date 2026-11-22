"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/login")
                    router.refresh()
                }
            }
        })
    }

    return (
        <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
        >
            Cerrar Sesión
        </button>
    )
}
