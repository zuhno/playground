import styled from "@emotion/styled";
import { useSwapBoxContext } from ".";

const ActionButton = () => {
  const { isDisableSubmit, onSubmit, isProcessing } = useSwapBoxContext();

  return (
    <Container disabled={isDisableSubmit || isProcessing} onClick={onSubmit}>
      {isProcessing ? "Processing" : "Swap"}
    </Container>
  );
};

export default ActionButton;

const Container = styled.button`
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    120.04deg,
    rgb(125, 92, 224) 4.63%,
    rgb(255, 72, 138) 100%
  );
  border: none;
  border-radius: 12px;
  font-size: 17px;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background: rgb(52, 52, 52);
    color: rgba(255, 255, 255, 0.1);
  }
`;
