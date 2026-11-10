import ProductoForm from "@/components/ProductoForm";
import ProductoTable from "@/components/ProductoTable";

export default function AdminPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-neutral-50 px-4 py-12">
      <ProductoForm />
      <ProductoTable />
    </main>
  )
}
