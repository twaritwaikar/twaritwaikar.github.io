import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { MarkdownArticle } from './MarkdownArticle';

const CONTACT_SENT_HASH = '#contact-sent';

export const ContactView: React.FC = () => {
  const { networkNodes } = PORTFOLIO_DATA;
  const returnedFromCaptcha = window.location.hash === CONTACT_SENT_HASH;
  const [formData, setFormData] = useState({
    sysId: '',
    pingAddr: '',
    payload: '',
  });

  const [transmissionState, setTransmissionState] = useState<
    'IDLE' | 'TRANSMITTING' | 'SENT'
  >(returnedFromCaptcha ? 'SENT' : 'IDLE');
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>(
    returnedFromCaptcha
      ? [
          '> Captcha challenge cleared.',
          '> Mail relay accepted the packet.',
          `> Delivered to ${PORTFOLIO_DATA.site.email}.`,
        ]
      : []
  );
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const formAction = `https://formsubmit.co/${encodeURIComponent(PORTFOLIO_DATA.site.email)}`;
  const nextUrl = `${window.location.origin}${window.location.pathname}${CONTACT_SENT_HASH}`;

  const handleSubmit = () => {
    setTransmissionState('TRANSMITTING');
    setTransmissionLogs([
      '> Opening TLS session with mail relay...',
      '> Redirecting to captcha challenge...',
    ]);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      const ms = Math.floor(Math.random() * 15) + 18;
      setPingLatency(ms);
      setIsPinging(false);
    }, 450);
  };

  const resetForm = () => {
    setFormData({ sysId: '', pingAddr: '', payload: '' });
    setTransmissionState('IDLE');
    setTransmissionLogs([]);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <div id="contact_view_container" className="h-auto lg:h-full lg:min-h-0 flex flex-col gap-3 max-w-[1280px] mx-auto overflow-visible lg:overflow-hidden">
      <section id="contact_header_section" className="space-y-1 shrink-0">
        <h1
          id="contact_main_heading"
            className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white"
        >
          {PORTFOLIO_DATA.contact.heading}
        </h1>
        <div
          id="contact_subheading"
          className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed"
        >
          <MarkdownArticle markdown={PORTFOLIO_DATA.contact.body} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 lg:flex-1 overflow-visible lg:overflow-hidden">
        <section id="network_nodes_panel" className="lg:col-span-4 flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-hidden">
          <div
            id="box_network_nodes"
            className="border border-[#2a2a2a] bg-[#141414]"
          >
            <div className="px-4 py-2.5 bg-[#111111] border-b border-[#262626] font-mono text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
              NETWORK_NODES
            </div>

            <div className="divide-y divide-[#222]">
              {networkNodes.map((node) => (
                <a
                  key={node.name}
                  href={node.url}
                  target={node.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={node.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  id={`link_node_${node.name.toLowerCase()}`}
                  className="px-4 py-2.5 flex items-center justify-between font-mono text-xs tracking-wider transition-all group text-neutral-300 hover:bg-[#1a1a1a] hover:text-[#5CE883]"
                >
                  <span>{node.name}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#5CE883] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div
            id="box_telemetry_status"
            className="border border-[#2a2a2a] p-4 font-mono text-xs lg:flex-1 min-h-0 overflow-hidden flex flex-col justify-between bg-[#141414]"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#5CE883]">&gt;</span>
                <span>STATUS: ONLINE</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#5CE883]">&gt;</span>
                <span>UPTIME: 99.99%</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <span className="text-[#5CE883]">&gt;</span>
                <span>LOC: {PORTFOLIO_DATA.profile.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] mt-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span>PING_LATENCY:</span>
                <span className="text-[#5CE883] font-bold">
                  {pingLatency !== null ? `${pingLatency} ms` : 'IDLE'}
                </span>
              </div>

              <button
                type="button"
                id="btn_test_ping"
                onClick={handleTestPing}
                disabled={isPinging}
                className="w-full py-2 border border-[#333] hover:border-[#5CE883] hover:text-[#5CE883] text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-[#111] text-neutral-300 disabled:opacity-50"
              >
                {isPinging ? '[ PINGING_NODE... ]' : '[ TEST_ROUTE_LATENCY ]'}
              </button>
            </div>
          </div>
        </section>

        <section
          id="transmission_form_container"
          className="lg:col-span-8 border border-[#2a2a2a] p-4 sm:p-5 min-h-0 overflow-y-auto bg-[#141414]"
        >
          {transmissionState === 'SENT' ? (
            <div
              id="transmission_success_box"
              className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4 font-mono"
            >
              <div className="w-12 h-12 bg-[#5CE883]/10 border border-[#5CE883] flex items-center justify-center text-[#5CE883]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                PACKET_TRANSMITTED_SUCCESSFULLY
              </h3>
              <p className="font-sans text-xs text-neutral-400 max-w-md">
                Your message was delivered to {PORTFOLIO_DATA.site.email} after the captcha check. The first send may also ask you to confirm a one-time activation email.
              </p>

              <div className="w-full max-w-md p-3 bg-[#0a0a0a] border border-[#262626] text-left text-[11px] text-[#5CE883] space-y-1">
                {transmissionLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-5 py-2 border border-[#333] hover:border-[#5CE883] hover:text-[#5CE883] text-xs transition-colors cursor-pointer"
              >
                [ SEND_ANOTHER_PACKET ]
              </button>
            </div>
          ) : (
            <form
              action={formAction}
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-3 font-mono"
            >
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input
                type="hidden"
                name="_subject"
                value={`twarit.cc ping from ${formData.sysId}`}
              />
              <div className="space-y-1.5">
                <label
                  htmlFor="input_sys_id"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  SYS_ID [NAME]
                </label>
                <input
                  id="input_sys_id"
                  name="name"
                  type="text"
                  required
                  value={formData.sysId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sysId: e.target.value }))
                  }
                  placeholder="Enter identifier..."
                  className="w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#5CE883] outline-none transition-all bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="input_ping_addr"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  PING_ADDR [EMAIL]
                </label>
                <input
                  id="input_ping_addr"
                  name="email"
                  type="email"
                  required
                  value={formData.pingAddr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pingAddr: e.target.value }))
                  }
                  placeholder="Enter return route..."
                  className="w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#5CE883] outline-none transition-all bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="input_payload"
                  className="block text-[11px] font-bold text-neutral-400 tracking-wider"
                >
                  PAYLOAD [MESSAGE]
                </label>
                <textarea
                  id="input_payload"
                  name="message"
                  required
                  rows={3}
                  value={formData.payload}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, payload: e.target.value }))
                  }
                  placeholder="Construct data packet..."
                  className="w-full px-3.5 py-2.5 text-xs border focus:border-2 focus:border-[#5CE883] outline-none transition-all resize-none bg-[#0d0d0d] border-[#333333] text-white placeholder-neutral-600"
                />
              </div>

              <div className="pt-2">
                <button
                  id="btn_execute_transmit"
                  type="submit"
                  disabled={transmissionState === 'TRANSMITTING'}
                  className="px-6 py-2.5 border border-[#5CE883] text-[#5CE883] hover:bg-[#5CE883] hover:text-black font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer btn-brutalist disabled:opacity-50"
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

              {transmissionLogs.length > 0 && transmissionState !== 'IDLE' && (
                <div className="mt-4 p-3 bg-[#0a0a0a] border border-[#262626] text-[11px] text-[#5CE883] space-y-1">
                  {transmissionLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              )}
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
