import styled from "@emotion/styled";
import Box from "./Box";

interface IProps {
  w?: number | string;
  h?: number | string;
  onClear: (isClear: boolean) => void;
}

const Cube = ({ w = 100, h = 100, onClear }: IProps) => {
  return (
    <RootContainer w={w} h={h}>
      <Box />
    </RootContainer>
  );
};

export default Cube;

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
`;
