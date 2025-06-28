"use client";

import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitch from "@/components/ThemeSwitch";
import {usePathname} from 'next/navigation';

interface NavLinkProps {
	href: string;
	imgSrc: string;
	alt: string;
	children: React.ReactNode;
}

const NavLink = ({href, imgSrc, alt, children}: NavLinkProps) => {
	const pathname = usePathname();
	const selected = pathname === href;

	return (
		<Link href={href} className={`nav-link ${selected ? 'selected' : ''}`}>
			<Image src={imgSrc} alt={alt} width={20} height={20} className="theme-icon"/>
			<span className="nav-text">{children}</span>
		</Link>
	);
}

const Navigation = () => {
	const pathname = usePathname();

	return (
		<nav className="navigation-container">
			<Link href="/" className={`nav-button nav-link ${pathname == '/' ? 'selected' : ''}`}>
				<Image src="/home.svg" alt="Home" width={20} height={20} className="theme-icon"/>
			</Link>
			<div className="divider ms-3 "></div>
			<div className="nav-links">
				<NavLink href="/about" imgSrc="/user.svg" alt="About">About</NavLink>
				<NavLink href="/work" imgSrc="/work.svg" alt="Work">Work</NavLink>
				<NavLink href="/blog" imgSrc="/blog.svg" alt="Blog">Blog</NavLink>
			</div>
			<div className="divider me-3"></div>
			<div className="nav-button">
				<ThemeSwitch />
			</div>
		</nav>
	);
};

export default Navigation;
