import { useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Auth/Admin";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./Profile/AdminProfile";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />

          <Route
            path="/auth"
            element={
              isUserLoggedIn || isAdminLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Auth />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isUserLoggedIn || isAdminLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Admin />
              )
            }
          />

          <Route
            path="/booking/:id"
            element={
              isUserLoggedIn ? <Booking /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/user"
            element={
              isUserLoggedIn ? <UserProfile /> : <Navigate to="/auth" />
            }
          />

          <Route
            path="/add"
            element={
              isAdminLoggedIn ? <AddMovie /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/user-admin"
            element={
              isAdminLoggedIn ? <AdminProfile /> : <Navigate to="/admin" />
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
