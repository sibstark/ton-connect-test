"use client";
import { useTonWallet } from '@tonconnect/ui-react';
import { TonConnect, IStorage } from "@tonconnect/sdk";
class SmartStorage implements IStorage {
    private fallback = new Map<string, string>();
    private hasLocalStorage: boolean;

    constructor() {
        this.hasLocalStorage = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
    }

    async setItem(key: string, value: string): Promise<void> {
        if (this.hasLocalStorage) {
            localStorage.setItem(key, value);
        } else {
            this.fallback.set(key, value);
        }
    }

    async getItem(key: string): Promise<string | null> {
        if (this.hasLocalStorage) {
            return localStorage.getItem(key);
        } else {
            return this.fallback.get(key) ?? null;
        }
    }

    async removeItem(key: string): Promise<void> {
        if (this.hasLocalStorage) {
            localStorage.removeItem(key);
        } else {
            this.fallback.delete(key);
        }
    }
}
export const connector = new TonConnect({
  manifestUrl: "https://sibstark.github.io/ton-connect-test/tonconnect-manifest.json",
  storage: new SmartStorage()
});

export const Wallet = () => {
    const wallet = useTonWallet();
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