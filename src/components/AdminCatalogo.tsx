"use client"
import { useEffect, useState } from "react";
import ProductoForm from "./ProductoForm";
import ProductoTable from "./ProductoTable";
import { obtenerProductos } from "@/app/actions";
import type { Producto } from "@/db/schema";


export default function AdminCatalogo() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

    const fetchProductos = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    }

    const handleSuccess = async () => {
        setProductoEditar(null);
        await fetchProductos();
    };

    useEffect(() => {
        fetchProductos();
    }, [])

    return (
        <>
            <ProductoForm
                productoEditar={productoEditar}
                onSuccess={handleSuccess}
                onCancelEdit={() => setProductoEditar(null)}
            />
            <section className="flex w-full flex-col gap-3">
                <h2 className="text-sm font-medium uppercase tracking-wide
  text-neutral-500">
                    Inventario
                </h2>
                <ProductoTable productos={productos}
                    onRefresh={fetchProductos}
                    onEdit={setProductoEditar} />
            </section>
        </>
    )

}
