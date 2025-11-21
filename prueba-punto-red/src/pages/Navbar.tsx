import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-white text-lg font-bold cursor-pointer"
                onClick={() => navigate("/recarga")}>
                PuntoRed
            </h1>

            <div className="flex items-center gap-4">
                {/* Botón ir a Recargas */}
                <button
                    onClick={() => navigate("/recarga")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Recarga
                </button>

                {/* Botón ir a Transacciones */}
                <button
                    onClick={() => navigate("/transactions")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Transacciones
                </button>

                {/* Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
