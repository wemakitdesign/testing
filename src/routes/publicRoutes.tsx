import { Route } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";

import CreateAccount from "@/pages/CreateAccount";
import Checkout from "@/pages/Checkout";
import CompanyInformation from "@/pages/CompanyInformation";
import Success from "@/pages/Success";
import BookACall from "@/pages/BookACall";

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />,
  <Route key="create-account" path="/create-account" element={<CreateAccount />} />,
  <Route key="checkout" path="/checkout" element={<Checkout />} />,
  <Route key="company-information" path="/company-information" element={<CompanyInformation />} />,
  <Route key="success" path="/success" element={<Success />} />,
  <Route key="book-a-call" path="/book-a-call" element={<BookACall />} />,
  <Route key="not-found" path="*" element={<NotFound />} />
];
