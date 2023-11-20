import styled from "@emotion/styled";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 460px;
  width: 100%;
  background-color: rgb(36, 36, 36);
  padding: 30px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
`;
