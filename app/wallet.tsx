"use client";
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();
    const [connector] = useTonConnectUI();
    const login = async () => {
        const challenge = "login-abc123";

        const result = await connector.signData({
            type: "text",
            text: challenge,
        });

        console.log("result:", result); // base64
        alert(result);
    };
    return (
        wallet && (
            <div className="flex flex-col gap-4">
                <div>
                    <span>Connected wallet: {wallet?.account?.address}</span>
                </div>
                <div>
                    <span>Device: {wallet?.device?.appName}</span>
                </div>
                <button onClick={login}>login</button>
            </div>

        )
    );
};