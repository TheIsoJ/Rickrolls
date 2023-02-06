import dotenv from "dotenv"
dotenv.config()

import cors from "cors"

import express from "express"
const app = express();

import { API_VERSION } from "./utils/apiVersion.js";

const port: string = process.env.PORT as string

import { printAbout } from "./utils/aboutThisAPI.js"

import frontendCreateCheckoutSessionRoute from "./routes/frontend/regular-user/create-checkout-session.js"
import frontendCreateCustomerPortalSessionRoute from "./routes/frontend/regular-user/create-customer-portal-session.js"
import frontendProductRoute from "./routes/frontend/regular-user/product.js"
import frontendProductsRoute from "./routes/frontend/regular-user/products.js"
import frontendAdminProductRoute from "./routes/frontend/admin/product.js"
import frontendAdminProductsRoute from "./routes/frontend/admin/products.js"
import frontendGetStripeConfigRoute from "./routes/frontend/regular-user/getStripeConfig.js"
import frontendRickrollsRoute from "./routes/frontend/regular-user/rickrolls.js"
import frontendAdminRickrollsRoute from "./routes/frontend/admin/rickrolls.js"
import frontendUsersRoute from "./routes/frontend/regular-user/users.js"
import frontendCustomerRoute from "./routes/frontend/regular-user/customer.js"

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
app.use(`/api/${API_VERSION}/admin`, frontendAdminProductRoute)
app.use(`/api/${API_VERSION}/admin`, frontendAdminProductsRoute)
app.use(`/api/${API_VERSION}/config`, frontendGetStripeConfigRoute)
app.use(`/api/${API_VERSION}`, frontendRickrollsRoute)
app.use(`/api/${API_VERSION}/admin`, frontendAdminRickrollsRoute)
app.use(`/api/${API_VERSION}`, frontendUsersRoute)
app.use(`/api/${API_VERSION}`, frontendCustomerRoute)

// Mobiilisovellusta varten
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppRickrollsRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppProductsRoute)
app.use(`/api/${API_VERSION}/mobile-app`, mobileAppProductRoute)
app.use(`/api/${API_VERSION}/mobile-app/payments`, mobileAppPaymentSheetRoute)
app.use(`/api/${API_VERSION}/mobile-app/config`, mobileAppGetStripeConfigRoute)

app.get("/", (_, res) => {
  res.json({
    message: printAbout({ port: port, isConsoleLogging: false })
  });
})

app.listen(port, () => {
  printAbout({ port: port, isConsoleLogging: true })
})

export default app