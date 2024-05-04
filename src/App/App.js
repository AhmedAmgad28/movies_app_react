import './App.css';
import { Suspense, lazy  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SimpleBackdrop from "../Components/Spinner";

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavBarRoutes = ["/login", "/register"]; // Add paths where NavBar should not be shown

  return (
    <div className="App">
      { !noNavBarRoutes.includes(location.pathname) && <NavBar /> }
      {children}
    </div>
  );
};

const Home=lazy(()=>import("../Pages/HomePage"))
const About=lazy(()=>import("../Pages/About"))
const Details=lazy(()=>import("../Pages/MovieDetailsPage"))
const ContactUs=lazy(()=>import("../Pages/ContactUs"))
const NotFound=lazy(()=>import("../Pages/NotFound"))
const AddMovie=lazy(()=>import("../Pages/AddMoviePage"))
const Favourites=lazy(()=>import("../Pages/Favourites"))
const UpdateMovie=lazy(()=>import("../Pages/UpdateMoviePage"))
const Profile=lazy(()=>import("../Pages/ProfilePage"))
const Login=lazy(()=>import("../Pages/LogInPage"))
const Register=lazy(()=>import("../Pages/RegisterPage"))

function App() {
  return (
    <Suspense fallback={<SimpleBackdrop />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Movies" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fav" element={<Favourites />} />
            <Route path="Add" element={<AddMovie />} />
            <Route path="update/:MovieId" element={<UpdateMovie />} />
            <Route path="Movies/:MovieId" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
