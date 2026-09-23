import { useNavigate } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCarOutline,
  IoChevronForward,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoQrCodeOutline,
  IoReceiptOutline,
  IoRefreshOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoWalletOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";
import FadeWrapper from "@/components/FadeWrapper";

interface ProfileItemProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

function ProfileItem({ icon: Icon, label, onClick }: ProfileItemProps) {
  return (
    <button
      className="flex w-full items-center border-b border-slate-100 py-3.5 last:border-b-0"
      onClick={onClick}
    >
      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
        <Icon size={20} color="#000" />
      </div>
      <span className="flex-1 text-left text-[15px] text-slate-700">{label}</span>
      <IoChevronForward size={18} color="#ccc" />
    </button>
  );
}

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <FadeWrapper className="bg-slate-50 pb-24 md:pb-8">
      <div className="mx-5 mt-14 flex items-center justify-between rounded-[18px] bg-slate-900 p-4 md:mt-8 md:mx-8">
        <div>
          <p className="text-lg font-bold text-slate-50">Joao Victor</p>
          <p className="mt-0.5 text-sm text-slate-300">joao@email.com</p>
        </div>
        <span className="rounded-full bg-teal-500 px-3 py-1.5 text-xs font-bold text-white">Cliente</span>
      </div>

      <div className="mx-5 mt-5 grid gap-4 md:mx-8 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5">
          <h2 className="mb-2.5 text-base font-bold text-slate-900">Conta e Veiculos</h2>
          <ProfileItem icon={IoPersonOutline} label="Meus dados" />
          <ProfileItem icon={IoCarOutline} label="Meus veiculos eletricos" />
          <ProfileItem icon={IoRefreshOutline} label="Recuperacao de senha" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5">
          <h2 className="mb-2.5 text-base font-bold text-slate-900">Financeiro e Reservas</h2>
          <ProfileItem icon={IoCalendarOutline} label="Historico de reservas" />
          <ProfileItem icon={IoWalletOutline} label="Historico financeiro" />
          <ProfileItem icon={IoReceiptOutline} label="Comprovantes" />
          <ProfileItem icon={IoQrCodeOutline} label="QR Codes de reservas" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5">
          <h2 className="mb-2.5 text-base font-bold text-slate-900">Servicos e Suporte</h2>
          <ProfileItem icon={IoStarOutline} label="Avaliacoes e comentarios" />
          <ProfileItem icon={IoHelpCircleOutline} label="Central de ajuda" />
          <ProfileItem icon={IoShieldCheckmarkOutline} label="Politica de privacidade" />
          <ProfileItem
            icon={IoLogOutOutline}
            label="Sair do aplicativo"
            onClick={() => navigate("/login", { replace: true })}
          />
        </div>
      </div>
    </FadeWrapper>
  );
}
