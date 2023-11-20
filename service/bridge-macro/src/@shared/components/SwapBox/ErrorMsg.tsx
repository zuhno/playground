import styled from "@emotion/styled";
import { useGlobalConext } from "@shared/context/GlobalProvider";
import { useSwapBoxContext } from ".";

const ErrorMsg = () => {
  const { balanceError } = useSwapBoxContext();
  const { unmatchChainError } = useGlobalConext();
  return (
    <Container>
      {balanceError ? <Message>{balanceError}</Message> : null}
      {unmatchChainError ? <Message>{unmatchChainError}</Message> : null}
    </Container>
  );
};

export default ErrorMsg;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Message = styled.div`
  width: 100%;
  padding: 7px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 44, 54, 0.12);
  border-radius: 8px;

  color: rgb(255, 44, 54);
`;
