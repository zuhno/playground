import { useWeb3React } from "@web3-react/core";
import {
  ChangeEvent,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import InputArea from "./InputArea";
import DirectionArea from "./DirectionArea";
import ActionButton from "./ActionButton";
import Layout from "./Layout";
import useInput from "../../hooks/useInput";
import useBalanceOf from "../../hooks/useBalanceOf";
import Web3 from "web3";
import BN from "bignumber.js";
import { AbiItem, toWei } from "web3-utils";
import axios from "axios";
import { toast } from "react-toastify";

import erc20ABI from "../../abi/erc20ABI.json";
import ErrorMsg from "./ErrorMsg";
import ChainToggle from "./ChainToggle";
import { useGlobalConext } from "@shared/context/GlobalProvider";

interface ISwapBoxProps {
  children: React.ReactNode;
}

interface ISwapBoxCtx {
  isConnected: boolean;
  value: string;
  balanceError: string;
  isDisableSubmit: boolean;
  isProcessing: boolean;
  balances: {
    fncyOnFncy: string;
    cubeOnBnb: string;
    cubeOnEth: string;
  };
  clearValue: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  onMax: (_v: string) => void;
}

const SwapBoxContext = createContext<ISwapBoxCtx | null>(null);

const SwapBox = ({ children }: ISwapBoxProps) => {
  const { account, library, chainId } = useWeb3React();
  const { value, clearValue, onChange, setValue } = useInput("");
  const { fncyBalance, bnbCubeBalance, ethCubeBalance } = useBalanceOf();
  const [isProcessing, setIsProcessing] = useState(false);
  const { availableChain, unmatchChainError } = useGlobalConext();

  const contract = useMemo(() => {
    const web3 = new Web3(library);
    return new web3.eth.Contract(
      erc20ABI as AbiItem[],
      process.env.NEXT_PUBLIC_BSC_CUBE!
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, chainId]);

  const balanceError = new BN(value).gt(
    availableChain === "bnb" ? bnbCubeBalance : ethCubeBalance
  )
    ? "Insufficient Balance"
    : "";

  const isDisableSubmit =
    !account ||
    !contract ||
    !value ||
    new BN(value).lte(0) ||
    !!unmatchChainError ||
    !!balanceError;

  const onMax = (_value: string) => {
    setValue(_value);
  };

  const onSubmit = async () => {
    if (isDisableSubmit || isProcessing) return;

    setIsProcessing(true);
    const toastId = toast.loading("Transaction Pending 😪");
    try {
      await new Promise(async (r, j) => {
        try {
          await contract.methods
            .transfer(process.env.NEXT_PUBLIC_FOUNDATION_ADDRESS!, toWei(value))
            .send({ from: account })
            .once("receipt", async function (receipt: any) {
              try {
                await axios.post("http://localhost:4000/send", {
                  value: value,
                  toAddress: account,
                });

                clearValue();
                toast.update(toastId, {
                  render: "Transaction Success 😎",
                  type: "success",
                  isLoading: false,
                  autoClose: 4000,
                });
                r(true);
              } catch (error) {
                j(error);
              }
            });
        } catch (error) {
          j(error);
        }
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Transaction Failed 🤯",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SwapBoxContext.Provider
      value={{
        isConnected: !!account,
        value,
        isProcessing,
        balanceError,
        isDisableSubmit,
        balances: {
          fncyOnFncy: fncyBalance,
          cubeOnBnb: bnbCubeBalance,
          cubeOnEth: ethCubeBalance,
        },
        clearValue,
        onChange,
        onSubmit,
        onMax,
      }}
    >
      <Layout>{children}</Layout>
    </SwapBoxContext.Provider>
  );
};

SwapBox.InputArea = InputArea;
SwapBox.DirectionArea = DirectionArea;
SwapBox.ActionButton = ActionButton;
SwapBox.ErrorMsg = ErrorMsg;
SwapBox.ChainToggle = ChainToggle;

export const useSwapBoxContext = () =>
  useContext(SwapBoxContext) as ISwapBoxCtx;

export default SwapBox;
