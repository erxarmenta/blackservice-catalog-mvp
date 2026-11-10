"use client";
import { obtenerProductosDisponibles } from "@/app/actions";
import { useState, useEffect } from "react";
import { type Producto } from '@/db/schema';
import ProductoCard from "@/components/ProductoCard";

export default function CatalogoPage() {
    const [productos, setProductos] = useState<Producto[]>([]);

    const fetchProductos = async () => {
        const data = await obtenerProductosDisponibles();
        setProductos(data);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <main className="min-h-full bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <header>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                        Catálogo Blackservice
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Productos disponibles en inventario.
                    </p>
                </header>

                {productos.length === 0 ? (
                    <p className="text-sm text-neutral-500">No hay productos disponibles.</p>
                ) : (
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {productos.map((prod) => (
                            <ProductoCard key={prod.id} prod={prod} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    )
}
