"use client";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect } from "react";

const proof = {
    "token_hash": "b455903996327db70000000068892bf527fea613f25274500a5292f1f4e24c83"
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
                console.log('TON account wallet:', walletInfo?.account);
            }
        });

        return () => unsubscribe();
    }, [connector]);
    return <TonConnectButton className="scale-110" />;
}