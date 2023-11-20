import styled from "@emotion/styled";
import BN from "bignumber.js";
import { useSwapBoxContext } from ".";
import PairToken from "../common/PairToken";

interface InputAreaProps {
  type: "from" | "to";
  token: "cube" | "fncy";
  chain: "bnb" | "ethereum" | "fncy";
}

export default function InputArea({ type, token, chain }: InputAreaProps) {
  const { isConnected, value, onMax, onChange, balances, isProcessing } =
    useSwapBoxContext();

  const balanceOf = () => {
    if (type === "from") {
      if (chain === "bnb") return balances["cubeOnBnb"];
      else return balances["cubeOnEth"];
    }
    return balances["fncyOnFncy"];
  };

  const maxHandler = () => {
    onMax(balanceOf());
  };

  const calculateValueOnToArea = () => {
    if (value === "") return "";
    return new BN(value).dividedBy(10).multipliedBy(9).toString();
  };

  return (
    <Container>
      <TitleArea>
        <span>{type}</span>
        <div>
          <PairToken
            className="pair-token"
            frontSrc={`/assets/images/${chain}.svg`}
            backSrc={`/assets/images/${token}.svg`}
          />
          <span>
            {token} ({chain})
          </span>
        </div>
      </TitleArea>
      <BalanceArea>Balance : {balanceOf() || "-"}</BalanceArea>
      <TypeArea isFrom={type === "from"}>
        <input
          type="text"
          placeholder="0.00"
          disabled={type === "to" || !isConnected}
          onChange={onChange}
          value={type === "from" ? value : calculateValueOnToArea()}
        />
        {type === "from" && (
          <button
            className="max"
            disabled={!isConnected || isProcessing}
            onClick={maxHandler}
          >
            MAX
          </button>
        )}
      </TypeArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 12px 25px;
  border-radius: 12px;
  background-color: #1d1d1d;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  > span {
    color: #ffffff66;
    text-transform: capitalize;
    font-size: 13px;
  }
  div {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    font-size: 14px;

    .pair-token {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
`;

const BalanceArea = styled.div`
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 10px;
  font-size: 13px;
  line-height: 14px;
`;

const TypeArea = styled.div<{ isFrom: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    width: ${({ isFrom }) => (isFrom ? "85%" : "100%")};
    background-color: #1d1d1d;
    outline: none;
    border: none;
    text-align: end;
    color: white;
    font-size: 16px;
  }

  button.max {
    width: 15%;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5rem;
    border: none;
    outline: none;
    font-weight: 700;
    font-size: 13px;
    background-color: rgb(52, 52, 52);
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background-color: rgb(52, 52, 52);
      color: rgba(255, 255, 255, 0.1);
      border: 1px solid transparent;
      pointer-events: none;
    }
  }
`;
