"use client"
import { type NuevoProducto } from "@/db/schema"
import { useForm } from "react-hook-form"
import { agregarProducto, obtenerProductos } from "@/app/actions"

const fieldClass = "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
const labelClass = "text-xs font-medium uppercase tracking-wide text-neutral-500"
const errorClass = "text-xs text-red-500"
const sectionTitleClass = "text-sm font-semibold text-neutral-900"

type Props = {
    onSuccess?: () => void | Promise<void>;
}

export default function ProductoForm({ onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NuevoProducto>();

    const addProduct = async (data: NuevoProducto) => {
        console.log("Agregando producto...", data)
        await agregarProducto(data);
        reset();
        await onSuccess?.();
    };

    return (
        <form
            onSubmit={handleSubmit(addProduct)}
            className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Agregar producto</h2>
                <p className="mt-1 text-sm text-neutral-500">Completa los datos del dispositivo.</p>
            </div>

            <div className="flex flex-col gap-8">
                <section className="flex flex-col gap-4">
                    <h3 className={sectionTitleClass}>Identificación</h3>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Tipo</label>
                            <select className={fieldClass} {...register("tipo", { required: "Es necesario un tipo de producto" })}>
                                <option value="CELULAR">Celular</option>
                                <option value="LAPTOP">Laptop</option>
                                <option value="TABLET">Tablet</option>
                                <option value="CONSOLA">Consola</option>
                                <option value="RELOJ">Reloj</option>
                            </select>
                            {errors.tipo && <span className={errorClass}>{errors.tipo.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>SKU</label>
                            <input type="number" className={fieldClass} {...register("sku", { required: "Es necesario ingresar el SKU del dispositivo" })} />
                            {errors.sku && <span className={errorClass}>{errors.sku.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Marca</label>
                            <input type="text" className={fieldClass} {...register("marca", { required: "Es necesario ingresar la marca del dispositivo" })} />
                            {errors.marca && <span className={errorClass}>{errors.marca.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Modelo</label>
                            <input type="text" className={fieldClass} {...register("modelo", { required: "Es necesario ingresar el modelo del dispositivo" })} />
                            {errors.modelo && <span className={errorClass}>{errors.modelo.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Precio</label>
                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                className={fieldClass}
                                {...register("precio", {
                                    required: "Es necesario ingresar el precio del dispositivo",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "El precio no puede ser negativo" },
                                })}
                            />
                            {errors.precio && <span className={errorClass}>{errors.precio.message}</span>}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h3 className={sectionTitleClass}>Especificaciones</h3>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Color</label>
                            <input type="text" className={fieldClass} {...register("color", { required: "Es necesario indicar el color del dispositivo" })} />
                            {errors.color && <span className={errorClass}>{errors.color.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Almacenamiento</label>
                            <input type="number" className={fieldClass} {...register("almacenamiento", { required: "Es necesario la capacidad de almacenamiento del dispositivo" })} />
                            {errors.almacenamiento && <span className={errorClass}>{errors.almacenamiento.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Memoria RAM</label>
                            <input type="text" className={fieldClass} {...register("ram")} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Procesador</label>
                            <input type="text" className={fieldClass} {...register("procesador")} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Sistema Operativo</label>
                            <select className={fieldClass} {...register("so")}>
                                <option value="WINDOWS">Windows</option>
                                <option value="ANDROID">Android</option>
                                <option value="IOS">IOS</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h3 className={sectionTitleClass}>Condición</h3>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Estado</label>
                            <select className={fieldClass} {...register("estado", { required: "Es necesario seleccionar el estado del dispositivo" })}>
                                <option value="SEMINUEVO">Seminuevo</option>
                                <option value="NUEVO">Nuevo</option>
                            </select>
                            {errors.estado && <span className={errorClass}>{errors.estado.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Estética</label>
                            <input type="number" min={8} max={10} className={fieldClass} {...register("estetica")} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Condición de batería</label>
                            <input type="number" className={fieldClass} {...register("condicionBateria")} />
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h3 className={sectionTitleClass}>Notas</h3>
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Observaciones</label>
                        <textarea className={`${fieldClass} min-h-24 resize-y`} {...register("observaciones")}></textarea>
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                >
                    Agregar Producto
                </button>
            </div>
        </form>
    )
}
