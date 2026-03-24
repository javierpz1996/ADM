import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | Argentina Dota Masters S1",
  description:
    "Registro de equipos y plantillas para Argentina Dota Masters S1 — búsqueda por equipo y confirmaciones recientes.",
};

export default function RegistrarmeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
