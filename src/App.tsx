import AppShell from "@/components/AppShell";
import Cadastro from "@/pages/Cadastro";
import Integradores from "@/pages/Integradores";
import Iot from "@/pages/Iot";
import Login from "@/pages/Login";
import Perfil from "@/pages/Perfil";
import Recarga from "@/pages/Recarga";
import Reservas from "@/pages/Reservas";
import Welcome from "@/pages/Welcome";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="recarga" replace />} />
        <Route path="recarga" element={<Recarga />} />
        <Route path="reservas" element={<Reservas />} />
        <Route path="integradores" element={<Integradores />} />
        <Route path="iot" element={<Iot />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
