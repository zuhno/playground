import styled from "@emotion/styled";

interface IArrowProps {
  direct?: "bottom" | "right" | "left" | "top";
}

const DirectionArea = ({ direct = "bottom" }: IArrowProps) => {
  return (
    <Container>
      <Wrapper>
        <img src="/assets/images/arrow.svg" alt="" className={direct} />
      </Wrapper>
    </Container>
  );
};

export default DirectionArea;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(52, 52, 52);
  border-radius: 50%;
  img {
    width: 70%;
    height: auto;
    &.bottom {
      transform: rotate(90deg);
    }
    &.left {
      transform: rotate(180deg);
    }
    &.right {
    }
    &.top {
      transform: rotate(270deg);
    }
  }
`;
