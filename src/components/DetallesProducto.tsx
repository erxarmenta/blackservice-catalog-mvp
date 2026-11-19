"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import type { Producto } from "@/db/schema";
import { obtenerProductoId } from "@/app/actions";

export default function DetallesProducto() {
    const [actualProd, setActualProd] = useState<Producto>();
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    console.log(actualProd)

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(price);

    const fetchProducto = async (productId: string) => {
        const data = await obtenerProductoId(productId);
        setActualProd(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducto(id as string);
    }, [id])

    const specs = actualProd
        ? [
            { label: "Tipo", value: actualProd.tipo },
            { label: "Almacenamiento", value: `${actualProd.almacenamiento} GB` },
            { label: "Color", value: actualProd.color },
            { label: "Estado", value: actualProd.estado },
            ...(actualProd.estetica != null
                ? [{ label: "Estética", value: `${actualProd.estetica}/10` }]
                : []),
            ...(actualProd.ram != null || actualProd.ram != ""
                ? [{ label: "RAM", value: `${actualProd.ram} GB` }]
                : []),
            ...(actualProd.condicionBateria != null
                ? [{ label: "Batería", value: `${actualProd.condicionBateria}%` }]
                : []),
            ...(actualProd.procesador
                ? [{ label: "Procesador", value: actualProd.procesador }]
                : []),
            ...(actualProd.so
                ? [{ label: "Sistema", value: actualProd.so }]
                : []),
        ]
        : [];

    return (
        <main className="min-h-full bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                            Blackservice
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
                            Detalle del producto
                        </h1>
                    </div>
                    <button
                        type="button"
                        className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                        onClick={() => router.push("/catalogo")}
                    >
                        Regresar al catálogo
                    </button>
                </header>

                {loading ? (
                    <p className="text-sm text-neutral-500">Cargando producto...</p>
                ) : !actualProd ? (
                    <section className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-sm text-neutral-500">No se encontró este producto.</p>
                    </section>
                ) : !actualProd.disponible ? (
                    <section className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-base font-medium text-neutral-900">
                            Este producto ya no está disponible.
                        </p>
                        <button
                            type="button"
                            className="mt-4 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                            onClick={() => router.push("/catalogo")}
                        >
                            Ver otros productos
                        </button>
                    </section>
                ) : (
                    <>
                        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="aspect-square bg-neutral-100 lg:aspect-auto lg:min-h-[420px]">
                                    <img
                                        src={actualProd.imagenUrl}
                                        alt={`${actualProd.marca} ${actualProd.modelo}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-6 p-6 sm:p-8">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                                                {actualProd.marca}
                                            </p>
                                            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
                                                {actualProd.modelo}
                                            </h2>
                                        </div>
                                        <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                                            {actualProd.tipo}
                                        </span>
                                    </div>

                                    <p className="text-3xl font-semibold tracking-tight text-neutral-900">
                                        {formatPrice(actualProd.precio)}
                                    </p>

                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                        {specs.map((spec) => (
                                            <div key={spec.label}>
                                                <dt className="text-neutral-500">{spec.label}</dt>
                                                <dd className="font-medium text-neutral-900">{spec.value}</dd>
                                            </div>
                                        ))}
                                    </dl>

                                    {actualProd.observaciones && (
                                        <div>
                                            <h3 className="text-sm font-medium text-neutral-500">
                                                Observaciones
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                                                {actualProd.observaciones}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        className="mt-auto w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 sm:w-auto"
                                    >
                                        Contactar
                                    </button>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    )
}
