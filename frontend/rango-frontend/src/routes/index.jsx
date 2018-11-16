import Home from "views/Home/Home.jsx";
import LoginPage from "views/Login/loginPage.jsx";
import RegisterPage from "views/Register/RegisterPage.jsx";
import Admin from "views/Admin/Admin.jsx";
import ForgotPassword from "views/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "views/ForgotPassword/ResetPassword.jsx";
import Api from "views/Api/Api.jsx";
import Ai from "views/Ai/Ai.jsx";


var indexRoutes = [
  { path: "/api", name: "Api", component: Api },
  { path: "/ai", name: "Ai", component: Ai },
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPassword },
  { path: "/reset-password", name: "ResetPassword", component: ResetPassword },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/register-page", name: "RegisterPage", component: RegisterPage },
  { path: "/", name: "Home", component: Home }
];

export default indexRoutes;
