import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("UA-160990449-1");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category: string, action: string) => {
  ReactGA.event({ category, action });
};
