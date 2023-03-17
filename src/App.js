import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import ContactPage from "./pages/ContactPage/ContactPage";
import Home from "./pages/Home/Home";
import Success from "./pages/Success/Success";
import ShopPage from "./pages/ShopPage/ShopPage";
import OnePage from "./pages/OnePage/OnePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import Checkout from "./pages/CheckoutPage/СheckoutPage";
import { useSelector } from "react-redux";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <div className="App">
      <Header />
      <div className="App_wrapper">
        {token ? (
          <Routes>
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/:categoryId" element={<ShopPage />} />
            <Route path="/el/:id" element={<OnePage />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/:categoryId" element={<ShopPage />} />
            <Route path="/el/:id" element={<OnePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        )}
        <ToastContainer position="top-right" transition={Zoom} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
