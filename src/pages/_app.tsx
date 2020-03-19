import Head from "next/head";
import { AppProps } from "next/app";
import "antd/dist/antd.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>MenuRescu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=family=Martel&Martel+Sans&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <style jsx>{`
        :global(body) {
          font-family: "Martel Sans", sans-serif;
        }
      `}</style>
    </>
  );
};

export default MyApp;
