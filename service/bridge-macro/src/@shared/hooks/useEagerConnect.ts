import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { CONSTANTS } from "../constants";
import useAuth, { TWalletType } from "./useAuth";

export default function useEagerConnect() {
  const { login } = useAuth();
  const { account, chainId, library } = useWeb3React();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(CONSTANTS.IS_LOGGED_IN);
    const walletType = localStorage.getItem(
      CONSTANTS.WALLET_TYPE
    ) as TWalletType;
    if (isLoggedIn && !account) {
      if (!walletType) return;
      login(walletType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, library]);
}
