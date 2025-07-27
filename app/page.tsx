import Image from "next/image";
import { PayButton } from "./button";
import { Wallet } from "./wallet";

export default function Home() {
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