import { useMemo, useRef, useState } from "react";
import { IoNavigate, IoSearch } from "react-icons/io5";
import RecargaMap, { type MapPonto } from "@/components/RecargaMap";
import FadeWrapper from "@/components/FadeWrapper";

type Conector = "CCS2" | "Tipo 2" | "CHAdeMO";
type Status = MapPonto["status"];

interface PontoRecarga extends MapPonto {
  distanciaKm: number;
  conector: Conector;
}

const PONTOS: PontoRecarga[] = [
  { id: "1", nome: "Estacao Centro Sul",      distanciaKm: 1.4, potenciaKw: 60, preco: 1.95, conector: "CCS2",    status: "Disponivel", latitude: -23.5505, longitude: -46.6333 },
  { id: "2", nome: "Hub Solar Campinas",      distanciaKm: 3.1, potenciaKw: 22, preco: 1.45, conector: "Tipo 2",  status: "Em uso",     latitude: -23.5308, longitude: -46.6395 },
  { id: "3", nome: "Eletro Park Norte",       distanciaKm: 4.8, potenciaKw: 50, preco: 1.85, conector: "CCS2",    status: "Disponivel", latitude: -23.5134, longitude: -46.6531 },
  { id: "4", nome: "Shopping Verde",          distanciaKm: 7.2, potenciaKw: 40, preco: 1.65, conector: "CHAdeMO", status: "Manutencao", latitude: -23.5620, longitude: -46.6558 },
  { id: "5", nome: "Condominio Solis Prime",  distanciaKm: 9.6, potenciaKw: 11, preco: 1.20, conector: "Tipo 2",  status: "Disponivel", latitude: -23.5740, longitude: -46.6173 },
];

const statusColor: Record<Status, string> = {
  Disponivel: "#16a34a",
  "Em uso": "#ea580c",
  Manutencao: "#dc2626",
};

const CONECTORES = ["Todos", "CCS2", "Tipo 2", "CHAdeMO"] as const;

export default function Recarga() {
  const [busca, setBusca] = useState("");
  const [filtroConector, setFiltroConector] = useState<Conector | "Todos">("Todos");
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const pontosFiltrados = useMemo(() => {
    return PONTOS.filter((ponto) => {
      const matchBusca = ponto.nome.toLowerCase().includes(busca.toLowerCase());
      const matchConector = filtroConector === "Todos" || ponto.conector === filtroConector;
      return matchBusca && matchConector;
    }).sort((a, b) => a.distanciaKm - b.distanciaKm);
  }, [busca, filtroConector]);

  const handleMarkerPress = (ponto: MapPonto) => {
    setSelecionado(ponto.id);
    cardRefs.current[ponto.id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleCardPress = (ponto: PontoRecarga) => {
    setSelecionado(ponto.id);
  };

  return (
    <FadeWrapper className="bg-slate-50 md:flex-row">
      <div className="flex flex-col md:w-1/2 md:border-r md:border-slate-200">
        <div className="px-5 pb-2 pt-14 md:pt-8">
          <h1 className="text-2xl font-bold text-slate-900">Pontos de Recarga</h1>
          <p className="mt-1 text-xs text-slate-500">Disponibilidade em tempo real · Toque para navegar.</p>
        </div>

        <RecargaMap pontos={PONTOS} selectedId={selecionado} onMarkerPress={handleMarkerPress} />

        <div className="flex gap-3.5 border-b border-slate-200 bg-white px-5 py-2">
          {(Object.entries(statusColor) as [Status, string][]).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[11px] font-semibold text-slate-600">{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 px-5 pb-1.5 pt-2.5">
          <div className="flex h-11 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-3">
            <IoSearch size={18} color="#64748b" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none"
              placeholder="Buscar estacao"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CONECTORES.map((item) => (
              <button
                key={item}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  filtroConector === item
                    ? "border-brand-teal bg-brand-teal text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
                onClick={() => setFiltroConector(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-2.5 md:pb-6">
        {pontosFiltrados.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[item.id] = el;
            }}
            onClick={() => handleCardPress(item)}
            className={`mb-2.5 cursor-pointer rounded-2xl border p-3.5 ${
              selecionado === item.id ? "border-2 border-brand-teal bg-green-50" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2.5">
              <span className="flex-1 text-sm font-bold text-slate-900">{item.nome}</span>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor[item.status] }} />
                <span className="text-[11px] font-semibold text-slate-700">{item.status}</span>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">{item.distanciaKm.toFixed(1)} km</span>
              <span className="text-xs font-semibold text-slate-600">{item.potenciaKw} kW</span>
              <span className="text-xs font-semibold text-slate-600">R$ {item.preco.toFixed(2)}/kWh</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-700">Conector: {item.conector}</span>
              <IoNavigate size={16} color="#0f766e" />
            </div>
          </div>
        ))}
      </div>
    </FadeWrapper>
  );
}
