import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Lotto from "../Lotto";

function LottoContainer() {
  const [trigger, setTrigger] = useState(false);
  const [costume, setCostume] = useState(false);

  const onClear = (isClear) => {
    if (isClear) {
      setTrigger(true);
      setTimeout(() => {
        setCostume(true);
      }, 2500);
    }
  };

  return (
    <Container className={trigger ? "spin" : ""}>
      <img className="main--image" src="/golden-bros.png" alt="" />
      <div className="main--canvas">
        {costume ? (
          <img className="main--costume" src="/costume.png" alt="" />
        ) : (
          <Lotto w={230} h={230} onClear={onClear} />
        )}
      </div>
    </Container>
  );
}

export default LottoContainer;

const spin = keyframes`
  0%{
    transform: rotateX(0)  scale(1);
  }30%{
    transform: rotateX(0)  scale(0.9);
    filter: drop-shadow(0 0 5px #ffeea2) brightness(1);
  }50%{
    transform: rotateX(2400deg)  scale(0.1);
    filter: drop-shadow(0 0 20px #ffeea2) brightness(20);
  }80%{
    transform: rotateX(0)  scale(0.1);
    filter: drop-shadow(0 0 20px #ffeea2) brightness(5);
  }95%{
    transform: rotateX(0)  scale(1);
    filter: drop-shadow(0 0 5px #ffeea2) brightness(1);
  }98%{
    transform: rotateX(0)  scale(1);
    filter: drop-shadow(0 0 10px #ffeea2) brightness(2);
  }100%{
    transform: rotateX(0)  scale(1);
    filter: drop-shadow(0 0 5px #ffeea2) brightness(1);
  }
`;

const Container = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url("/bros-bg.png");
  background-size: cover;
  background-attachment: fixed;
  box-sizing: border-box;
  background-repeat: no-repeat;
  overflow: hidden;
  user-select: none;
  .main {
    &--image {
      width: 190px;
      backdrop-filter: blur(1px);
    }
    &--canvas {
      backdrop-filter: blur(1px);
      border-radius: 20px;
      box-shadow: 0 0 5px #868686;
    }
    &--costume {
      width: 160px;
      filter: drop-shadow(0 0 5px #1b1b1b);
    }
  }
  &.spin {
    animation: ${spin} 5s linear forwards;
  }
`;
