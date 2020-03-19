import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { Input } from "antd";
import {
  FacebookOutlined,
  SearchOutlined,
  TwitterOutlined
} from "@ant-design/icons";

import RestaurantCard from "../components/RestaurantCard";
import data from "../../public/data.json";
import { Restaurant } from "../types";
import { initGA, logPageView, logEvent } from "../utils/analytics";

const Home = () => {
  const restaurants: Restaurant[] = data.restaurants;
  const [searchValue, setSearchValue] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  useEffect(() => {
    if (searchValue === "") {
      setFilteredRestaurants(restaurants);
      return;
    }
    setFilteredRestaurants(
      restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const trackShare = (platform: string) => {
    logEvent("share", platform);
  };

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
      <div className="container">
        <div className="header">
          <div className="logo">MenuRescu</div>
          <div className="shareContainer">
            <div className="shareLabel">Help spread the word:</div>
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
                <FacebookOutlined
                  style={{ color: "#3b5998", fontSize: 20 }}
                  onClick={() => {
                    trackShare("facebook");
                  }}
                />
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className="blurb">
          Purchase a gift card to help your favorite NYC restaurants survive
          COVID-19!
        </div>
        <div className="quote">
          "For those looking for a small way to support local businesses while
          also choosing to social distance, buying restaurant gift cards is a
          decent solution. The choice to invest in a future meal gives
          restaurant owners something to work with in the interim." -Eater
        </div>
        <div className="fundraiserInfo">
          <div className="fundraiserDescription">
            Some restaurants have started fundraisers as well to support their
            staff. Here's a few we've come across so far (to be updated):
          </div>
          <div className="fundraiserLinks">
            <a
              href="https://www.gofundme.com/f/aska-employee-relief-fund"
              target="_blank"
              rel="noopener"
            >
              Aska
            </a>
            <div className="divider">|</div>
            <a
              href="https://www.gofundme.com/f/295grandstreet"
              target="_blank"
              rel="noopener"
            >
              Four Horsemen
            </a>
            <div className="divider">|</div>
            <a
              href="https://www.gofundme.com/f/epicurean-family-support-fund"
              target="_blank"
              rel="noopener"
            >
              L'Artusi (Epicurean)
            </a>
          </div>
        </div>
        <div className="searchContainer">
          <Input
            value={searchValue}
            onChange={handleChange}
            placeholder="Search for a gift card..."
            prefix={<SearchOutlined />}
            size="large"
          />
        </div>
        <div className="restaurantCardsContainer">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="emptyResult">
              We can't find any restaurants that match that search.
            </div>
          )}
        </div>
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
      </div>
      <style jsx>{`
        :global(body) {
          font-family: "Martel Sans", sans-serif;
        }
        .container {
          margin: auto;
          max-width: 1024px;
        }
        .header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 24px 12px;
        }
        .logo {
          font-family: "Martel";
          font-size: 24px;
          font-weight: 600;
        }
        .shareButton {
          margin-left: 12px;
        }
        .blurb {
          font-size: 18px;
          padding: 0 12px;
          margin-bottom: 24px;
        }
        .quote {
          color: #686868;
          font-style: italic;
          margin-bottom: 24px;
          padding: 0 36px;
        }
        .fundraiserInfo {
          margin-bottom: 24px;
          padding: 0 12px;
        }
        .fundraiserDescription {
          margin-bottom: 12px;
        }
        .fundraiserLinks {
          display: flex;
          justify-content: center;
        }
        .divider {
          margin: 0 8px;
        }
        .shareContainer {
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .shareLabel {
          position: relative;
          top: -2px;
        }
        @media screen and (max-width: 480px) {
          .shareLabel {
            display: none;
          }
        }
        .searchContainer {
          margin-bottom: 24px;
          padding: 0 12px;
        }
        .restaurantCardsContainer {
          display: flex;
          flex-wrap: wrap;
        }
        .emptyResult {
          margin-bottom: 24px;
          padding: 0 12px;
        }
        .footer {
          align-items: center;
          display: flex;
          flex-direction: column;
          margin-bottom: 36px;
        }
      `}</style>
    </>
  );
};

export default Home;
