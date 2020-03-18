import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined, TwitterOutlined } from "@ant-design/icons";

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
  const trackShare = () => {
    logEvent("share", "twitter");
  };

  return (
    <>
      <Head>
        <title>Menu Rescu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container">
        <div className="header">
          <div className="logo">Menu Rescu</div>
        </div>
        <div className="shareContainer">
          <div className="shareLabel">Help spread the word:</div>
          <a
            onClick={trackShare}
            href={`https://twitter.com/intent/tweet?url=https://menurescu.com&text=${encodeURI(
              "Gift cards can help restaurants survive coronavirus. Please join me in supporting your favorite NYC spots at -->"
            )}`}
            target="_blank"
            rel="noopener"
          >
            <TwitterOutlined />
          </a>
        </div>
        <div className="searchContainer">
          <Input
            value={searchValue}
            onChange={handleChange}
            placeholder="Search for a spot..."
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
              We can't find any restaurants that match that search. If we're
              missing a restaurant, please let us know here: XXX
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: auto;
          max-width: 1024px;
        }
        .header {
          align-items: center;
          display: flex;
          padding: 24px 12px;
        }
        .logo {
          font-size: 24px;
        }
        .shareContainer {
          align-items: center;
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }
        .shareLabel {
          margin-right: 12px;
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
          padding: 0 12px;
        }
      `}</style>
    </>
  );
};

export default Home;
