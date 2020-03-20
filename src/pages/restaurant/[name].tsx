import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import data from "../../../public/data.json";
import { formatRestaurantNameForUrl } from "../../utils/utils";

const RestaurantPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const restaurant = data.restaurants.find(
    restaurant => formatRestaurantNameForUrl(restaurant.name) === name
  );

  if (restaurant === undefined) {
    return (
      <>
        <Layout>
          <div className="empty">Hmm... We don't have anything here.</div>
        </Layout>
        <style jsx>{`
          .empty {
            align-items: center;
            display: flex;
            flex-grow: 1;
            justify-content: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Layout>
        <div className="title">{restaurant.name}</div>
        <div className="neighborhood">{restaurant.neighborhood}</div>
        {restaurant.giftcardUrl && (
          <div className="row">
            Gift cards sold{" "}
            <a href={restaurant.giftcardUrl} target="_blank" rel="noopener">
              here
            </a>
          </div>
        )}
        {restaurant.reliefFundUrl && (
          <div className="row">
            Donate to the relief fund{" "}
            <a href={restaurant.reliefFundUrl} target="_blank" rel="noopener">
              here
            </a>
          </div>
        )}
        {restaurant.notes && <div>{restaurant.notes}</div>}
      </Layout>
      <style jsx>{`
        .title {
          font-size: 88px;
          line-height: 96px;
          margin-top: 24px;
        }
        .neighborhood {
          font-size: 36px;
          margin-bottom: 24px;
        }
        .row {
          font-size: 18px;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
};

export default RestaurantPage;
