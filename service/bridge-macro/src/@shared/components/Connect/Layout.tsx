import styled from "@emotion/styled";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
