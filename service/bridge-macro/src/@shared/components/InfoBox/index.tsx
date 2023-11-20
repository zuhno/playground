import { createContext, useContext } from "react";
import Title from "./Title";
import Content from "./Content";
import Layout from "./Layout";

interface IInfoBoxProps {
  children: React.ReactNode;
}

interface IInfoBoxCtx {}

const InfoBoxContext = createContext<IInfoBoxCtx | null>(null);

const InfoBox = ({ children }: IInfoBoxProps) => {
  return (
    <InfoBoxContext.Provider value={{}}>
      <Layout>{children}</Layout>
    </InfoBoxContext.Provider>
  );
};

InfoBox.Title = Title;
InfoBox.Content = Content;

export const useInfoBoxContext = () =>
  useContext(InfoBoxContext) as IInfoBoxCtx;

export default InfoBox;
