import Link from "next/link";
import { Card } from "antd";
import { FC, MouseEvent } from "react";

import { Restaurant } from "../types";
import { logEvent } from "../utils/analytics";
import { formatRestaurantNameForUrl } from "../utils/utils";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: FC<Props> = ({ restaurant }) => {
  const trackClick = (e: MouseEvent) => {
    logEvent("click", restaurant.name);
    e.stopPropagation();
  };

  return (
    <>
      <div className="container">
        <Link
          href="/restaurant/[name]"
          as={`/restaurant/${formatRestaurantNameForUrl(restaurant.name)}`}
        >
          <Card
            cover={
              <img
                src={restaurant.image}
                height="160px"
                style={{ objectFit: "cover" }}
              />
            }
            style={{ cursor: "pointer" }}
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
            <div className="links">
              {restaurant.giftcardUrl && (
                <a
                  className="link"
                  onClick={trackClick}
                  href={restaurant.giftcardUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <div>Gift card</div>
                </a>
              )}
              {restaurant.giftcardUrl && restaurant.reliefFundUrl && (
                <div className="divider">•</div>
              )}
              {restaurant.reliefFundUrl && (
                <a
                  className="link"
                  onClick={trackClick}
                  href={restaurant.reliefFundUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <div>Relief fund</div>
                </a>
              )}
            </div>
          </Card>
        </Link>
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
        .links {
          display: flex;
        }
        .divider {
          margin: 0 8px;
        }
        .link:hover {
          color: #5cc5c9;
        }
      `}</style>
    </>
  );
};

export default RestaurantCard;
