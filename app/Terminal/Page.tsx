// app/terminal/page.tsx
import TerminalComponent from "@/components/terminal/Terminal";

export default function TerminalPage() {
  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Terminal</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
        >
          Restart
        </button>
      </header>
      <section className="flex-1 p-2">
        <TerminalComponent />
      </section>
    </main>
  );
}
