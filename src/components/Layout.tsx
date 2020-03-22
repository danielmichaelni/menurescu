import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin: auto;
          max-width: 992px;
          padding: 0 12px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Layout;
