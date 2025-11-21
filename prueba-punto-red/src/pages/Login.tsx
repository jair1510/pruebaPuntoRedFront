import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setMessage(errorText);
                return;
            }

            const token = await response.text();
            localStorage.setItem("token", token);
            navigate("/recarga");
        } catch (error) {
            setMessage("Error connecting to server");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-900 border border-white rounded-xl p-8">
                <div className="text-center">
                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Email address
                        </label>
                        <input
                            type="email"
                            required
                            className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
                    >
                        Sign in
                    </button>
                </form>

                {/* Mostrar errores */}
                {message && (
                    <p className="mt-4 text-center text-red-400">{message}</p>
                )}
            </div>
        </div>
    );
}
