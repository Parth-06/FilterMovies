import "./App.css";
import Home from "./components/Home/Home";
import { HashRouter, Routes, Route } from "react-router-dom";
import TvShow from "./components/Home/TvShow";
import Movies from "./components/Home/Movies";
import New from "./components/Home/New";
import MyList from "./components/Home/MyList";
import Profile from "./components/Profile/Profile";
import Register from "./components/LoginRegi/Register";
import Login from "./components/LoginRegi/Login";
import AfterRegi from "./components/LoginRegi/AfterRegi";
import { ToastContainer } from "react-toastify";
import Manage_profile from "./components/Profile/Manage_profile";
import Editprofile from "./components/Profile/Editprofile";
import Logout from "./components/LoginRegi/Logout";
import Player from "./components/Player/Player";
import Mobilenav from "./components/Navbar/Mobilenav";
import MovieapiProvider from "./Context/Context";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <MovieapiProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshow" element={<TvShow />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/new" element={<New />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manageprofile" element={<Manage_profile />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/regiform" element={<AfterRegi />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/player" element={<Player />} />
            <Route path="/categories" element={<Mobilenav />} />
          </Routes>
        </MovieapiProvider>
      </HashRouter>

      <ToastContainer
        position="top-center"
        autoClose={20}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="colored"
      />
    </div>
  );
}

export default App;
