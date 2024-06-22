const API_DOMAIN = "https://newsdata.io/api/1/latest?apikey=";
const API_SEARCH_DOMAIN = "https://newsdata.io/api/1/latest?apikey=";
const API_KEY = "pub_470981cae92870db36cb58acb1adb8fbd2eff";
export const endpointPath = (country, category) =>
  `${API_DOMAIN}${API_KEY}&country=${country}&language=en&category=${category}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${API_KEY}&language=en&country=in&q=${searchQuery}`;