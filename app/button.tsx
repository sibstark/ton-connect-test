"use client";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";

const proof = {
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb21fYnl0ZXMiOiJkOTQ2Yzc3NWNhYzI1Nzk2NGJiOTljMDQzZTczNGNhMzI4N2QwM2M1M2M3MDQ4ZmJmNWI1NmFkOTc4YjFhNDFiIiwiZXhwIjoxNzUzNzIyMDQxfQ.3RuwnHGJlUd3lGbF3FlrMnJOtjF_IKaa8YRH4hnjzCo",
    token_hash: "29e94132ae61b5686e3b8b3584ac4cd1d85825ecdec66f1eb2c0b39e4093bd18"
};

export function PayButton() {
    const wallet = useTonWallet();
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
                console.log('TON account wallet:', wallet?.account);
            }
        });

        return () => unsubscribe();
    }, [connector, wallet]);
    return <TonConnectButton className="scale-110" />;
}