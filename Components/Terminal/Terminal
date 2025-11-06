// components/terminal/Terminal.tsx
"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import "xterm/css/xterm.css";

interface Props {
  wsUrl?: string;
}

export default function TerminalComponent({ wsUrl = "ws://localhost:8081" }: Props) {
  const termRef = useRef<HTMLDivElement>(null);
  const term = useRef<Terminal | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    if (!termRef.current) return;

    const t = new Terminal({
      theme: { background: "#1e1e1e", foreground: "#d4d4d4" },
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      cursorBlink: true,
    });
    term.current = t;

    t.loadAddon(fitAddon.current);
    try {
      t.loadAddon(new WebglAddon());
    } catch {}

    t.open(termRef.current);
    fitAddon.current.fit();

    const socket = new WebSocket(wsUrl);
    ws.current = socket;

    socket.onopen = () => t.write("\r\n$ ");
    socket.onmessage = (e) => t.write(e.data.toString());
    socket.onclose = () => t.write("\r\nConnection closed.\r\n");

    t.onData((data) => socket.readyState === WebSocket.OPEN && socket.send(data));
    t.onResize(({ cols, rows }) => {
      socket.send(JSON.stringify({ type: "resize", cols, rows }));
    });

    const resizeObserver = new ResizeObserver(() => fitAddon.current.fit());
    resizeObserver.observe(termRef.current);

    return () => {
      socket.close();
      t.dispose();
      resizeObserver.disconnect();
    };
  }, [wsUrl]);

  return (
    <div className="h-full w-full bg-[#1e1e1e] rounded-md overflow-hidden">
      <div ref={termRef} className="h-full" />
    </div>
  );
}
