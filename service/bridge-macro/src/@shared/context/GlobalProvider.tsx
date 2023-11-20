import useEagerConnect from "@shared/hooks/useEagerConnect";
import { useWeb3React } from "@web3-react/core";
import { createContext, useContext, useMemo, useState } from "react";

interface IGlobalProviderProps {
  children: React.ReactNode;
}

interface IGlobalCtx {
  availableChain: "bnb" | "ethereum";
  unmatchChainError: string;
  chainToggleHandler: () => void;
}

const GlobalContext = createContext<IGlobalCtx | null>(null);

const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  useEagerConnect();
  const { account, chainId } = useWeb3React();
  const [availableChain, setAvailableChain] = useState<"bnb" | "ethereum">(
    "bnb"
  );

  const isSameChain = useMemo(
    () =>
      availableChain === "bnb"
        ? chainId === Number(process.env.NEXT_PUBLIC_BNB_CHAIN_ID)
        : chainId === Number(process.env.NEXT_PUBLIC_ETH_CHAIN_ID),
    [availableChain, chainId]
  );

  const unmatchChainError = account && !isSameChain ? "Unmatch Chain Id" : "";

  const chainToggleHandler = () => {
    setAvailableChain((prev) => (prev === "bnb" ? "ethereum" : "bnb"));
  };

  return (
    <GlobalContext.Provider
      value={{
        availableChain,
        unmatchChainError,
        chainToggleHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalConext = () => useContext(GlobalContext) as IGlobalCtx;

export default GlobalProvider;
