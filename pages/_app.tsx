import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}

export default MyApp;
