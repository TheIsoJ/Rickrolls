import dotenv from "dotenv"
dotenv.config()

import cors from "cors"

import express from "express"
const app = express();

import { API_VERSION } from "./utils/apiVersion.js";

const port: string = process.env.PORT as string

import { printAbout } from "./utils/aboutThisAPI.js"

// Verkkosivu
import frontendCreateCheckoutSessionRoute from "./routes/frontend/regular-user/create-checkout-session.js"
import frontendCreateCustomerPortalSessionRoute from "./routes/frontend/regular-user/create-customer-portal-session.js"
import frontendCustomerRoute from "./routes/frontend/regular-user/customer.js"
import frontendGetStripeConfigRoute from "./routes/frontend/regular-user/getStripeConfig.js"
import frontendProductsRoute from "./routes/frontend/regular-user/products.js"
import frontendPromoItemsRoute from "./routes/frontend/regular-user/promoItems.js"
import frontendRickrollsRoute from "./routes/frontend/regular-user/rickrolls.js"
import frontendUsersRoute from "./routes/frontend/regular-user/users.js"

// Admin
import frontendAdminCategoriesRoute from "./routes/frontend/admin/categories.js"
import frontendAdminProductsRoute from "./routes/frontend/admin/products.js"
import frontendAdminPromoItemsRoute from "./routes/frontend/admin/promoItems.js"
import frontendAdminRickrollsRoute from "./routes/frontend/admin/rickrolls.js"

// Mobiilisovellusta varten
import mobileAppGetStripeConfigRoute from "./routes/mobile-app/getStripeConfig.js"
import mobileAppPaymentSheetRoute from "./routes/mobile-app/paymentSheet.js"
import mobileAppProductsRoute from "./routes/mobile-app/products.js"
import mobileAppPromoItemsRoute from "./routes/mobile-app/promoItems.js"
import mobileAppRickrollsRoute from "./routes/mobile-app/rickrolls.js"

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

// Verkkosivua varten
app.use(`/${API_VERSION}`, frontendCreateCheckoutSessionRoute)
app.use(`/${API_VERSION}`, frontendCreateCustomerPortalSessionRoute)
app.use(`/${API_VERSION}`, frontendCustomerRoute)
app.use(`/${API_VERSION}/config`, frontendGetStripeConfigRoute)
app.use(`/${API_VERSION}`, frontendProductsRoute)
app.use(`/${API_VERSION}`, frontendPromoItemsRoute)
app.use(`/${API_VERSION}`, frontendRickrollsRoute)
app.use(`/${API_VERSION}`, frontendUsersRoute)

// Admin-reitit
app.use(`/${API_VERSION}/admin`, frontendAdminCategoriesRoute)
app.use(`/${API_VERSION}/admin`, frontendAdminRickrollsRoute)
app.use(`/${API_VERSION}/admin`, frontendAdminProductsRoute)
app.use(`/${API_VERSION}/admin`, frontendAdminPromoItemsRoute)

// Mobiilisovellusta varten
app.use(`/${API_VERSION}/mobile-app/config`, mobileAppGetStripeConfigRoute)
app.use(`/${API_VERSION}/mobile-app/payments`, mobileAppPaymentSheetRoute)
app.use(`/${API_VERSION}/mobile-app`, mobileAppProductsRoute)
app.use(`/${API_VERSION}/mobile-app`, mobileAppPromoItemsRoute)
app.use(`/${API_VERSION}/mobile-app`, mobileAppRickrollsRoute)

app.get("/", (_, res) => {
  res.json({
    message: printAbout({ port: port, isConsoleLogging: false })
  });
})

app.listen(port, () => {
  printAbout({ port: port, isConsoleLogging: true })
})

export default app