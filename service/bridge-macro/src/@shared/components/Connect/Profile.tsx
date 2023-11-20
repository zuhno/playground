import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { useConnectContext } from ".";
import WalletType from "./WalletType";

const Profile = () => {
  const { account } = useWeb3React();
  const { walletType, logoutHandler } = useConnectContext();

  return (
    <Container>
      <WalletType icon={walletType} type={walletType} />
      <p>{account}</p>
      <button className="logout" onClick={logoutHandler}>
        Log Out
      </button>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: white;
    padding: 5px 10px;
    background-color: rgb(36, 36, 36);
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 14px;
  }

  .logout {
    cursor: pointer;
    user-select: none;
    color: white;
    padding: 7px 10px;
    background-color: rgb(36, 36, 36);
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 12px;

    &:hover {
      opacity: 0.6;
    }
  }
`;
