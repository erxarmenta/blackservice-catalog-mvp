import type { Metadata } from "next"
import LoginForm from "@/components/LoginForm"

export const metadata: Metadata = {
    title: "Acceso | Cátalogo Blackservice",
    robots: { index: false, follow: false }
}

export default function LoginPage() {
    return (
        <main className="flex min-h-full items-center justify-center bg-neutral-50 px-4 py-10">
            <LoginForm />
        </main>
    )
}
