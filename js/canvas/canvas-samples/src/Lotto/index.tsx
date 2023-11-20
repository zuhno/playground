import styled from "@emotion/styled";
import Hide from "./Hide";
import Product from "./Product";

interface IProps {
  w?: number | string;
  h?: number | string;
  onClear: (isClear: boolean) => void;
}

const Lotto = ({ w = 100, h = 100, onClear }: IProps) => {
  return (
    <RootContainer w={w} h={h}>
      <Product />
      <Hide onClear={onClear} />
    </RootContainer>
  );
};

export default Lotto;

const RootContainer = styled.div<Omit<IProps, "onClear">>`
  width: ${({ w }) => (typeof w === "number" ? `${w}px` : w)};
  height: ${({ h }) => (typeof h === "number" ? `${h}px` : h)};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
  }
  .hide {
    z-index: 1;
    cursor: url("/busd.cur"), none;
  }
  .product {
    z-index: 0;
  }
`;
