import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";

export interface MapPonto {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  status: "Disponivel" | "Em uso" | "Manutencao";
  potenciaKw: number;
  preco: number;
}

interface Props {
  pontos: MapPonto[];
  selectedId: string | null;
  onMarkerPress: (ponto: MapPonto) => void;
}

const statusColor: Record<MapPonto["status"], string> = {
  Disponivel: "#16a34a",
  "Em uso": "#ea580c",
  Manutencao: "#dc2626",
};

const CENTER_INITIAL = { lat: -23.5426, lng: -46.6446 };

export default function RecargaMap({ pontos, selectedId, onMarkerPress }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const ponto = pontos.find((p) => p.id === selectedId);
    if (!ponto) return;
    mapRef.current.panTo({ lat: ponto.latitude, lng: ponto.longitude });
    mapRef.current.setZoom(15);
    setOpenId(ponto.id);
  }, [selectedId, pontos]);

  if (!isLoaded) {
    return (
      <div className="flex h-56 w-full items-center justify-center bg-slate-100 text-sm text-slate-500 md:h-80">
        Carregando mapa...
      </div>
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      center={CENTER_INITIAL}
      zoom={13}
      mapContainerClassName="h-56 w-full md:h-80"
      options={{ disableDefaultUI: true, zoomControl: true }}
    >
      {pontos.map((ponto) => (
        <MarkerF
          key={ponto.id}
          position={{ lat: ponto.latitude, lng: ponto.longitude }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: statusColor[ponto.status],
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 9,
          }}
          onClick={() => {
            onMarkerPress(ponto);
            setOpenId(ponto.id);
          }}
        >
          {openId === ponto.id && (
            <InfoWindowF onCloseClick={() => setOpenId(null)}>
              <div className="min-w-[160px] p-1">
                <p className="text-sm font-bold text-slate-900">{ponto.nome}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: statusColor[ponto.status] }}
                  />
                  <span className="text-xs font-semibold text-slate-600">{ponto.status}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {ponto.potenciaKw} kW · R$ {ponto.preco.toFixed(2)}/kWh
                </p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}
