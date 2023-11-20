import { css, Global } from "@emotion/react";
import GlobalProvider from "@shared/context/GlobalProvider";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={(library) => library}>
      <Global
        styles={css`
          html,
          body {
            width: 100%;
            height: 100%;
            background-color: #1d1d1d;
          }
          * {
            box-sizing: border-box;
          }
          button,
          a {
            all: unset;
            color: white;
          }
        `}
      />
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
      <ToastContainer theme="light" />
    </Web3ReactProvider>
  );
}
