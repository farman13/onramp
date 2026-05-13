import { OnrampWebSDK } from "@onramp.money/onramp-web-sdk";
import { useAccount } from "wagmi";

export default function OnrampWidget() {
    const { address, isConnected } = useAccount();

    const openWidget = (flowType) => {
        if (!isConnected || !address) {
            alert("Please connect your wallet first");
            return;
        }

        const appId = Number(import.meta.env.VITE_ONRAMP_APP_ID);

        if (!appId) {
            alert("Missing VITE_ONRAMP_APP_ID in .env file");
            return;
        }

        const onrampSDK = new OnrampWebSDK({
            appId,
            walletAddress: address,

            // ✅ Removed coinCode and network
            // User will select token/network inside Onramp widget

            fiatAmount: 100,

            // 1 = Buy / Onramp
            // 2 = Sell / Offramp
            flowType,

            sandbox: false,

            theme: {
                darkMode: {
                    baseColor: "#7c3aed",
                    inputRadius: "12px",
                    buttonRadius: "14px",
                },
                lightMode: {
                    baseColor: "#7c3aed",
                    inputRadius: "12px",
                    buttonRadius: "14px",
                },
                default: "darkMode",
            },
        });

        onrampSDK.on("TX_EVENTS", (event) => {
            console.log("TX_EVENTS:", event);
        });

        onrampSDK.on("WIDGET_EVENTS", (event) => {
            console.log("WIDGET_EVENTS:", event);
        });

        onrampSDK.on("KYC_EVENTS", (event) => {
            console.log("KYC_EVENTS:", event);
        });

        try {
            onrampSDK.show();
        } catch (error) {
            console.error("Failed to open widget:", error);
            alert("Failed to open widget");
        }
    };

    return (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
                onClick={() => openWidget(1)}
                disabled={!isConnected}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-4 font-semibold text-white shadow-lg shadow-green-950/40 transition hover:scale-[1.02] hover:shadow-green-900/50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:hover:scale-100"
            >
                Buy Crypto ↗
            </button>

            <button
                onClick={() => openWidget(2)}
                disabled={!isConnected}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-5 py-4 font-semibold text-white shadow-lg shadow-red-950/40 transition hover:scale-[1.02] hover:shadow-red-900/50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:hover:scale-100"
            >
                Sell Crypto ↘
            </button>
        </div>
    );
}