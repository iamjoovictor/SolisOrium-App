import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import FadeWrapper from "@/components/FadeWrapper";

type Perfil = "cliente" | "integrador" | "ponto";

const PERFIS: Perfil[] = ["cliente", "integrador", "ponto"];

export default function Cadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [perfil, setPerfil] = useState<Perfil>("cliente");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return nome.trim() !== "" && email.trim() !== "";
    if (step === 3) return documento.trim() !== "";
    if (step === 4) return senha.trim() !== "" && confirmarSenha.trim() !== "" && senha === confirmarSenha;
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/login", { replace: true });
  };

  const handleCadastro = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/recarga", { replace: true });
    }, 1500);
  };

  const progressPercent = (step / totalSteps) * 100;

  return (
    <FadeWrapper className="relative justify-center bg-white p-6 md:items-center">
      <button
        className="absolute left-6 top-6 z-10 md:left-8 md:top-8"
        onClick={handleBack}
        disabled={isLoading}
      >
        <IoArrowBack size={24} color="#111827" />
      </button>

      <div className="w-full md:max-w-sm">
        <div className="mt-20 mb-10 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-amber transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h1 className="mb-8 text-2xl font-bold text-slate-900">
          {step === 1 && "Escolha seu Perfil"}
          {step === 2 && "Dados Pessoais"}
          {step === 3 && "Documento"}
          {step === 4 && "Segurança"}
        </h1>

        <div className="min-h-[180px]">
          {step === 1 && (
            <div className="flex flex-col gap-3">
              {PERFIS.map((item) => (
                <button
                  key={item}
                  className={`rounded-lg border py-4 text-center text-base font-medium capitalize ${
                    perfil === item
                      ? "border-blue-600 bg-blue-50 text-blue-600 font-bold"
                      : "border-transparent bg-slate-100 text-slate-600"
                  }`}
                  onClick={() => setPerfil(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              <input
                className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
                placeholder="E-mail"
                type="email"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {step === 3 && (
            <input
              className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
              placeholder={perfil === "cliente" ? "Digite seu CPF" : "Digite seu CNPJ"}
              inputMode="numeric"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          )}

          {step === 4 && (
            <>
              <input
                className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
                placeholder="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <input
                className="mb-4 w-full rounded-lg bg-slate-100 p-4 text-base text-slate-900"
                placeholder="Confirmar Senha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {senha !== confirmarSenha && confirmarSenha !== "" && (
                <p className="-mt-2 mb-4 text-sm text-red-500">As palavras-passe não coincidem.</p>
              )}
            </>
          )}
        </div>

        {step < totalSteps ? (
          <button
            className="mt-2 flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white disabled:bg-blue-300"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Confirmar
          </button>
        ) : (
          <button
            className="mt-2 flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white disabled:bg-blue-300"
            onClick={handleCadastro}
            disabled={!canProceed() || isLoading}
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              "Cadastrar"
            )}
          </button>
        )}
      </div>
    </FadeWrapper>
  );
}
