import { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import data from "../../public/data.json";
import { Restaurant } from "../types";
import { initGA, logPageView } from "../utils/analytics";

const IndexPage = () => {
  const restaurantsWithGiftCards: Restaurant[] = data.restaurants;
  const neighborhoods = [
    ...new Set(
      restaurantsWithGiftCards.map(restaurant => restaurant.neighborhood)
    )
  ].sort();

  const [searchValue, setSearchValue] = useState("");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    restaurantsWithGiftCards
  );
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  useEffect(() => {
    setFilteredRestaurants(
      restaurantsWithGiftCards
        .filter(restaurant => {
          if (searchValue === "") return true;
          return restaurant.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        })
        .filter(restaurant => {
          if (neighborhoodFilter.length === 0) return true;
          return neighborhoodFilter.includes(restaurant.neighborhood);
        })
    );
  }, [searchValue, neighborhoodFilter]);

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
            placeholder="Search for a spot..."
            prefix={<SearchOutlined />}
            size="large"
          />
        </div>
        <div className="neighborhoodContainer">
          <Select
            mode="multiple"
            onChange={(value: string[]) => {
              setNeighborhoodFilter(value);
            }}
            placeholder="Filter by neighborhood"
            size="large"
            style={{ width: "100%" }}
          >
            {neighborhoods.map(neighborhood => (
              <Select.Option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </Select.Option>
            ))}
          </Select>
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
          margin-bottom: 12px;
        }
        .neighborhoodContainer {
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
