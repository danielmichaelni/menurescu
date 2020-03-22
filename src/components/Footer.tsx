const Footer = () => {
  return (
    <>
      <div className="footer">
        <a
          className="link"
          href="https://forms.gle/LF1qfdCH6JDmQL9c6"
          target="_blank"
          rel="noopener"
        >
          Add a restaurant
        </a>
        <div>hello@menurescu.com</div>
      </div>
      <style jsx>{`
        .footer {
          align-items: center;
          display: flex;
          flex-direction: column;
          padding-bottom: 24px;
        }
        .link:hover {
          color: #5cc5c9;
        }
      `}</style>
    </>
  );
};

export default Footer;
