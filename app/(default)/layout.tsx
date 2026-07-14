import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Computo e IA del Sur",
  description:
    "Soluciones de Inteligencia Artificial, apps móviles y sistemas web.",
};

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
