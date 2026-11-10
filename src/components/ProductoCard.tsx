"use client";
import { useRouter } from "next/navigation";
import type { Producto } from "@/db/schema"

export default function ProductoCard({ prod }: { prod: Producto }) {
    const router = useRouter();

    return (
        <article className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        {prod.marca}
                    </p>
                    <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-neutral-900">
                        {prod.modelo}
                    </h3>
                </div>
                <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                    {prod.tipo}
                </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div>
                    <dt className="text-neutral-500">Almacenamiento</dt>
                    <dd className="font-medium text-neutral-900">{prod.almacenamiento} GB</dd>
                </div>
                <div>
                    <dt className="text-neutral-500">Color</dt>
                    <dd className="font-medium text-neutral-900">{prod.color}</dd>
                </div>
                <div>
                    <dt className="text-neutral-500">Estado</dt>
                    <dd className="font-medium text-neutral-900">{prod.estado}</dd>
                </div>
                {prod.estetica != null && (
                    <div>
                        <dt className="text-neutral-500">Estética</dt>
                        <dd className="font-medium text-neutral-900">{prod.estetica}/10</dd>
                    </div>
                )}
            </dl>

            <button
                type="button"
                className="mt-auto w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                onClick={() => router.push(`/catalogo/${prod.id}`)}
            >
                Ver detalles
            </button>
        </article>
    )
}
