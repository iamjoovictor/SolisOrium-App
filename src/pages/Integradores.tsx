import { IoChevronForward, IoFlashOutline, IoLeafOutline, IoSearchOutline, IoStar, IoSunnyOutline } from "react-icons/io5";
import FadeWrapper from "@/components/FadeWrapper";

const INTEGRADORES = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
  nome: `Integrador Solar ${i + 1}`,
  avaliacao: (4.2 + (i % 4) * 0.2).toFixed(1),
  preco: `A partir de R$ ${(15000 + i * 2500).toLocaleString("pt-BR")}`,
  Icon: i % 2 === 0 ? IoLeafOutline : IoSunnyOutline,
}));

export default function Integradores() {
  return (
    <FadeWrapper className="bg-slate-50">
      <div className="px-6 pb-4 pt-14 md:pt-8">
        <h1 className="mb-3.5 text-[26px] font-bold text-slate-900">Simulador Solar</h1>

        <div className="mb-2.5 flex items-center rounded-2xl bg-brand-teal p-4">
          <div className="flex-1">
            <p className="text-[21px] font-bold text-white">R$ 412/mês</p>
            <p className="mt-0.5 text-xs text-teal-100">Economia estimada</p>
          </div>
          <div className="mx-3.5 w-px self-stretch bg-white/30" />
          <div className="flex-1">
            <p className="text-[21px] font-bold text-white">4,8 anos</p>
            <p className="mt-0.5 text-xs text-teal-100">Retorno financeiro</p>
          </div>
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-xl border border-teal-200 bg-cyan-50 p-3">
          <IoFlashOutline size={18} color="#0f766e" />
          <p className="flex-1 text-[13px] leading-[18px] text-cyan-900">
            Potencia sugerida: 5.2 kWp para consumo residencial urbano.
          </p>
        </div>

        <h2 className="mb-2.5 text-base font-bold text-slate-900">Marketplace de Integradores</h2>
        <div className="flex h-[50px] items-center rounded-xl border border-slate-200 bg-white px-3">
          <IoSearchOutline size={20} color="#9ca3af" className="mr-2.5" />
          <input
            placeholder="Buscar por nome, cidade ou servico..."
            className="flex-1 bg-transparent text-base text-gray-900 outline-none"
          />
        </div>
      </div>

      <div className="grid gap-3 px-6 pb-24 md:grid-cols-2 md:pb-8 lg:grid-cols-3">
        {INTEGRADORES.map(({ id, nome, avaliacao, preco, Icon }) => (
          <button
            key={id}
            className="flex items-center rounded-2xl border border-slate-200 bg-white p-4 text-left"
          >
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Icon size={24} color="#f59e0b" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{nome}</p>
              <p className="mt-0.5 text-sm text-gray-600">{preco}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <IoStar size={14} color="#f59e0b" />
                <span className="text-xs font-semibold text-slate-600">{avaliacao} de 5.0</span>
              </div>
            </div>
            <IoChevronForward size={20} color="#9ca3af" />
          </button>
        ))}
      </div>
    </FadeWrapper>
  );
}
