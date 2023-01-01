const API_URL: string = `http://192.168.1.127:5000/api/v1/`;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

const HOME_BASE_URL: string = `${API_URL}rickrolls?api_key=${API_KEY}`;
const RICKROLL_BASE_URL: string = `${API_URL}rickrolls/`;
const PRODUCTS_BASE_URL: string = `${API_URL}products?api_key=${API_KEY}`
const PRODUCT_BASE_URL: string = `${API_URL}products/`
const CREATE_CHECKOUT_SESSION_BASE_URL: string = `${API_URL}luo-uusi-sessio?api_key=${API_KEY}`
const CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL: string = `${API_URL}luo-uusi-itsepalvelu-sessio?session_id=`
const CUSTOMERS_BASE_URL: string = `${API_URL}customers?api_key=${API_KEY}`
const CUSTOMER_BASE_URL: string = `${API_URL}customers/`

export {
  HOME_BASE_URL,
  RICKROLL_BASE_URL,
  PRODUCTS_BASE_URL,
  PRODUCT_BASE_URL,
  CREATE_CHECKOUT_SESSION_BASE_URL,
  CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL,
  CUSTOMERS_BASE_URL,
  CUSTOMER_BASE_URL,
  API_URL,
  API_KEY,
};