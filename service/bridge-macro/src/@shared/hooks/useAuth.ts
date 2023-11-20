import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useState } from "react";
import { CONSTANTS } from "../constants";

export type TWalletType =
  | "metamask"
  | "walletconnect"
  | "coinbase"
  | "bitkeep"
  | "";

const RPC_URLS = {
  [process.env.NEXT_PUBLIC_BNB_CHAIN_ID!]: process.env.NEXT_PUBLIC_BNB_RPC_URL!,
  [process.env.NEXT_PUBLIC_ETH_CHAIN_ID!]: process.env.NEXT_PUBLIC_ETH_RPC_URL!,
};

export const SUPPORTED_CHAIN_IDS = Object.keys(RPC_URLS).map((key) =>
  Number(key)
);

const injectedConnector = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
const walletconnectConnector = new WalletConnectConnector({
  chainId: Number(process.env.NEXT_PUBLIC_BNB_CHAIN_ID!),
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  rpc: RPC_URLS,
});
const walletlinkConnector = new WalletLinkConnector({
  url: RPC_URLS[SUPPORTED_CHAIN_IDS[0]],
  appName: "bridge-macro",
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export default function useAuth() {
  const { activate, deactivate } = useWeb3React();
  const [isPending, setIsPending] = useState(false);

  const logout = () => {
    deactivate();
    localStorage.clear();
  };

  const login = async (type: TWalletType) => {
    localStorage.setItem(CONSTANTS.IS_LOGGED_IN, "true");
    localStorage.setItem(CONSTANTS.WALLET_TYPE, type);
    setIsPending(true);
    await new Promise((r) => {
      switch (type) {
        case "metamask":
          activate(injectedConnector, (err) => {
            logout();
            console.error(err);
          }).finally(() => r(true));
          break;
        case "walletconnect":
        case "bitkeep":
          activate(walletconnectConnector, (err) => {
            logout();
            console.error(err);
          }).finally(() => r(true));
          break;
        case "coinbase":
          activate(walletlinkConnector, (err) => {
            logout();
            console.error(err);
          }).finally(() => r(true));
          break;
        default:
          break;
      }
    });
    setIsPending(false);
  };

  return { login, logout, isPending };
}
