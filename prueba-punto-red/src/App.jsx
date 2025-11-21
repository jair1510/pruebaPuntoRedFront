import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TransactionsPage from "./pages/TransactionsPage";
import Recarga from "./pages/Recarga";
import PrivateRoute from "./router/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página inicial */}
                <Route path="/" element={<Login />} />

                {/* Página pública */}
                <Route
                    path="/transactions"
                    element={
                        <PrivateRoute>
                            <TransactionsPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/recarga"
                    element={
                        <PrivateRoute>
                            <Recarga />
                        </PrivateRoute>
                    }
                />

                {/* Página privada */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
