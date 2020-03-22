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
        <meta
          property="og:title"
          content="MenuRescu: A relief fund and gift card directory for NYC restaurants"
        />
        <meta
          property="og:description"
          content="Donate to a relief fund and/or purchase a gift card to help your favorite NYC restaurants survive COVID-19!"
        />
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
