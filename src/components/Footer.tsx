const Footer = () => {
  return (
    <>
      <div className="footer">
        <a
          href="https://forms.gle/LF1qfdCH6JDmQL9c6"
          target="_blank"
          rel="noopener"
        >
          Add a restaurant
        </a>
        <div>Contact: hello@menurescu.com</div>
      </div>
      <style jsx>{`
        .footer {
          align-items: center;
          display: flex;
          flex-direction: column;
          padding-bottom: 36px;
        }
      `}</style>
    </>
  );
};

export default Footer;
