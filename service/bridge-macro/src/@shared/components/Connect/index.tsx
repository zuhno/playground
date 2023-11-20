import { useWeb3React } from "@web3-react/core";
import { createContext, useContext, useEffect, useState } from "react";
import { CONSTANTS } from "../../constants";
import useAuth, { TWalletType } from "../../hooks/useAuth";
import Layout from "./Layout";
import WalletType from "./WalletType";
import Profile from "./Profile";

interface IConnectProps {
  children: React.ReactNode[];
}

interface IConnectCtx {
  loginHandler: (type: TWalletType) => Promise<void>;
  logoutHandler: () => void;
  walletType: TWalletType;
}

const ConnectContext = createContext<IConnectCtx | null>(null);

const Connect = ({ children }: IConnectProps) => {
  const { account } = useWeb3React();
  const { login, isPending, logout } = useAuth();
  const [walletType, setWalletType] = useState<TWalletType>("");

  const loginHandler = async (type: TWalletType) => {
    if (isPending || !type) return;
    await login(type);
  };

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    const _walletType = localStorage.getItem(
      CONSTANTS.WALLET_TYPE
    ) as TWalletType;
    if (_walletType) {
      setWalletType(_walletType);
    }
  }, [account]);

  return (
    <ConnectContext.Provider
      value={{ loginHandler, logoutHandler, walletType }}
    >
      <Layout>{account ? children[1] : children[0]}</Layout>
    </ConnectContext.Provider>
  );
};

Connect.WalletType = WalletType;
Connect.Profile = Profile;

export const useConnectContext = () =>
  useContext(ConnectContext) as IConnectCtx;

export default Connect;
