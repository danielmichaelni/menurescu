import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <div className="content">{children}</div>
      </Container>
      <Footer />
      <style jsx>{`
        .content {
          min-height: 78vh;
        }
      `}</style>
    </>
  );
};

export default Layout;
