import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import {ThemeClientProvider} from "@/providers/ThemeClientProvider";
import {ConvexClientProvider} from "@/providers/ConvexClientProvider";
import {ReactNode} from "react";

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

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
		<ThemeClientProvider>
			<ConvexClientProvider>
				<div className="header">
					<Navigation/>
				</div>
				{children}
			</ConvexClientProvider>
		</ThemeClientProvider>
		</body>
		</html>
	);
}
