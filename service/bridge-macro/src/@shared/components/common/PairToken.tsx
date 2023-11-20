import styled from "@emotion/styled";

interface PairTokenProps {
  frontSrc: string;
  backSrc: string;
  className?: string;
}

const PairToken = ({ frontSrc, backSrc, className }: PairTokenProps) => {
  return (
    <Container className={className ?? ""}>
      <img src={frontSrc} alt="frontToken" />
      <img src={backSrc} alt="backToken" />
    </Container>
  );
};

export default PairToken;

const Container = styled.div`
  position: relative;
  width: 30px;
  aspect-ratio: 1 / 1;
  img {
    position: absolute;
    &:first-of-type {
      z-index: 2;
      width: 80%;
      aspect-ratio: 1 / 1;
      bottom: 0;
      right: 0;
    }
    &:last-of-type {
      z-index: 1;
      width: 60%;
      aspect-ratio: 1 / 1;
      top: 0;
      left: 0;
    }
  }
`;
