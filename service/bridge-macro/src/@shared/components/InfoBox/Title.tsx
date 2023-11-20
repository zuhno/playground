import styled from "@emotion/styled";

interface ITitleProps {
  text: string;
}

const Title = ({ text }: ITitleProps) => {
  return <Container>{text}</Container>;
};

export default Title;

const Container = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
`;
