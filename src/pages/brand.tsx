const Brand = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <div className="logo">MenuRescu</div>
          <div className="info">
            Your favorite NYC restaurants need your help to survive COVID-19!
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          align-items: center;
          background-color: #1b1919;
          display: flex;
          justify-content: center;
          height: 100vh;
          width: 100vw;
        }
        .content {
          max-width: 480px;
          padding: 12px;
        }
        .logo {
          color: #eddf0f;
          font-family: "Martel";
          font-size: 88px;
          font-weight: 600;
        }
        .info {
          color: #e0e0e0;
          font-size: 36px;
        }
        @media screen and (max-width: 480px) {
          .logo {
            font-size: 66px;
          }
          .info {
            font-size: 27px;
          }
        }
      `}</style>
    </>
  );
};

export default Brand;
