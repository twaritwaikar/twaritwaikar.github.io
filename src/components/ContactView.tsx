import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Terminal,
  Activity,
  Radio,
} from 'lucide-react';

interface ContactViewProps {
  isDarkMode: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({ isDarkMode }) => {
  const { networkNodes } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    sysId: '',
    pingAddr: '',
    payload: '',
  });

  const [transmissionState, setTransmissionState] = useState<
    'IDLE' | 'TRANSMITTING' | 'SENT' | 'ERROR'
  >('IDLE');
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sysId || !formData.pingAddr || !formData.payload) {
      alert('PLEASE POPULATE ALL DATA PACKET FIELDS.');
      return;
    }

    setTransmissionState('TRANSMITTING');
    setTransmissionLogs([
      '> Initiating TLS handshake with relay server...',
      '> Encrypting payload with 4096-bit RSA asymmetric key...',
    ]);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        '> Packet hash generated: 0x8f2d...b14e [VERIFIED]',
        '> Routing through gateway node [BENGALURU_PRIMARY]...',
      ]);
    }, 600);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        '> ACK 200 OK received from mail relay daemon.',
        '> Transmission completed successfully.',
      ]);
      setTransmissionState('SENT');
      const mailto = `mailto:${PORTFOLIO_DATA.site.email}?subject=${encodeURIComponent(
        `Portfolio ping from ${formData.sysId}`
      )}&body=${encodeURIComponent(`${formData.payload}\n\n— ${formData.sysId} <${formData.pingAddr}>`)}`;
      window.location.href = mailto;
    }, 1400);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      const ms = Math.floor(Math.random() * 15) + 18;
      setPingLatency(ms);
      setIsPinging(false);
    }, 450);
  };

  return (
    <div id="contact_view_container" className="flex flex-col gap-6 max-w-[1280px] mx-auto">
      {/* Title & Status Header */}
      <section id="contact_header_section" className="space-y-2">
          <h1
            id="contact_main_heading"
            className={`font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {PORTFOLIO_DATA.contact.heading}
          </h1>
          <p
            id="contact_subheading"
            className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed"
          >
            {PORTFOLIO_DATA.contact.body}
          </p>
      </section>

      {/* Main Grid: Form (Left) + Network Nodes & Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Transmission Form (8 Cols) */}
        <section
          id="transmission_form_container"
          className={`lg:col-span-8 border border-[#2a2a2a] p-5 sm:p-7 ${
            isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
          }`}
        >
          {transmissionState === 'SENT' ? (
            <div
              id="transmission_success_box"
              className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4 font-mono"
            >
              <div className="w-12 h-12 bg-[#00FF41]/10 border border-[#00FF41] flex items-center justify-center text-[#00FF41]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                PACKET_TRANSMITTED_SUCCESSFULLY
              </h3>
              <p className="font-sans text-xs text-neutral-400 max-w-md">
                Your message has been signed and delivered to {PORTFOLIO_DATA.profile.handle}. Return transmission will dispatch shortly.
              </p>

              {/* Log output */}
              <div className="w-full max-w-md p-3 bg-[#0a0a0a] border border-[#262626] text-left text-[11px] text-[#00FF41] space-y-1">
                {transmissionLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData({ sysId: '', pingAddr: '', payload: '' });
                  setTransmissionState('IDLE');
                  setTransmissionLogs([]);
                }}
                className="mt-4 px-5 py-2 border border-[#333] hover:border-[#00FF41] hover:text-[#00FF41] text-xs transition-colors cursor-pointer"
              >
                [ SEND_ANOTHER_PACKET ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-mono">
              {/* Field 1: SYS_ID [NAME] */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input_sys_id"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  SYS_ID [NAME]
                </label>
                <input
                  id="input_sys_id"
                  type="text"
                  required
                  value={formData.sysId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sysId: e.target.value }))
                  }
                  placeholder="Enter identifier..."
                  className={`w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#00FF41] outline-none transition-all ${
                    isDarkMode
                      ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600'
                      : 'bg-white border-[#CCCCCC] text-black placeholder-neutral-400'
                  }`}
                />
              </div>

              {/* Field 2: PING_ADDR [EMAIL] */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input_ping_addr"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  PING_ADDR [EMAIL]
                </label>
                <input
                  id="input_ping_addr"
                  type="email"
                  required
                  value={formData.pingAddr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pingAddr: e.target.value }))
                  }
                  placeholder="Enter return route..."
                  className={`w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#00FF41] outline-none transition-all ${
                    isDarkMode
                      ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600'
                      : 'bg-white border-[#CCCCCC] text-black placeholder-neutral-400'
                  }`}
                />
              </div>

              {/* Field 3: PAYLOAD [MESSAGE] */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input_payload"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  PAYLOAD [MESSAGE]
                </label>
                <textarea
                  id="input_payload"
                  required
                  rows={6}
                  value={formData.payload}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, payload: e.target.value }))
                  }
                  placeholder="Construct data packet..."
                  className={`w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#00FF41] outline-none transition-all resize-none ${
                    isDarkMode
                      ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600'
                      : 'bg-white border-[#CCCCCC] text-black placeholder-neutral-400'
                  }`}
                />
              </div>

              {/* Submit Transmit Button */}
              <div className="pt-2">
                <button
                  id="btn_execute_transmit"
                  type="submit"
                  disabled={transmissionState === 'TRANSMITTING'}
                  className="px-6 py-2.5 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer btn-brutalist disabled:opacity-50"
                >
                  {transmissionState === 'TRANSMITTING' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>TRANSMITTING_PACKET...</span>
                    </>
                  ) : (
                    <>
                      <span>▷</span>
                      <span>EXECUTE_TRANSMIT</span>
                    </>
                  )}
                </button>
              </div>

              {/* Real-time transmission terminal feedback */}
              {transmissionLogs.length > 0 && transmissionState === 'TRANSMITTING' && (
                <div className="mt-4 p-3 bg-[#0a0a0a] border border-[#262626] text-[11px] text-[#00FF41] space-y-1">
                  {transmissionLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              )}
            </form>
          )}
        </section>

        {/* Right Column: NETWORK_NODES + TELEMETRY (4 Cols) */}
        <section id="network_nodes_panel" className="lg:col-span-4 flex flex-col gap-6">
          {/* Top: NETWORK_NODES Table */}
          <div
            id="box_network_nodes"
            className={`border border-[#2a2a2a] ${
              isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
            }`}
          >
            <div className="px-4 py-2.5 bg-[#111111] border-b border-[#262626] font-mono text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
              NETWORK_NODES
            </div>

            <div className="divide-y divide-[#222]">
              {networkNodes.map((node) => (
                <a
                  key={node.name}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`link_node_${node.name.toLowerCase()}`}
                  className={`px-4 py-3 flex items-center justify-between font-mono text-xs tracking-wider transition-all group ${
                    isDarkMode
                      ? 'text-neutral-300 hover:bg-[#1a1a1a] hover:text-[#00FF41]'
                      : 'text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  <span>{node.name}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#00FF41] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom: STATUS & UPTIME Telemetry Box */}
          <div
            id="box_telemetry_status"
            className={`border border-[#2a2a2a] p-5 font-mono text-xs flex-1 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#00FF41]">&gt;</span>
                <span>STATUS: ONLINE</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#00FF41]">&gt;</span>
                <span>UPTIME: 99.99%</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#00FF41]">&gt;</span>
                <span>LOC: {PORTFOLIO_DATA.profile.location}</span>
              </div>
            </div>

            {/* Interactive Node Ping Tester */}
            <div className="pt-6 border-t border-[#262626] mt-6 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span>PING_LATENCY:</span>
                <span className="text-[#00FF41] font-bold">
                  {pingLatency !== null ? `${pingLatency} ms` : 'IDLE'}
                </span>
              </div>

              <button
                type="button"
                id="btn_test_ping"
                onClick={handleTestPing}
                disabled={isPinging}
                className="w-full py-2 border border-[#333] hover:border-[#00FF41] hover:text-[#00FF41] text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-[#111] text-neutral-300 disabled:opacity-50"
              >
                {isPinging ? '[ PINGING_NODE... ]' : '[ TEST_ROUTE_LATENCY ]'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
