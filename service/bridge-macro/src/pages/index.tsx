import SwapBox from "@shared/components/SwapBox";
import Connect from "@shared/components/Connect";
import Gap from "@shared/components/common/Gap";
import styled from "@emotion/styled";
import InfoBox from "@shared/components/InfoBox";
import { useGlobalConext } from "@shared/context/GlobalProvider";

export default function Home() {
  const { availableChain } = useGlobalConext();

  return (
    <RootLayout>
      <Connect>
        <>
          <Connect.WalletType icon="metamask" type="metamask" />
          <Gap horizontal={20} />
          <Connect.WalletType icon="walletconnect" type="walletconnect" />
          <Gap horizontal={20} />
          <Connect.WalletType icon="bitkeep" type="bitkeep" />
          <Gap horizontal={20} />
          <Connect.WalletType icon="coinbase" type="coinbase" />
        </>
        <>
          <Connect.Profile />
        </>
      </Connect>
      <Gap vertical={30} />
      <div className="box-container">
        <SwapBox>
          <SwapBox.ChainToggle />
          <Gap vertical={20} />
          {availableChain === "bnb" ? (
            <SwapBox.InputArea type="from" chain="bnb" token="cube" />
          ) : (
            <SwapBox.InputArea type="from" chain="ethereum" token="cube" />
          )}

          <Gap vertical={15} />
          <SwapBox.DirectionArea direct="bottom" />
          <Gap vertical={15} />
          <SwapBox.InputArea type="to" chain="fncy" token="fncy" />
          <Gap vertical={20} />
          <SwapBox.ErrorMsg />
          <Gap vertical={10} />
          <SwapBox.ActionButton />
        </SwapBox>
        <InfoBox>
          <InfoBox.Title text="Why?" />
          <Gap vertical={15} />
          <InfoBox.Content
            text={
              "This project was created because the 'fncy.world' bridge\nwas (so x100) inconvenient and shit. 🤮\n\n① Send from external wallet to foundation fncy wallet\n\n② Swap in foundation fncy wallet\n\n③ Send to the external wallet address of fncy network by ①\n"
            }
          />
          <Gap vertical={30} />
          <InfoBox.Content
            text={
              "⚠️ ⚠️ ⚠️ ⚠️ ⚠️\n\nfoundation fncy wallet is individual wallet. 🙂\nDo not worry. Show swap history in real time. If you're too concerned, try testing with a small amount."
            }
          />
        </InfoBox>
      </div>
    </RootLayout>
  );
}

const RootLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  .box-container {
    width: 90%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .opt-image {
    border-radius: 20px;
  }
`;
