import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {Providers} from "@/app/providers";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Manpreet Kunnath",
	description: "Portfolio of Manpreet Kunnath",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
		<Providers>
			<div className="header">
				<Navigation/>
			</div>
			{children}
		</Providers>
		</body>
		</html>
	);
}
