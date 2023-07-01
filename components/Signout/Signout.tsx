"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Signout = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default Signout;
