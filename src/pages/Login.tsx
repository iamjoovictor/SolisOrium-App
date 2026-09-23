import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeWrapper from "@/components/FadeWrapper";

type Perfil = "cliente" | "integrador" | "ponto";

const PERFIS: Perfil[] = ["cliente", "integrador", "ponto"];

export default function Login() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<Perfil>("cliente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = () => {
    if (!isFormValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/recarga", { replace: true });
    }, 1500);
  };

  return (
    <FadeWrapper className="justify-center bg-white p-6 md:items-center">
      <div className="w-full md:max-w-sm">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">Entrar</h1>

        <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
          {PERFIS.map((item) => (
            <button
              key={item}
              className={`flex-1 rounded-md py-2.5 text-center text-sm font-medium capitalize ${
                perfil === item ? "bg-white font-bold text-blue-600 shadow" : "text-slate-600"
              }`}
              onClick={() => setPerfil(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
          placeholder="E-mail"
          type="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="mt-2 flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 text-base font-bold capitalize text-white disabled:bg-blue-300"
          onClick={handleLogin}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            `Entrar como ${perfil}`
          )}
        </button>

        <button
          className="mt-6 w-full text-center text-sm text-blue-600 disabled:opacity-50"
          onClick={() => navigate("/cadastro")}
          disabled={isLoading}
        >
          Não tem conta? Cadastre-se
        </button>
      </div>
    </FadeWrapper>
  );
}
