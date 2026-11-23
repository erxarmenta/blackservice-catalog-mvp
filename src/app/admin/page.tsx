import { Suspense } from "react";
import type { Metadata } from "next";
import AdminCatalogo from "@/components/AdminCatalogo";
import LogoutButton from "@/components/LogoutButton";
import { requireAdmin } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Administrar | Catálogo Blackservice",
  robots: { index: false, follow: false },
};

async function AdminGuard({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}

export default function AdminPage() {
  return (
    <main className="min-h-full bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12">
      <Suspense fallback={<p className="text-sm text-neutral-500">Cargando...</p>}>
        <AdminGuard>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Administrar catálogo
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Agrega productos y gestiona su disponibilidad.
                </p>
              </div>
              <LogoutButton />
            </header>

            <AdminCatalogo />
          </div>
        </AdminGuard>
      </Suspense>
    </main>
  );
}