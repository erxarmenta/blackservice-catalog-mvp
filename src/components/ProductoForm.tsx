"use client"
import { type NuevoProducto } from "@/db/schema"
import { useForm } from "react-hook-form"
import { agregarProducto } from "@/app/actions"

const fieldClass = "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
const labelClass = "text-xs font-medium uppercase tracking-wide text-neutral-500"
const errorClass = "text-xs text-red-500"

export default function ProductoForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NuevoProducto>();

    const addProduct = async (data: NuevoProducto) => {
        console.log("Agregando producto...", data)
        await agregarProducto(data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(addProduct)}
            className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    <label className={labelClass}>Almacenamiento</label>
                    <input type="number" className={fieldClass} {...register("almacenamiento", { required: "Es necesario la capacidad de almacenamiento del dispositivo" })} />
                    {errors.almacenamiento && <span className={errorClass}>{errors.almacenamiento.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>color</label>
                    <input type="text" className={fieldClass} {...register("color", { required: "Es necesario indicar el color del dispositivo" })} />
                    {errors.color && <span className={errorClass}>{errors.color.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Estado</label>
                    <select className={fieldClass} {...register("estado", { required: "Es necesario seleccionar el estado del dispositivo" })}>
                        <option value="SEMINUEVO">Seminuevo</option>
                        <option value="NUEVO">Nuevo</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Estetica</label>
                    <input type="number" min={8} max={10} className={fieldClass} {...register("estetica")} />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className={labelClass}>Observaciones</label>
                    <textarea className={`${fieldClass} min-h-24 resize-y`} {...register("observaciones")}></textarea>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Memoria RAM</label>
                    <input type="text" className={fieldClass} {...register("ram")} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Condición de batería</label>
                    <input type="number" className={fieldClass} {...register("condicionBateria")} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Procesador</label>
                    <input type="text" className={fieldClass} {...register("procesador")} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Tipo</label>
                    <select className={fieldClass} {...register("tipo", { required: "Es necesario un tipo de producto" })}>
                        <option value="CELULAR">Celular</option>
                        <option value="LAPTOP">Laptop</option>
                        <option value="TABLET">Tablet</option>
                        <option value="CONSOLA">Consola</option>
                        <option value="RELOJ">Reloj</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Sistema Operativo</label>
                    <select className={fieldClass} {...register("so")}>
                        <option value="WINDOWS">Windows</option>
                        <option value="ANDROID">Android</option>
                        <option value="IOS">IOS</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 sm:col-span-2"
                >
                    Agregar Producto
                </button>
            </div>
        </form>
    )
}
