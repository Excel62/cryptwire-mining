/**
 * HashVault — Withdrawal Processing / Success Page
 * React + TypeScript + Tailwind CSS
 * Matches the dark MiningDashboard aesthetic.
 *
 * Usage: Navigate to this page with location.state:
 *   navigate('/dashboard/withdrawal-success', {
 *     state: {
 *       clientName:          "Excel Test",
 *       withdrawalAmount:    500,
 *       withdrawalCurrency:  "USDT",
 *       withdrawalAddress:   "TRxx...abc",
 *       withdrawalTime:      new Date().toISOString(),
 *       txHash:              "0xabc..." (optional)
 *     }
 *   })
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle, Copy, Check, ArrowLeft, ExternalLink,
  Clock, Shield, Hash, Wallet, RefreshCw, Home,
} from "lucide-react";
import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WithdrawalState {
  clientName:          string;
  withdrawalAmount:    number;
  withdrawalCurrency:  string;
  withdrawalAddress:   string;
  withdrawalTime:      string;
  txHash?:             string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

const fmtCurrency = (amount: number, currency: string) =>
  `${Number(amount).toFixed(6)} ${currency.toUpperCase()}`;

const fmtUsd = (amount: number) =>
  `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ─── Copy hook ────────────────────────────────────────────────────────────────

const useCopy = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch { /* ignore */ }
  };
  return { copied, copy };
};

// ─── Detail row ───────────────────────────────────────────────────────────────

