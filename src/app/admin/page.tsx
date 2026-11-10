import ProductoForm from "@/components/ProductoForm";
import ProductoTable from "@/components/ProductoTable";

export default function AdminPage() {
  return (
    <main className="min-h-full bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Administrar catálogo
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Agrega productos y gestiona su disponibilidad.
          </p>
        </header>

        <ProductoForm />

        <section className="flex w-full flex-col gap-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Inventario
          </h2>
          <ProductoTable />
        </section>
      </div>
    </main>
  )
}
