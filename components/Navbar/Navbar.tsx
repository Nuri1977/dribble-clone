import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "../AuthProviders/AuthProviders";
import { getCurrentUser } from "@/lib/session";
import Signout from "../Signout/Signout";

const Navbar = async () => {
  const session = await getCurrentUser();
  console.log(session);

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={115} height={43} />
        </Link>
      </div>
      <ul className="xl:flex hidden text-small gap-7">
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.key}>
            {link.text}
          </Link>
        ))}
      </ul>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <Image
              src={session.user.image || "/user.svg"}
              width={40}
              height={40}
              alt="user photo"
            />
            <Link href="/create-project">Share Work</Link>
            <Signout />
          </>
        ) : (
          <>
            <AuthProviders />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
