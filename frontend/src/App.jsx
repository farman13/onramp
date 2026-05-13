import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import OnrampWidget from "./components/OnrampWidget";

function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  return (
    <div className="min-h-screen overflow-hidden bg-[#050510] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[-80px] h-[360px] w-[360px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-20 left-[-120px] h-[320px] w-[320px] rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur">
              <span className="text-2xl">⚡</span>
            </div>

            <h1 className="bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Onramp Widget Demo
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Buy and sell crypto directly from your wallet using Onramp.money.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-purple-950/30 backdrop-blur-xl md:p-6">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Wallet
                </p>
                <h2 className="mt-1 text-lg font-semibold">Connect Wallet</h2>
              </div>

              <ConnectButton />
            </div>

            {/* Wallet Status */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-300">
                  Wallet Status
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${isConnected
                      ? "bg-green-500/15 text-green-400 ring-1 ring-green-500/30"
                      : "bg-red-500/15 text-red-400 ring-1 ring-red-500/30"
                    }`}
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Wallet Address</p>
                  <p className="mt-1 break-all rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-gray-200">
                    {address || "Not connected"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Chain ID</p>
                  <p className="mt-1 rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-gray-200">
                    {chainId || "Not connected"}
                  </p>
                </div>
              </div>
            </div>

            {/* Flexible Asset Info */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-lg ring-1 ring-purple-500/30">
                  ✨
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Flexible Asset Selection
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Token, network, fiat currency, and payment method will be
                    selected inside the Onramp widget based on availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Onramp Buttons */}
            <OnrampWidget />

            <p className="mt-5 text-center text-xs leading-5 text-gray-500">
              Sandbox mode enabled. Use production app ID before going live.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;