import { IoCard, IoDocumentText, IoQrCode, IoScan } from "react-icons/io5";
import FadeWrapper from "@/components/FadeWrapper";

const RESERVAS = [
  {
    id: "R-2026-0102",
    ponto: "Estacao Centro Sul",
    inicio: "20/05 19:00",
    fim: "20/05 20:10",
    status: "Agendada",
    valor: 42.8,
  },
  {
    id: "R-2026-0088",
    ponto: "Hub Solar Campinas",
    inicio: "18/05 08:30",
    fim: "18/05 09:20",
    status: "Finalizada",
    valor: 36.45,
  },
];

export default function Reservas() {
  return (
    <FadeWrapper className="bg-slate-50 px-5 pb-24 pt-14 md:pb-6 md:pt-8">
      <h1 className="mb-3.5 text-[26px] font-bold text-slate-900">Reservas e Pagamentos</h1>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-3.5">
          <h2 className="mb-1 text-base font-bold text-slate-900">Nova reserva</h2>
          <p className="mb-3 text-xs leading-[18px] text-slate-500">
            Selecione veiculo, janela de horario e confirme o custo estimado.
          </p>

          <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <span className="text-xs text-slate-500">Veiculo</span>
            <span className="text-right text-xs font-semibold text-slate-900">BYD Dolphin - ABC1D23</span>
          </div>
          <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <span className="text-xs text-slate-500">Horario</span>
            <span className="text-right text-xs font-semibold text-slate-900">20/05 19:00 ate 20/05 20:10</span>
          </div>
          <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <span className="text-xs text-slate-500">Valor estimado</span>
            <span className="text-sm font-bold text-brand-teal">R$ 42,80</span>
          </div>

          <button className="mt-1 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-brand-teal text-sm font-bold text-white">
            <IoQrCode size={17} />
            Confirmar e gerar QR Code
          </button>
        </div>

        <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-3.5">
          <h2 className="mb-1 text-base font-bold text-slate-900">Pagamento</h2>
          <div className="mb-2.5 mt-2 flex gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-teal-300 bg-teal-100 px-2.5 py-1.5">
              <IoScan size={16} color="#0f766e" />
              <span className="text-xs font-bold text-brand-teal">PIX</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5">
              <IoCard size={16} color="#475569" />
              <span className="text-xs font-semibold text-slate-600">Credito</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5">
              <IoCard size={16} color="#475569" />
              <span className="text-xs font-semibold text-slate-600">Debito</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-cyan-50 p-2.5">
            <IoDocumentText size={18} color="#0f766e" />
            <span className="flex-1 text-xs text-slate-900">Comprovante disponivel apos a conclusao da sessao.</span>
          </div>
        </div>
      </div>

      <h2 className="mb-2 mt-1.5 text-[15px] font-bold text-slate-900">Historico</h2>
      <div className="grid gap-2 md:grid-cols-2">
        {RESERVAS.map((reserva) => (
          <div key={reserva.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">{reserva.ponto}</span>
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-700">
                {reserva.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{reserva.id}</p>
            <p className="mt-1 text-xs text-slate-500">
              {reserva.inicio} - {reserva.fim}
            </p>
            <p className="mt-2 text-sm font-bold text-brand-teal">R$ {reserva.valor.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </FadeWrapper>
  );
}
