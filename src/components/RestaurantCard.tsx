import { Card } from "antd";
import { FC } from "react";

import { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: FC<Props> = ({ restaurant }) => {
  return (
    <>
      <div className="container">
        <a href={restaurant.giftcardUrl} target="_blank" rel="noopener">
          <Card
            cover={
              <img
                src={restaurant.image}
                height="160px"
                style={{ objectFit: "cover" }}
              />
            }
          >
            <div title={restaurant.name} className="restaurantName">
              {restaurant.name}
            </div>
            <div
              title={restaurant.neighborhood}
              className="restaurantNeighborhood"
            >
              {restaurant.neighborhood}
            </div>
          </Card>
        </a>
      </div>
      <style jsx>{`
        .container {
          margin-bottom: 36px;
          padding: 0 12px;
          width: 25%;
        }
        .container :global(.ant-card-body) {
          padding: 16px 24px;
        }
        @media only screen and (max-width: 992px) {
          .container {
            width: 33.333%;
          }
        }
        @media screen and (max-width: 992px) {
          .container {
            width: 50%;
          }
        }
        @media screen and (max-width: 480px) {
          .container {
            width: 100%;
          }
        }
        .restaurantName {
          font-size: 16px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default RestaurantCard;
