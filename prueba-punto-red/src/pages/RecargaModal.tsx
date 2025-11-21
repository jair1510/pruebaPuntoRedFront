import { useState, useEffect } from "react";

function RecargaModal({ response }) {
    const [visible, setVisible] = useState(true);

    // Mostrar el modal cada vez que cambie la respuesta
    useEffect(() => {
        setVisible(true);
    }, [response]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-600 rounded-lg shadow-lg p-6 w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Recarga Exitosa</h2>
                <p><strong>Transaction ID:</strong> {response.transactionalID}</p>
                <p><strong>Celular:</strong> {response.cellPhone}</p>
                <p><strong>Valor:</strong> ${response.value}</p>
                <p className="mt-2">{response.message}</p>
                <button
                    className="mt-4 bg-white text-green-600 px-4 py-2 rounded hover:bg-white"
                    onClick={() => setVisible(false)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default RecargaModal;
