import "./App.scss";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import Container from "react-bootstrap/Container";

import Navigation from "./components/Navigation/Navigation";
import PageNotFound from "./components/Misc/PageNotFound";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import ImagePage from "./components/Image/ImagePage";
import TopPage from "./components/Top/TopPage";
import SearchPage from "./components/Search/SearchPage";
import FavouritePage from "./components/Top/FavouritePage";

import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Container className="full-screen container-normal">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/image/:id" element={<ImagePage />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/favourites" element={<FavouritePage />} />
          <Route path="*" element={<PageNotFound location={useLocation()} />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
