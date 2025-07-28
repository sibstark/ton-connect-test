"use client";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect } from "react";

const proof = {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb21fYnl0ZXMiOiI5YzQyNGRlYjg0MGI3YjdmM2UwZWYzZTc3YWYyNWExMTM1MWQ2MTBhNmExMTUyMGZlZTJkY2RjYzEyZTY3MTM1IiwiZXhwIjoxNzUzNzc2NTg4fQ.mdTnUtQqQF3zOmMkMUKxdIivv1q14biVifrYugnsChk",
    "token_hash": "78c8183ff8b2ada64672c3f7b340aae072514eb9f5782c76308b15d44759e5a2"
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