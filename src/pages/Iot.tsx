import { IoAlertCircle } from "react-icons/io5";
import FadeWrapper from "@/components/FadeWrapper";

const SENSORES = [
  { id: "S-001", ponto: "Centro Sul", bateria: 82, latencia: "2.3s", status: "Operacional" },
  { id: "S-002", ponto: "Hub Campinas", bateria: 49, latencia: "4.1s", status: "Atencao" },
  { id: "S-003", ponto: "Shopping Verde", bateria: 16, latencia: "5.4s", status: "Falha" },
];

const LOGS = [
  "20:03 - S-003 sem comunicacao por 40s",
  "19:55 - S-002 variacao de leitura acima do limiar",
  "19:42 - S-001 online com nova medicao de energia",
];

export default function Iot() {
  return (
    <FadeWrapper className="bg-slate-50 px-5 pb-24 pt-14 md:pb-6 md:pt-8">
      <h1 className="text-[26px] font-bold text-slate-900">Painel IoT</h1>
      <p className="mt-1.5 text-[13px] text-slate-500">
        Monitoramento de sensores e estado operacional dos carregadores.
      </p>

      <div className="mt-3 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3">
        <IoAlertCircle size={20} color="#b91c1c" />
        <div className="flex-1">
          <p className="text-[13px] font-bold text-red-900">Falha detectada automaticamente</p>
          <p className="mt-0.5 text-xs leading-[18px] text-red-800">
            Sensor S-003 acima da latencia maxima de 5s (RNF016).
          </p>
        </div>
      </div>

      <h2 className="mb-2 mt-3.5 text-[15px] font-bold text-slate-900">Status dos sensores</h2>
      <div className="grid gap-2 md:grid-cols-3">
        {SENSORES.map((sensor) => (
          <div key={sensor.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">{sensor.id}</span>
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-bold text-brand-teal">
                {sensor.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Ponto: {sensor.ponto}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Bateria: {sensor.bateria}%</span>
              <span className="text-xs font-semibold text-slate-700">Latencia: {sensor.latencia}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-3.5 text-[15px] font-bold text-slate-900">Historico de leituras (auditoria)</h2>
      <div className="rounded-2xl bg-slate-900 p-3">
        {LOGS.map((log) => (
          <p key={log} className="mb-1.5 font-mono text-[11px] text-slate-200 last:mb-0">
            {log}
          </p>
        ))}
      </div>
    </FadeWrapper>
  );
}
