"use client";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export function PayButton() {
  const [connector] = useTonConnectUI();
  const searchParams = useSearchParams();

  const tokenHash = useMemo(() => searchParams.get("token_hash") ?? "", [searchParams]);

  useEffect(() => {
    if (!tokenHash) {
      connector.setConnectRequestParameters(null);
      return;
    }
    connector.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: tokenHash },
    });
  }, [connector, tokenHash]);

  useEffect(() => {
    const unsubscribe = connector.onStatusChange((walletInfo) => {
      if (walletInfo?.connectItems?.tonProof) {
        console.log("TON Proof:", walletInfo.connectItems.tonProof);
        console.log("Account:", walletInfo.account);
      }
    });
    return () => unsubscribe();
  }, [connector]);

  return <TonConnectButton className="scale-110" />;
}