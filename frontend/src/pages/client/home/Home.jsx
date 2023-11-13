import React from "react";
import Announcement from "../../../components/client/announcement/Announcement";
import Categories from "../../../components/client/categories/Categories";
import Footer from "../../../components/client/footer/Footer";
import Navbar from "../../../components/client/navbar/Navbar";
import Newsletter from "../../../components/client/newsletter/Newsletter";
import Products from "../../../components/client/products/Products";
import Slider from "../../../components/client/slider/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
