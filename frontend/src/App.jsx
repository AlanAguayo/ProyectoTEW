import Product from "./pages/client/Product";
import Home from "./pages/client/Home";
import ProductList from "./pages/client/ProductList";
import Register from "./pages/client/Register";
import Login from "./pages/Login";
import Cart from "./pages/client/Cart";
import Success from "./pages/client/Success";
import AdminHome from "./pages/admin/Home"
import AdminNewProduct from "./pages/admin/NewProduct"
import AdminNewUser from "./pages/admin/NewUser"
import AdminNewCategory from "./pages/admin/NewCategory"
import AdminProduct from "./pages/admin/Product"
import AdminProductList from "./pages/admin/ProductList"
import Profile from "./pages/client/Profile"
import AdminUserList from "./pages/admin/UserList"
import OrderList from "./pages/client/OrderList"
import AdminOrderList from "./pages/admin/OrderList"
import AdminOrderDetail from "./pages/admin/OrderDetail"
import AdminCategories from "./pages/admin/Categories"
import AdminCoupons from "./pages/admin/Coupons"
import AdminNewCoupons from "./pages/admin/NewCoupon"
import LogOut from "./pages/LogOut";

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
        <Route path="/logout" element={<LogOut />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/orders" element={<OrderList />}/>
        <Route path="/admin" element={<AdminHome />}/>
        <Route path="/admin/products/new" element={<AdminNewProduct />}/>
        <Route path="/admin/users/:id" element={<AdminNewUser />}/>
        <Route path="/admin/product/:id" element={<AdminProduct />}/>
        <Route path="/admin/products" element={<AdminProductList />}/>
        <Route path="/admin/users" element={<AdminUserList />}/>
        <Route path="/admin/orders" element={<AdminOrderList />}/>
        <Route path="/admin/orders/:id" element={<AdminOrderDetail />}/>
        <Route path="/admin/categories" element={<AdminCategories />}/>
        <Route path="/admin/categories/:id" element={<AdminNewCategory />}/>
        <Route path="/admin/coupons" element={<AdminCoupons />}/>
        <Route path="/admin/coupons/:id" element={<AdminNewCoupons />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
