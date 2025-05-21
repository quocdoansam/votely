import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth2";
import { ethers } from "ethers";

const MAGIC_PUBLIC_KEY = "pk_live_A900D2E896EA7063";
const RPC_URL = "https://sepolia.infura.io/v3/79ce9c8bf2fb449ab61c4f93f869740b";
const CHAIN_ID = 11155111;

export const magic = new Magic(MAGIC_PUBLIC_KEY, {
  extensions: [new OAuthExtension()],
  network: {
    rpcUrl: RPC_URL,
    chainId: CHAIN_ID,
  },
});

export const getProvider = () => {
  return new ethers.providers.Web3Provider(magic.rpcProvider as any);
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};
