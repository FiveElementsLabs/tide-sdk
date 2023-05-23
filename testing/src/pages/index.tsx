import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import TideSDK from "tide-sdk";
import { useRouter } from "next/router";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const inter = Inter({ subsets: ["latin"] });

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcnJhbENhbXBhaWduSWQiOiIzZmFlOWRlOS04N2YxLTRlYjYtOTc1OS1kYzMzYzI1MzM0ZjQiLCJpYXQiOjE2ODQzMTQ2NTMsImV4cCI6MTY4NjkwNjY1M30.r3i70fYjqASpBinETWhk3gv7cuQHdUls4-kgW1qKmAA";

export default function Home() {
  const router = useRouter();

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
    if (address && isConnected && tideRef)
      TideSDK.referrals.identify(address, (tideRef as string) || "");
  }, [address, tideRef]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Visit
          <a href="https://tideprotocol.xyz" className="text-blue-500 ml-1.5">
            tideprotocol.xyz
          </a>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By FiveElementsLabs
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row mx-auto gap-5">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => connect()}
          >
            Connect Wallet
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => disconnect()}
          >
            Disconnect Wallet
          </button>
        </div>
        <button
          className="mb-4 text-6xl font-bold text-center lg:text-left p-8 bg-slate-700 rounded-2xl grid place-content-center"
          onClick={() => address && TideSDK.referrals.completeReferral(address)}
        >
          Complete Referral
        </button>

        <div className="flex flex-row mx-auto gap-5">
          {isConnected ? (
            <p className="text-2xl font-bold text-center lg:text-left">
              Connected as {address}
            </p>
          ) : (
            <p className="text-2xl font-bold text-center lg:text-left">
              Not Connected
            </p>
          )}
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
