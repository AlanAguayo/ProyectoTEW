import React from "react";
import Announcement from "../../components/client/Announcement";
import Categories from "../../components/client/Categories";
import Footer from "../../components/client/Footer";
import Navbar from "../../components/client/Navbar";
import Products from "../../components/client/Products";
import Slider from "../../components/client/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
