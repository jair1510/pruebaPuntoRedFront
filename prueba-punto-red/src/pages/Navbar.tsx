export default function Navbar() {
    return (
        <div className="w-full bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-white text-lg font-bold">PuntoRed App</h1>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
                Logout
            </button>
        </div>
    );
}
