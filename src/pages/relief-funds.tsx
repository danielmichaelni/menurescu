import { useEffect } from "react";

import Layout from "../components/Layout";
import data from "../../public/data.json";
import { initGA, logPageView } from "../utils/analytics";

const ReliefFundsPage = () => {
  const restaurantsWithReliefFunds = data.restaurants.filter(
    restaurant => restaurant.reliefFundUrl
  );
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <>
      <Layout>
        <div className="blurb">
          Some restaurants have started relief funds as well to support their
          staff. Here are a few we've come across so far (to be updated):
        </div>
        <ul className="link">
          {restaurantsWithReliefFunds.map(restaurant => (
            <li className="link">
              <a href={restaurant.reliefFundUrl} target="_blank" rel="noopener">
                {restaurant.name}
              </a>
            </li>
          ))}
        </ul>
      </Layout>
      <style jsx>{`
        .blurb {
          font-size: 18px;
          margin-bottom: 24px;
        }
        .links {
          display: flex;
          flex-direction: column;
        }
        .link {
          margin-bottom: 6px;
        }
      `}</style>
    </>
  );
};

export default ReliefFundsPage;
