import { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import data from "../../public/data.json";
import { Restaurant } from "../types";
import { initGA, logPageView } from "../utils/analytics";
import Footer from "../components/Footer";

const IndexPage = () => {
  const restaurants: Restaurant[] = data.restaurants;
  const neighborhoods = [
    ...new Set(restaurants.map(restaurant => restaurant.neighborhood))
  ].sort();

  const [searchValue, setSearchValue] = useState("");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  useEffect(() => {
    setFilteredRestaurants(
      restaurants
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
          Donate to a relief fund and/or purchase a gift card to help your
          favorite NYC restaurants survive COVID-19!
        </div>
        <Footer />
        <div className="searchContainer">
          <Input
            allowClear
            value={searchValue}
            onChange={handleChange}
            placeholder="Search for a spot..."
            prefix={<SearchOutlined />}
            size="large"
          />
        </div>
        <div className="neighborhoodContainer">
          <Select
            allowClear
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
