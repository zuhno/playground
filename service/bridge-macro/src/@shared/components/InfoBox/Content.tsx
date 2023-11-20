import styled from "@emotion/styled";

interface IContentProps {
  text: string;
}

const Content = ({ text }: IContentProps) => {
  return <Container>{text}</Container>;
};

export default Content;

const Container = styled.div`
  white-space: pre-line;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.6);
`;
