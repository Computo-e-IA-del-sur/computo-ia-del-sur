export default function Footer() {
  return (
    <footer className="bg-black text-white/30 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-white">Computo e IA del Sur</p>
        <p>© {new Date().getFullYear()} — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
