import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/WalletAuthWrapper";
import { networks } from "../utils/networks";

export default function Join() {
  const { user, setUser, connectWallet } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  return (
    <>
      <Head>
        <title>ChainAid</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-3xl">
        Welcome {user ? `${user.slice(0, 4)}...${user.slice(38, 42)}` : "User"}
      </h2>

      <div className="flex mt-20 gap-x-5 pb-40">
        <Link href={"/org/new"}>
          <button className="p-10 bg-white bg-opacity-20 rounded-3xl text-xl">
            Join as an Organization
          </button>
        </Link>

        <Link href={"/mentor/new"}>
          <button className="p-10 bg-white bg-opacity-20 rounded-3xl text-xl">
            Join as a Support Member
          </button>
        </Link>

        <Link href={"/chat"}>
          <button className="p-10 bg-white bg-opacity-20 rounded-3xl text-xl">
            Demo
          </button>
        </Link>
      </div>
    </>
  );
}
