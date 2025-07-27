"use client";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect } from "react";

const proof = {
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb21fYnl0ZXMiOiI2YjQ1YzZiMjlkMGIxYmQwMGEwMzczMjVjMDg3MTU2N2YxNjJlNjNiNTZlOGM2YTJiMzVkNmJhN2QzMWE1MmJhIiwiZXhwIjoxNzUzNjQ0ODYyfQ.zNawMg0DbkXkyM5DUsdLGKipnDyRR5x9xBhGUAP_X0s",
    token_hash: "1de63c6f8c204620b95e236997233d85d9d59825421543728306d7ffcd9a0bc9"
};

export function PayButton() {

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
    return <TonConnectButton className="scale-110" />;
}