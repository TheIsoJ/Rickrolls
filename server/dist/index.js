import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
import createCheckoutSessionRoute from "./routes/create-checkout-session.js";
import createCustomerPortalSessionRoute from "./routes/create-customer-portal-session.js";
import productRoute from "./routes/product.js";
import productsRoute from "./routes/products.js";
import rickrollsRoute from "./routes/rickrolls.js";
import usersRoute from "./routes/users.js";
import customerRoute from "./routes/customer.js";
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/v1", createCheckoutSessionRoute);
app.use("/api/v1", createCustomerPortalSessionRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", productsRoute);
app.use("/api/v1", rickrollsRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", usersRoute);
app.get("/", (req, res) => {
    res.json({ message: "Terve!" });
});
export default app;
//# sourceMappingURL=index.js.map