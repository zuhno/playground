import styled from "@emotion/styled";
import Box from "./Box";

interface IProps {
  w?: number | string;
  h?: number | string;
  onClear: (isClear: boolean) => void;
}

const Lots = () => {
  return (
    // <RootContainer w={500} h={500}>
    <Box />
    // </RootContainer>
  );
};

export default Lots;

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
  }
  .hide {
    z-index: 1;
    cursor: url("/busd.cur"), none;
  }
  .product {
    z-index: 0;
  }
`;
