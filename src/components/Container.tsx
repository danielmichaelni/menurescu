const Container = ({ children }) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          margin: auto;
          max-width: 992px;
          padding: 0 12px;
        }
      `}</style>
    </>
  );
};

export default Container;
