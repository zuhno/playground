import styled from "@emotion/styled";
import { useConnectContext } from ".";
import { TWalletType } from "../../hooks/useAuth";

interface IWalletTypeProps {
  type: TWalletType;
  icon: "metamask" | "walletconnect" | "coinbase" | "bitkeep" | "";
}

const WalletType = ({ type, icon }: IWalletTypeProps) => {
  const { loginHandler } = useConnectContext();

  return (
    <Container onClick={() => loginHandler(type)}>
      <img src={`/assets/images/${icon}.svg`} alt="walletIcon" />
    </Container>
  );
};

export default WalletType;

const Container = styled.button`
  width: 50px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(36, 36, 36);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 60%;
    aspect-ratio: 1 / 1;
  }
`;
