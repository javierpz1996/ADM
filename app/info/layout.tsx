import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info | Argentina Dota Masters S1",
  description:
    "Lista de players libres y equipos anotados en Argentina Dota Masters S1.",
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
