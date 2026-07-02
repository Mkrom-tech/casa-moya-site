import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Moya",
  description: "Boek rechtstreeks — Casa Moya Moraira en Moya Apartment Denia, Costa Blanca."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
