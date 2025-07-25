"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";

export function TonProvider({ children }: { children: ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://sibstark.github.io/ton-connect-test/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}