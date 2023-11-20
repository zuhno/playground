import styled from "@emotion/styled";
import { useGlobalConext } from "@shared/context/GlobalProvider";

const ChainToggle = () => {
  const { availableChain, chainToggleHandler } = useGlobalConext();

  return (
    <Container>
      <p onClick={chainToggleHandler} className={availableChain}>
        <span>BSC</span>
        <span>ETH</span>
      </p>
    </Container>
  );
};

export default ChainToggle;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    position: relative;
    width: 130px;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 10rem;
    padding: 3px;
    cursor: pointer;
    user-select: none;
    transition: all 0.1s linear;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 50%;
      height: 85%;
      border-radius: 10rem;
      z-index: 0;
      transition: all 0.1s linear;
    }

    span {
      z-index: 1;
      font-size: 14px;
      font-weight: 700;
    }

    &.bnb {
      border-color: #e9b22c;
      &::before {
        background-color: #e9b22c;
        left: 3px;
      }
    }

    &.ethereum {
      border-color: #5d78df;
      &::before {
        background-color: #5d78df;
        left: calc(50% - 3px);
      }
    }
  }
`;
