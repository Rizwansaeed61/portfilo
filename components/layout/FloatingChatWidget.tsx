"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, PhoneCall, Calendar, Sparkles, CheckCircle2 } from "lucide-react";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Box Modal */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-[#0b0f19] border border-purple-500/30 text-white shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/rizwan-saeed.png"
                  alt="Rizwan Saeed"
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0b0f19] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-serif text-white">Rizwan Saeed</h4>
                <p className="text-[11px] text-purple-300 flex items-center gap-1 font-medium">
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  <span>Digital Growth Consultant · Online</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-center space-y-2 py-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto animate-bounce" />
              <h5 className="font-bold text-sm text-white">Message Sent!</h5>
              <p className="text-xs text-purple-200 leading-relaxed">
                Thank you! Rizwan will get back to you within 30 minutes.
              </p>
            </div>
          ) : (
            <>
              {/* Quick Action Links */}
              <div className="space-y-2 text-xs">
                <a
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/20 transition-all text-purple-100 font-semibold group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <span>Chat on WhatsApp</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Instant Response
                  </span>
                </a>

                <a
                  href="/contact"
                  className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/20 transition-all text-purple-100 font-semibold group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span>Book 1-on-1 Strategy Call</span>
                  </div>
                  <span className="text-[10px] text-purple-300">Free 30 Mins</span>
                </a>
              </div>

              {/* Direct Quick Message Form */}
              <form onSubmit={handleSendMessage} className="space-y-2 pt-2 border-t border-purple-500/20">
                <p className="text-[11px] font-bold text-purple-300">Or send a direct message:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Type your question or goal..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-slate-900/80 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl shadow-lg transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating Action Button — Purple Glowing Outer Ring matching reference photo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Chat Widget"
        className="relative group focus:outline-none"
      >
        {/* Outer Pulsing Aura Glow */}
        <span className="absolute -inset-2 rounded-full bg-purple-600/30 blur-lg group-hover:bg-purple-500/50 transition-all duration-300 animate-pulse" />

        {/* Outer Circular Ring (dark purple container) */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#1e1438] border border-purple-500/40 p-2 shadow-2xl transition-transform duration-300 group-hover:scale-105">
          {/* Inner Glowing Ring (White / Cyan stroke highlight) */}
          <div className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 border-2 border-white/90 shadow-inner">
            {isOpen ? (
              <X className="h-7 w-7 text-white transition-transform duration-200 rotate-90" />
            ) : (
              <MessageSquare className="h-7 w-7 text-white fill-white/20 transition-transform duration-200 group-hover:scale-110" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
