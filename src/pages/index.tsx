import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import data from "../../public/data.json";
import { Restaurant } from "../types";
import { initGA, logPageView } from "../utils/analytics";

const IndexPage = () => {
  const restaurantsWithGiftCards: Restaurant[] = data.restaurants.filter(
    restaurant => restaurant.giftcardUrl
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    restaurantsWithGiftCards
  );
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  useEffect(() => {
    if (searchValue === "") {
      setFilteredRestaurants(restaurantsWithGiftCards);
      return;
    }
    setFilteredRestaurants(
      restaurantsWithGiftCards.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Layout>
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
      </Layout>
      <style jsx>{`
        :global(body) {
          font-family: "Martel Sans", sans-serif;
        }
        .blurb {
          font-size: 18px;
          margin-bottom: 24px;
        }
        .quote {
          color: #686868;
          font-style: italic;
          margin-bottom: 24px;
          padding: 0 36px;
        }
        .searchContainer {
          margin-bottom: 24px;
        }
        .restaurantCardsContainer {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -12px;
        }
        .emptyResult {
          margin-bottom: 24px;
          padding: 0 12px;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
