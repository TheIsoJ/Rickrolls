const API_URL: string = `https://theisoj-glorious-system-95jwwrqr59rf9rqr-80.preview.app.github.dev/api/v1/`;
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY as string;

const HOME_BASE_URL: string = `${API_URL}rickrolls?api_key=${API_KEY}`;
const NEW_RICKROLL_BASE_URL: string = `${API_URL}rickrolls`;
const RICKROLL_BASE_URL: string = `${API_URL}rickrolls/`;
const PRODUCTS_BASE_URL: string = `${API_URL}products?api_key=${API_KEY}`
const PRODUCT_BASE_URL: string = `${API_URL}products/`
const GET_STRIPE_CONFIG_BASE_URL: string = `${API_URL}config/get-stripe-config?api_key=${API_KEY}`
const CREATE_CHECKOUT_SESSION_BASE_URL: string = `${API_URL}luo-uusi-sessio?api_key=${API_KEY}`
const CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL: string = `${API_URL}luo-uusi-itsepalvelu-sessio?session_id=`
const CUSTOMERS_BASE_URL: string = `${API_URL}customers?api_key=${API_KEY}`
const CUSTOMER_BASE_URL: string = `${API_URL}customers/`

export {
  HOME_BASE_URL,
  NEW_RICKROLL_BASE_URL,
  RICKROLL_BASE_URL,
  PRODUCTS_BASE_URL,
  PRODUCT_BASE_URL,
  GET_STRIPE_CONFIG_BASE_URL,
  CREATE_CHECKOUT_SESSION_BASE_URL,
  CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL,
  CUSTOMERS_BASE_URL,
  CUSTOMER_BASE_URL,
  API_URL,
  API_KEY,
};