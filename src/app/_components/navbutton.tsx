"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const NavButton = ({ name, href }: { name: string; href: string }) => {
  const prams = useParams();
  const pathName = usePathname();
  console.log("🚀 ~ NavButton ~ pathName:", pathName);
  console.log("🚀 ~ NavButton ~ prams:", prams);

  return (
    <Link href={href} className={`active btn btn-md mr-2 text-lg ${pathName === href ? "btn-active" : "btn-ghost"}`}>
      {name}
    </Link>
  );
};
