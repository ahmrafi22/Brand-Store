import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Collections from "./Pages/Collection";
import ProductDetails from "./Components/Products/ProductDetails";
import CheckOut from "./Components/Cart/CheckOut";
import Orderconfirm from "./Pages/OrderConfirm";
import OrderDeatails from "./Pages/OrderDetails";
import MyOrder from "./Pages/Myorders";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHome from "./Pages/AdminHome";
import UserMange from "./Components/Admin/UserMan";
import ProductManage from "./Components/Admin/ProductMan";
import EditProduct from "./Components/Admin/EditProduct";
import OrderMange from "./Components/Admin/Oderman";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./Components/Common/ProtectedRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<Collections />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order-done" element={<Orderconfirm />} />
            <Route path="my-orders" element={<MyOrder />} />
            <Route path="order/:id" element={<OrderDeatails />} />
          </Route>
          <Route>
            {/* {Admin} */}
            <Route
              path="/admin"
              element={
                <ProtectedRoutes role="Admin">
                  <AdminLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="users" element={<UserMange />} />
              <Route path="products" element={<ProductManage />} />
              <Route path="product/:id/edit" element={<EditProduct />} />
              <Route path="orders" element={<OrderMange />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
