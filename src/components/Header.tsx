import Link from "next/link";
import { FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";

import { logEvent } from "../utils/analytics";
import Container from "./Container";

const Header = () => {
  const trackShare = (platform: string) => {
    logEvent("share", platform);
  };

  return (
    <>
      <div className="header">
        <Container>
          <div className="content">
            <div className="group">
              <Link href="/">
                <a className="logo">MenuRescu</a>
              </Link>
            </div>
            <div className="group">
              <div className="shareButton">
                <TwitterShareButton
                  className="shareButton"
                  title="Gift cards can help restaurants survive coronavirus. Please join me in supporting your favorite NYC spots at -->"
                  url="https://menurescu.com"
                >
                  <TwitterOutlined
                    style={{ color: "#00acee", fontSize: 20 }}
                    onClick={() => {
                      trackShare("twitter");
                    }}
                  />
                </TwitterShareButton>
              </div>
              <div className="shareButton">
                <FacebookShareButton url="https://menurescu.com">
                  <FacebookFilled
                    style={{ color: "#3b5998", fontSize: 20 }}
                    onClick={() => {
                      trackShare("facebook");
                    }}
                  />
                </FacebookShareButton>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <style jsx>{`
        .header {
          border-bottom: 1px solid #ccc;
          margin-bottom: 12px;
        }
        .content {
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 24px 0 12px 0;
        }
        .group {
          align-items: center;
          display: flex;
        }
        .logo {
          color: #000;
          cursor: pointer;
          font-family: "Martel";
          font-size: 24px;
          font-weight: 600;
          margin-right: 36px;
        }
        @media screen and (max-width: 480px) {
          .logo {
            margin-right: 24px;
          }
        }
        .shareButton {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};

export default Header;
