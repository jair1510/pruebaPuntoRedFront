import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setMessage(errorText);
                return;
            }

            const text = await response.text();
            setMessage(text);
        } catch (error) {
            setMessage("Error connecting to server");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            {/* Card central */}
            <div className="w-full max-w-md bg-gray-900 border border-white rounded-xl p-8">
                {/* Logo y título */}
                <div className="text-center">
                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Sign in to your account
                    </h2>
                </div>

                {/* Formulario */}
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-2 focus:outline-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    );
}
