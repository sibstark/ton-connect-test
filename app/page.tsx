import Image from "next/image";
import { PayButton } from "./button";
import { Wallet } from "./wallet";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect } from "react";

const proof = {
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb21fYnl0ZXMiOiI2YjQ1YzZiMjlkMGIxYmQwMGEwMzczMjVjMDg3MTU2N2YxNjJlNjNiNTZlOGM2YTJiMzVkNmJhN2QzMWE1MmJhIiwiZXhwIjoxNzUzNjQ0ODYyfQ.zNawMg0DbkXkyM5DUsdLGKipnDyRR5x9xBhGUAP_X0s",
  token_hash: "1de63c6f8c204620b95e236997233d85d9d59825421543728306d7ffcd9a0bc9"
};

export default function Home() {
  const [connector] = useTonConnectUI();
  useEffect(() => {
    connector.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: proof.token_hash }
    });
  }, [connector]);

  useEffect(() => {
    const unsubscribe = connector.onStatusChange(walletInfo => {
      if (walletInfo?.connectItems?.tonProof) {
        const proof = walletInfo.connectItems.tonProof;
        console.log('TON Proof:', proof);
      }
    });

    return () => unsubscribe();
  }, [connector]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 gap-12 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-neutral-900">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={160}
        height={36}
        className="dark:invert"
        priority
      />

      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Подключите TON-кошелёк для оплаты
      </h1>

      <PayButton />
      <Wallet />
      <footer className="absolute bottom-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} – TON App
      </footer>
    </div>
  );
}