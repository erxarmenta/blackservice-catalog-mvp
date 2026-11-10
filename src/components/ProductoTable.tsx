"use client";
import { Fragment, useEffect, useState } from 'react';
import { obtenerProductos, setProductoVendido, setProductoDisponible } from '@/app/actions';
import { type Producto } from '@/db/schema';

const thClass = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500";
const tdClass = "px-4 py-3 text-sm text-neutral-700 whitespace-nowrap";
const buttonBase = "rounded-lg px-3 py-1.5 text-xs font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2";
const detailLabelClass = "text-xs font-medium uppercase tracking-wide text-neutral-400";
const detailValueClass = "mt-0.5 text-sm text-neutral-800";

export default function ProductoTable() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchProductos = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const marcarProductoVendido = async (id: string) => {
        await setProductoVendido(id);
        fetchProductos();
    }

    const marcarProductoDisponible = async (id: string) => {
        await setProductoDisponible(id);
        fetchProductos()
    }

    const toggleExpanded = (id: string) => {
        setExpandedId((current) => (current === id ? null : id));
    };

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                        <th className={`${thClass} w-10`} aria-label="Detalle" />
                        <th className={thClass}>SKU</th>
                        <th className={thClass}>Marca</th>
                        <th className={thClass}>Modelo</th>
                        <th className={thClass}>Tipo</th>
                        <th className={thClass}>Estado</th>
                        <th className={thClass}>Disponibilidad</th>
                        <th className={thClass}>Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {productos.map((producto) => {
                        const isExpanded = expandedId === producto.id;

                        return (
                            <Fragment key={producto.id}>
                                <tr className="transition hover:bg-neutral-50">
                                    <td className={tdClass}>
                                        <button
                                            type="button"
                                            onClick={() => toggleExpanded(producto.id)}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
                                            aria-expanded={isExpanded}
                                            aria-label={isExpanded ? "Ocultar detalle" : "Ver detalle"}
                                        >
                                            <span className={`text-xs transition ${isExpanded ? "rotate-90" : ""}`}>›</span>
                                        </button>
                                    </td>
                                    <td className={`${tdClass} font-medium text-neutral-900`}>{producto.sku}</td>
                                    <td className={tdClass}>{producto.marca}</td>
                                    <td className={tdClass}>{producto.modelo}</td>
                                    <td className={tdClass}>{producto.tipo}</td>
                                    <td className={tdClass}>
                                        <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                                            {producto.estado === "NUEVO" ? "Nuevo" : "Seminuevo"}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${producto.disponible
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                            {producto.disponible ? "Disponible" : "Vendido"}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex flex-col gap-1.5">
                                            <button type="button" className={`${buttonBase} bg-red-500 hover:bg-red-600 focus:ring-red-500`}>Eliminar</button>
                                            <button type="button" className={`${buttonBase} bg-green-500 hover:bg-green-600 focus:ring-green-500`}>Editar</button>
                                            {
                                                producto.disponible ?
                                                    <button type="button" className={`${buttonBase} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500`} onClick={() => marcarProductoVendido(producto.id)}>Vendido</button> :
                                                    <button type="button" className={`${buttonBase} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500`} onClick={() => marcarProductoDisponible(producto.id)}>Disponible</button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr className="bg-neutral-50/80">
                                        <td colSpan={8} className="px-4 py-4 sm:px-6">
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                                <div>
                                                    <p className={detailLabelClass}>Almacenamiento</p>
                                                    <p className={detailValueClass}>{producto.almacenamiento}GB</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>Color</p>
                                                    <p className={detailValueClass}>{producto.color}</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>Estética</p>
                                                    <p className={detailValueClass}>{producto.estetica ?? "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>RAM</p>
                                                    <p className={detailValueClass}>{producto.ram ?? "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>Condición de batería</p>
                                                    <p className={detailValueClass}>{producto.condicionBateria ?? "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>Procesador</p>
                                                    <p className={detailValueClass}>{producto.procesador ? producto.procesador : "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className={detailLabelClass}>Sistema Operativo</p>
                                                    <p className={detailValueClass}>{producto.so ?? "N/A"}</p>
                                                </div>
                                                <div className="col-span-2 sm:col-span-4">
                                                    <p className={detailLabelClass}>Observaciones</p>
                                                    <p className={`${detailValueClass} whitespace-normal`}>
                                                        {producto.observaciones?.trim() ? producto.observaciones : "Sin observaciones"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        );
                    })}
                    {productos.length === 0 && (
                        <tr>
                            <td colSpan={8} className="px-4 py-10 text-center text-sm text-neutral-400">
                                No hay productos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
