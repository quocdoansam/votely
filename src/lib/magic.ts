import { OAuthExtension } from "@magic-ext/oauth2";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";

export const magic = new Magic("pk_live_A900D2E896EA7063", {
    extensions: [new OAuthExtension()],
    network: {
        rpcUrl: "https://sepolia.infura.io/v3/79ce9c8bf2fb449ab61c4f93f869740b",
        chainId: 11155111,
    },
});

export const getProvider = () => {
    return new ethers.providers.Web3Provider(magic.rpcProvider as any);
};
