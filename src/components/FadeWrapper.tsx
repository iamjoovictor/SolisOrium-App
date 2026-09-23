import type { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export default function FadeWrapper({ children, className = "" }: PropsWithChildren<Props>) {
  return <div className={`flex flex-1 flex-col animate-fade-in ${className}`}>{children}</div>;
}
