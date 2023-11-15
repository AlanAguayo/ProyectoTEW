import Product from "./pages/client/Product";
import Home from "./pages/client/Home";
import ProductList from "./pages/client/ProductList";
import Register from "./pages/client/Register";
import Login from "./pages/Login";
import Cart from "./pages/client/Cart";
import Success from "./pages/client/Success";
import AdminHome from "./pages/admin/home/Home"
import AdminNewProduct from "./pages/admin/newProduct/NewProduct"
import AdminNewUser from "./pages/admin/newUser/NewUser"
import AdminProduct from "./pages/admin/product/Product"
import AdminProductList from "./pages/admin/productList/ProductList"
import Profile from "./pages/client/Profile"
import AdminUserList from "./pages/admin/userList/UserList"

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<AdminHome />}/>
        <Route path="/admin/newProduct" element={<AdminNewProduct />}/>
        <Route path="/admin/newUser" element={<AdminNewUser />}/>
        <Route path="/admin/product/:id" element={<AdminProduct />}/>
        <Route path="/admin/productList" element={<AdminProductList />}/>
        <Route path="/admin/userList" element={<AdminUserList />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
