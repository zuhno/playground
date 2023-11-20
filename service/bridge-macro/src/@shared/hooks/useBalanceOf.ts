import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import { AbiItem, fromWei } from "web3-utils";
import erc20ABI from "../abi/erc20ABI.json";

export default function useBalanceOf() {
  const { account } = useWeb3React();
  const [fncyBalance, setFncyBalance] = useState("-");
  const [bnbCubeBalance, setBnbCubeBalance] = useState("-");
  const [ethCubeBalance, setEthCubeBalance] = useState("-");

  const bnbWeb3 = useMemo(
    () => new Web3(process.env.NEXT_PUBLIC_BNB_RPC_URL!),
    []
  );
  const ethWeb3 = useMemo(
    () => new Web3(process.env.NEXT_PUBLIC_ETH_RPC_URL!),
    []
  );
  const fncyWeb3 = useMemo(
    () => new Web3(process.env.NEXT_PUBLIC_FNCY_RPC_URL!),
    []
  );
  const bnbCubeContract = useMemo(
    () =>
      new bnbWeb3.eth.Contract(
        erc20ABI as AbiItem[],
        process.env.NEXT_PUBLIC_BSC_CUBE!
      ),
    [bnbWeb3]
  );
  const ethCubeContract = useMemo(
    () =>
      new ethWeb3.eth.Contract(
        erc20ABI as AbiItem[],
        process.env.NEXT_PUBLIC_ETH_CUBE!
      ),
    [ethWeb3]
  );

  const clear = () => {
    setFncyBalance("-");
    setBnbCubeBalance("-");
    setEthCubeBalance("-");
  };

  const getBalance = async () => {
    if (!account) {
      clear();
      return;
    }
    const _fncyBalance = await fncyWeb3.eth.getBalance(account);
    const _bnbCubeBalance = await bnbCubeContract.methods
      .balanceOf(account)
      .call();
    const _ethCubeBalance = await ethCubeContract.methods
      .balanceOf(account)
      .call();
    setFncyBalance(fromWei(_fncyBalance));
    setBnbCubeBalance(fromWei(_bnbCubeBalance));
    setEthCubeBalance(fromWei(_ethCubeBalance));
  };

  useEffect(() => {
    getBalance();
    const intervalId = setInterval(async () => {
      getBalance();
    }, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { fncyBalance, bnbCubeBalance, ethCubeBalance };
}
