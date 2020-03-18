import ReactGA from "react-ga";

export const initGA = () => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("UA-160990449-1");
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category: string, action: string) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.event({ category, action });
  }
};