const DetailRow = ({
  label, value, accent = false, mono = false, children,
}: {
  label: string; value?: string; accent?: boolean; mono?: boolean; children?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 py-3.5 border-b border-white/[0.04] last:border-none">
    <span className="text-xs text-[#6b7a8d] flex-shrink-0">{label}</span>
    {children ?? (
      <span className={`text-right text-xs font-semibold break-all
        ${mono    ? "font-mono" : ""}
        ${accent  ? "text-[#f7931a]" : "text-[#e8ecf0]"}`}>
        {value}
      </span>
    )}
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WithdrawalProcessing() {
  const location = useLocation();
  const navigate  = useNavigate();

  const state = (location.state ?? {}) as Partial<WithdrawalState>;

  // Fallback demo data if navigated directly
  const clientName         = state.clientName         ?? "HashVault User";
  const withdrawalAmount   = state.withdrawalAmount   ?? 0;
  const withdrawalCurrency = state.withdrawalCurrency ?? "USDT";
  const withdrawalAddress  = state.withdrawalAddress  ?? "—";
  const withdrawalTime     = state.withdrawalTime     ?? new Date().toISOString();
  const txHash             = state.txHash;

  const [usdRate,     setUsdRate]     = useState<number | null>(null);
  const [rateLoading, setRateLoading] = useState(true);
  const addrCopy = useCopy();
  const hashCopy = useCopy();

  // Fetch live USD rate for the coin
  useEffect(() => {
    const coinId: Record<string, string> = {
      usdt: "tether", bitcoin: "bitcoin", btc: "bitcoin",
      eth: "ethereum", ethereum: "ethereum",
      bnb: "binancecoin", xrp: "ripple",
      sol: "solana", trx: "tron", doge: "dogecoin", usdc: "usd-coin",
    };
    const id = coinId[withdrawalCurrency.toLowerCase()];

    if (!id) { setUsdRate(1); setRateLoading(false); return; }

    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`, { timeout: 6000 })
      .then(res => setUsdRate(res.data[id]?.usd ?? 1))
      .catch(() => setUsdRate(null))
      .finally(() => setRateLoading(false));
  }, [withdrawalCurrency]);

  const usdValue = usdRate !== null ? withdrawalAmount * usdRate : null;

  // Explorer URL (best-effort)
  const explorerUrl = txHash
    ? withdrawalCurrency.toLowerCase() === "bitcoin"
      ? `https://blockstream.info/tx/${txHash}`
      : `https://etherscan.io/tx/${txHash}`
    : null;

  return (
    <div className="min-h-screen bg-[#0a0d10] text-[#e8ecf0]" style={{ fontFamily: "'Syne', sans-serif" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-14 bg-[#0f1318] border-b border-white/[0.07]">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#6b7a8d] hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft size={15} /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#f7931a,#ff6b00)" }}>⛏</div>
          <span className="text-sm font-extrabold tracking-tight hidden sm:inline">Cipher Mining</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-lg mx-auto px-4 py-8 sm:py-12 pb-24">

        {/* ── Success hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Animated check */}
          <div className="relative inline-flex mb-6">
            {/* Outer glow ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="w-24 h-24 rounded-full absolute inset-0"
              style={{ background: "radial-gradient(circle,rgba(6,214,160,0.15),transparent 70%)" }}
            />
            {/* Icon circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center relative z-10"
              style={{
                background: "rgba(6,214,160,0.1)",
                border:     "2px solid rgba(6,214,160,0.3)",
                boxShadow:  "0 0 40px rgba(6,214,160,0.15)",
              }}
            >
              <CheckCircle size={44} className="text-emerald-400" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
          >
            Withdrawal Submitted
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-[#6b7a8d] mb-4"
          >
            Your {withdrawalCurrency.toUpperCase()} withdrawal is pending admin review
          </motion.p>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-mono"
            style={{
              background:   "rgba(247,147,26,0.1)",
              border:       "1px solid rgba(247,147,26,0.25)",
              color:        "#f7931a",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Awaiting Admin Approval · ~30 min
          </motion.div>
        </motion.div>

        {/* ── Amount card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#141920] border border-white/[0.07] rounded-2xl p-5 mb-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d] mb-3">Amount Withdrawn</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold font-mono text-[#f7931a] tracking-tight">
                {Number(withdrawalAmount).toFixed(6)}
              </p>
              <p className="text-sm font-bold text-[#6b7a8d] font-mono mt-0.5">
                {withdrawalCurrency.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              {rateLoading ? (
                <div className="h-5 w-24 bg-white/5 rounded animate-pulse" />
              ) : usdValue !== null ? (
                <>
                  <p className="text-lg font-bold font-mono text-[#00d4aa]">{fmtUsd(usdValue)}</p>
                  <p className="text-[10px] text-[#6b7a8d] font-mono">USD equivalent</p>
                </>
              ) : (
                <p className="text-[11px] text-[#6b7a8d]">Rate unavailable</p>
              )}
            </div>
          </div>

          {/* Progress bar — pending state */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-mono text-[#6b7a8d] mb-1.5">
              <span>Submitted</span>
              <span>Under Review</span>
              <span>Completed</span>
            </div>
            <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#f7931a,#ff9f43)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Transaction details ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-[#141920] border border-white/[0.07] rounded-2xl overflow-hidden mb-4"
        >
          <div className="px-5 py-4 border-b border-white/[0.07]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d]">Transaction Details</p>
          </div>

          <div className="px-5 pb-1">
            <DetailRow label="Cardholder"  value={clientName} />
            <DetailRow label="Currency"    value={withdrawalCurrency.toUpperCase()} />
            <DetailRow label="Amount"      value={fmtCurrency(withdrawalAmount, withdrawalCurrency)} accent />
            <DetailRow label="Status">
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Pending Approval
              </span>
            </DetailRow>
            <DetailRow label="Submitted"   value={fmtDate(withdrawalTime)} mono />
            <DetailRow label="Est. Process" value="~30 minutes" />

            {/* Withdrawal address */}
            <div className="py-3.5 border-b border-white/[0.04]">
              <p className="text-xs text-[#6b7a8d] mb-2">Withdrawal Address</p>
              <div className="flex items-start gap-2 bg-[#0f1318] border border-white/[0.06] rounded-xl px-3.5 py-3">
                <p className="font-mono text-[11px] text-[#e8ecf0] flex-1 break-all leading-relaxed">
                  {withdrawalAddress}
                </p>
                <button
                  onClick={() => addrCopy.copy(withdrawalAddress)}
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all mt-0.5
                    ${addrCopy.copied
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-white/5 border border-white/[0.07] text-[#6b7a8d] hover:text-[#f7931a] hover:border-[#f7931a]/30"}`}
                  title="Copy address"
                >
                  {addrCopy.copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
              {addrCopy.copied && (
                <p className="text-[10px] text-emerald-400 font-mono mt-1.5">Address copied!</p>
              )}
            </div>

            {/* TX hash (if available) */}
            {txHash && (
              <div className="py-3.5">
                <p className="text-xs text-[#6b7a8d] mb-2">Transaction Hash</p>
                <div className="flex items-center gap-2 bg-[#0f1318] border border-white/[0.06] rounded-xl px-3.5 py-3">
                  <p className="font-mono text-[11px] text-[#f7931a] flex-1 break-all">{txHash}</p>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => hashCopy.copy(txHash)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                        ${hashCopy.copied
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-white/5 border border-white/[0.07] text-[#6b7a8d] hover:text-[#f7931a]"}`}>
                      {hashCopy.copied ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                    {explorerUrl && (
                      <a href={explorerUrl} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/[0.07] flex items-center justify-center text-[#6b7a8d] hover:text-[#f7931a] hover:border-[#f7931a]/30 transition-all">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Info notice ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex items-start gap-3 p-4 rounded-2xl mb-6"
          style={{ background: "rgba(247,147,26,0.05)", border: "1px solid rgba(247,147,26,0.15)" }}
        >
          <Shield size={14} className="text-[#f7931a] mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-[#6b7a8d] leading-relaxed">
            Your withdrawal is under admin review and will be processed within 30 minutes.
            Funds will be sent to the address above once approved.
            If you have any issues, contact support.
          </p>
        </motion.div>

        {/* ── What happens next ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#141920] border border-white/[0.07] rounded-2xl p-5 mb-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d] mb-4">What Happens Next</p>
          <div className="space-y-3">
            {[
              { icon: RefreshCw, label: "Admin reviews your withdrawal request",     done: true  },
              { icon: Shield,    label: "Transaction verified and funds dispatched",  done: false },
              { icon: Hash,      label: "TX hash assigned and blockchain broadcast",  done: false },
              { icon: CheckCircle,label:"Funds arrive in your external wallet",       done: false },
            ].map(({ icon: Icon, label, done }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all
                  ${done
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-white/5 border-white/[0.06]"}`}>
                  <Icon size={13} className={done ? "text-emerald-400" : "text-[#6b7a8d]"} />
                </div>
                <p className={`text-xs ${done ? "text-[#e8ecf0]" : "text-[#6b7a8d]"}`}>{label}</p>
                {done && <CheckCircle size={11} className="text-emerald-400 ml-auto flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Action buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <motion.button
            onClick={() => navigate("/dashboard")}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-all shadow-lg shadow-[#f7931a]/15"
            style={{ background: "linear-gradient(135deg,#f7931a,#ff6b00)" }}
          >
            <Home size={15} /> Go to Dashboard
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-white/5 border border-white/[0.07] text-[#6b7a8d] hover:text-white hover:bg-white/10 transition-all"
          >
            <Wallet size={15} /> New Withdrawal
          </motion.button>
        </motion.div>

        {/* ── Timing note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 mt-6 text-[11px] text-[#6b7a8d] font-mono"
        >
          <Clock size={11} />
          Submitted {fmtDate(withdrawalTime)}
        </motion.div>
      </div>

      <style>{`
        * { scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent; }
      `}</style>
    </div>
  );
}