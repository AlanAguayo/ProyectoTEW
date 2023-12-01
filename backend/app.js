const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const categoryRoute = require("./routes/CategoryRoutes");
const userRoute = require("./routes/UserRoutes");
const authRoute = require("./routes/AuthRoutes");
const productRoute = require("./routes/ProductRoutes");
const cartRoute = require("./routes/CartRoutes");
const orderRoute = require("./routes/OrderRoutes");
const stripeRoute = require("./routes/StripeRoutes");
const couponRoute = require("./routes/CouponRoutes");
const sliderRoute = require("./routes/SliderRoutes");
//const authJwt = require('./libs/jwt');

//app.use(authJwt()) 
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/slider", sliderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});