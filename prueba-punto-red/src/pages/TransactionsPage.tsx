import { useState, useEffect } from 'react';
import Navbar from "./Navbar";

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/transactions')
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al cargar transacciones:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                <p>Cargando...</p>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-900">
            <Navbar />
        <div className="flex justify-center items-start py-10 rounded-full border-white">

            <div className=" shadow-lg rounded-xl p-6 w-full max-w-4xl ">
                <h1 className="text-xl font-bold mb-4">Transactions</h1>
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead>
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Ticket</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">SupplierId</th>
                    </tr>
                    </thead>

                    <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id} className="border-b">
                            <td className="p-3">{t.id}</td>
                            <td className="p-3">{t.ticket}</td>
                            <td className="p-3">{t.amount.toLocaleString()}</td>
                            <td className="p-3">{t.phone}</td>
                            <td className="p-3">{t.supplierId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default TransactionsPage;
