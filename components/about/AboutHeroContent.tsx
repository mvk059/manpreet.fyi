'use client';

import Image from "next/image";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Shimmer from "@/components/Shimmer";
import Link from "next/link";

export default function AboutHeroContent() {
  const about = useQuery(api.about.get);

  if (!about) {
    return (
      <div className="about-section">
        <Shimmer width="60%" height="2.5em" className="mb-4" />
        <Shimmer width="80%" height="1.5em" className="mb-4" />
        <div className="flex gap-4 mt-4">
          <Shimmer width="24px" height="24px" className="rounded-full" />
          <Shimmer width="24px" height="24px" className="rounded-full" />
          <Shimmer width="24px" height="24px" className="rounded-full" />
          <Shimmer width="24px" height="24px" className="rounded-full" />
        </div>
        <Shimmer width="100%" height="6em" className="mt-4" />
      </div>
    );
  }

  return (
    <div className="about-section">
      <h1 className="about-name">{about.name}</h1>
      <p className="about-subtitle">{about.subtitle}</p>
      <div className="about-social-links">
        {about.socials.map((social) => (
          social.url ? (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              className="about-social-link"
            >
              <Image
                src={social.iconUrl ?? "/#"}
                alt={social.platform}
                width={24}
                height={24}
                className="theme-icon"
              />
            </Link>
          ) : null
        ))}
      </div>
      <p className="about-description">{about.description}</p>
    </div>
  );
}
