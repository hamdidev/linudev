import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/projects" element={<Projects />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;
