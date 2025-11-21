import { useState, useEffect } from "react";
import RecargaResult from "./RecargaModal";
import Navbar from "./Navbar";

function Recarga() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierId, setSupplierId] = useState("");
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState("");
    const [recargaResponse, setRecargaResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Obtener proveedores al cargar la página
    useEffect(() => {
        fetch("http://localhost:8080/suppliers")
            .then((res) => res.json())
            .then((data) => setSuppliers(data))
            .catch((err) => console.error(err));
    }, []);

    const handleBuy = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setTicket(null);
        setMessage("");

        const body = {
            supplierId,
            value: parseInt(amount),
            cellPhone: phone,
        };

        try {
            const res = await fetch("http://localhost:8080/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            // Si el backend regresó un error 400, 404, 500...
            if (!res.ok) {
                const errorJson = await res.json();
                setErrorMessage(errorJson.message || "Error desconocido");
                return;
            }

            // Respuesta correcta
            const data = await res.json();
            setRecargaResponse(data);
            setTicket(data.ticket);
            setMessage(data.message);

        } catch (error) {
            setErrorMessage("Error de conexión con el servidor");
        }
    };


    return (

        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <form onSubmit={handleBuy}>

                <div className="space-y-12 px-4 flex flex-col items-center justify-center">
                    <div className="border rounded-xl p-8 border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Hacer Recarga</h2>
                        <div className="flex flex-wrap items-center gap-x-6">
                            <label>Proveedor:</label>
                        </div>

                        <div className="mt-1 relative inline-flex">
                            <select
                                value={supplierId}
                                onChange={(e) => setSupplierId(e.target.value)}
                                required
                                className="border border-gray-300 rounded-full text-white h-10 pl-5 pr-10 bg-gray-900 hover:border-gray-400 focus:outline-none appearance-none"
                            >
                                <option className="block text-sm/6 font-medium text-white" value="">Selecciona proveedor</option>
                                {suppliers.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label className="block text-sm/6 font-medium text-white">Número de
                                        teléfono:</label>
                                    <div className="mt-2">
                                        <div
                                            className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                            <input
                                                value={phone}
                                                maxLength={10}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                type="text"
                                                placeholder="3001234567"
                                                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label className="block text-sm/6 font-medium text-white">Monto:</label>
                                    <div className="mt-2">
                                        <div
                                            className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="5000"
                                                required
                                                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <br/><br/>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    type="submit">Comprar</button>
                        </div>
                    </div>


            </form>

            {recargaResponse && (
                <RecargaResult response={recargaResponse} />
            )}

            {errorMessage && (
                <div className="mt-6 p-4 w-full max-w-md text-red-400 border border-red-600 rounded-lg text-center">
                    {errorMessage}
                </div>
            )}

        </div>
    );
}

export default Recarga;
