import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import FadeWrapper from "@/components/FadeWrapper";

export default function Welcome() {
  const navigate = useNavigate();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return (
      <FadeWrapper className="items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-brand-amber" />
      </FadeWrapper>
    );
  }

  return (
    <FadeWrapper className="justify-between bg-white p-6">
      <div className="flex flex-1 flex-col items-center justify-center px-3">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 md:h-28 md:w-28">
          <IoSunny size={48} color="#f59e0b" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Solis Orium</h1>
        <p className="max-w-sm text-center text-base leading-6 text-slate-600 md:max-w-md md:text-lg">
          Incentivando a Mobilidade Elétrica e a Energia Solar por Meio da Tecnologia
        </p>
      </div>

      <div className="mb-5 md:mx-auto md:w-full md:max-w-xs">
        <button
          className="w-full rounded-xl bg-blue-600 p-4 text-center text-lg font-bold text-white"
          onClick={() => navigate("/login")}
        >
          Começar
        </button>
      </div>
    </FadeWrapper>
  );
}
