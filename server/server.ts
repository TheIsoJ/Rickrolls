import dotenv from "dotenv"
dotenv.config()

import cors from "cors"

import express from "express"
const app = express();

import { API_VERSION } from "./utils/apiVersion.js";

const port: string = process.env.PORT as string

import { printAbout } from "./utils/aboutThisAPI.js"

import frontendCreateCheckoutSessionRoute from "./routes/frontend/create-checkout-session.js"
import frontendCreateCustomerPortalSessionRoute from "./routes/frontend/create-customer-portal-session.js"
import frontendProductRoute from "./routes/frontend/product.js"
import frontendProductsRoute from "./routes/frontend/products.js"
import frontendGetStripeConfigRoute from "./routes/frontend/getStripeConfig.js"
import frontendRickrollsRoute from "./routes/frontend/rickrolls.js"
import frontendUsersRoute from "./routes/frontend/users.js"
import frontendCustomerRoute from "./routes/frontend/customer.js"

// Mobiilisovellusta varten
import mobileAppPaymentSheetRoute from "./routes/mobile-app/paymentSheet.js"
import mobileAppGetStripeConfigRoute from "./routes/mobile-app/getStripeConfig.js"
import mobileAppRickrollsRoute from "./routes/mobile-app/rickrolls.js"
import mobileAppProductsRoute from "./routes/mobile-app/products.js"
import mobileAppProductRoute from "./routes/mobile-app/product.js"

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

// Verkkosivua varten
app.use(`/api/${API_VERSION}`, frontendCreateCheckoutSessionRoute)
app.use(`/api/${API_VERSION}`, frontendCreateCustomerPortalSessionRoute)
app.use(`/api/${API_VERSION}`, frontendProductRoute)
app.use(`/api/${API_VERSION}`, frontendProductsRoute)
app.use(`/api/${API_VERSION}`, frontendGetStripeConfigRoute)
app.use(`/api/${API_VERSION}`, frontendRickrollsRoute)
app.use(`/api/${API_VERSION}`, frontendUsersRoute)
app.use(`/api/${API_VERSION}`, frontendCustomerRoute)

// Mobiilisovellusta varten
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppRickrollsRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppProductsRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppProductRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppPaymentSheetRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppGetStripeConfigRoute)

app.get("/", (req, res) => {
  res.json({
    message: printAbout(port)
  });
})

app.listen(port, () => {
  printAbout(port)
})

export default app