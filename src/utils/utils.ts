const PUNCTUATION_REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

const removePunctuation = (string: string) => {
  return string.replace(PUNCTUATION_REGEX, "");
};

export const formatRestaurantNameForUrl = (restaurantName: string) => {
  return removePunctuation(restaurantName)
    .toLowerCase()
    .replace(/\s+/g, "-");
};
