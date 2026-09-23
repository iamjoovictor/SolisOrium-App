import { NavLink, Outlet } from "react-router-dom";
import {
  IoCalendar,
  IoFlash,
  IoHardwareChip,
  IoPerson,
  IoSunny,
} from "react-icons/io5";
import type { IconType } from "react-icons";

interface TabItem {
  to: string;
  label: string;
  icon: IconType;
}

const TABS: TabItem[] = [
  { to: "recarga", label: "Recarga", icon: IoFlash },
  { to: "reservas", label: "Reservas", icon: IoCalendar },
  { to: "integradores", label: "Solar", icon: IoSunny },
  { to: "iot", label: "IoT", icon: IoHardwareChip },
  { to: "perfil", label: "Perfil", icon: IoPerson },
];

function tabClasses(isActive: boolean) {
  return `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-semibold ${
    isActive ? "text-brand-teal" : "text-slate-500"
  }`;
}

export default function AppShell() {
  return (
    <div className="flex h-dvh flex-col md:flex-row">
      <nav className="hidden w-60 flex-col border-r border-slate-200 bg-white py-6 md:flex">
        <span className="px-6 pb-6 text-lg font-bold text-slate-900">Solis Orium</span>
        {TABS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mx-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive ? "bg-teal-50 text-brand-teal" : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 flex border-t border-slate-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:hidden">
        {TABS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => tabClasses(isActive)}>
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
