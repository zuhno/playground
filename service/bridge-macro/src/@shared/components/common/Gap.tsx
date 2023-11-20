import styled from "@emotion/styled";

interface IGapProps {
  vertical?: string | number;
  horizontal?: string | number;
}

const Gap = ({ vertical = "100%", horizontal = "100%" }: IGapProps) => {
  return <Container vertical={vertical} horizontal={horizontal} />;
};

export default Gap;

const Container = styled.div<IGapProps>`
  width: ${({ horizontal }) =>
    typeof horizontal === "number" ? `${horizontal}px` : horizontal};
  height: ${({ vertical }) =>
    typeof vertical === "number" ? `${vertical}px` : vertical};
`;
