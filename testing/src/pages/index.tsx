import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import TideSDK from "tide-sdk";
import { useRouter } from "next/router";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import confetti from "canvas-confetti";

const inter = Inter({ subsets: ["latin"] });

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcnJhbENhbXBhaWduSWQiOiIzZmFlOWRlOS04N2YxLTRlYjYtOTc1OS1kYzMzYzI1MzM0ZjQiLCJpYXQiOjE2ODQzMTQ2NTMsImV4cCI6MTY4NjkwNjY1M30.r3i70fYjqASpBinETWhk3gv7cuQHdUls4-kgW1qKmAA";

export default function Home() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const { tideRef } = router.query;

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    TideSDK.referrals.initialize({ AUTH_TOKEN });
  }, []);

  useEffect(() => {
    async function track() {
      if (address && isConnected && tideRef)
        await TideSDK.referrals.identify(address, (tideRef as string) || "");
    }

    track();
  }, [address, tideRef]);

  const spreadConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#ff0000", "#00ff00", "#0000ff"], // Customize the colors of the confetti particles
    });
  };

  return (
    <main
      className={`flex min-h-screen bg-gradient-to-br from-black to-[#0b254b] flex-col 
      items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 
          bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-900
          dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border 
          lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          <a href="https://tideprotocol.xyz" className="text-blue-500 mr-2">
            tideprotocol.xyz
          </a>
          Software Development Kit
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://fiveelementslabs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By FiveElementsLabs
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-row mx-auto gap-5">
          {isConnected ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 text-xl px-6 rounded-2xl transition duration-300 ease-in-out"
              onClick={() => {
                disconnect();
                setError(null);
              }}
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold text-xl py-2 px-6 rounded-2xl transition duration-300 ease-in-out"
              onClick={() => connect()}
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="flex flex-row mx-auto gap-5">
          {isConnected ? (
            <p className="text-2xl font-bold text-center lg:text-left">
              {address}
            </p>
          ) : (
            <p className="text-2xl font-bold text-center lg:text-left">
              Not Connected
            </p>
          )}
        </div>

        {address && (
          <button
            className="mb-4 text-4xl tracking-wide font-bold text-center lg:text-left p-8 bg-slate-700 rounded-2xl grid place-content-center
          transition duration-300 ease-in-out hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-900"
            onClick={async () => {
              try {
                if (address) await TideSDK.referrals.completeReferral(address);
                setError(null);
                spreadConfetti();
              } catch (err: any) {
                console.error(err);
                setError(err.message);
              }
            }}
          >
            Complete Referral
          </button>
        )}

        <div className="flex flex-row mx-auto gap-5">
          {error && (
            <p className="text-2xl text-red-500 font-bold text-center lg:text-left">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
