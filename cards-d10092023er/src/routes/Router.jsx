import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import MyCards from "../cards/pages/MyCards";
import FavCards from "../cards/pages/FavCards";
import ErrorPage from "../pages/ErrorPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
//here is hidden sandbox for admin
// import SandBox from "../sandbox/SandBox";
// import Counter from "../sandbox/Counter";
// import Counter1 from "../sandbox/Counter1";
// import ChangeSize from "../sandbox/ChangeSize";
// import ShapeTransformer from "../sandbox/ShapeTransformer";
// import Countries from "../sandbox/Countries";
// import Error from "../components/Error";
// import Window from "../sandbox/Window";
// import FormExample from "../sandbox/FormExample";
import SignupPage from "../users/pages/SignupPage";
import LoginPage from "../users/pages/LoginPage";
import UserProfile from '../users/pages/UserProfile';
import AddCardPage from "../cards/pages/AddCardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import MapPage from "../sandbox/map/MapPage";
import EditUserPage from '../users/pages/EditUserPage';
import CrmPanel from "../users/pages/CrmPanel";
import ContactUs from "../pages/ContactUs";


export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<CardsPage />} />
      <Route path={ROUTES.CARDS} element={<CardsPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.MY_CARDS} element={<MyCards />} />
      <Route path={ROUTES.FAV_CARDS} element={<FavCards />} />
      <Route path={ROUTES.CARD_INFO + "/:id"} element={<CardDetailsPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfile/>}/>
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage/>}/>
      <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />     
      <Route path={ROUTES.MAP} element={<MapPage />} />
      <Route path={ROUTES.CREATE_CARD} element={<AddCardPage />} />
      <Route path={ROUTES.CRM_PANEL} element={<CrmPanel />} />
      <Route path={ROUTES.EDIT_CARD + "/:id"} element={<EditCardPage />} />
      {/*here is hidden sandbox for admin*/}
      {/* <Route path={ROUTES.SANDBOX} element={<SandBox />}>
        <Route path="counter" element={<Counter />} />
        <Route path="counter1" element={<Counter1 />} />
        <Route path="changesize" element={<ChangeSize />} />
        <Route path="shapetransformer" element={<ShapeTransformer />} />
        <Route path="crmpanel" element={<CrmPanel />} />           
        <Route path="countries" element={<Countries />} />
        <Route path="error" element={<Error />} />
        <Route path="window" element={<Window />} />
        <Route path="formexample" element={<FormExample />} />     
        </Route> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

