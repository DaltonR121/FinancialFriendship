import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Splash from "./components/Splash/Splash"
import NavBar from "./components/NavBar/NavBar";
import Portfolio from "./components/Portfolio/Portfolio";
import Accounts from "./components/Accounts/Accounts"
import Assets from "./components/Assets/Assets"
import CreditCards from "./components/CreditCards/CreditCards"
import MonthlyReoccurrings from "./components/MonthlyReoccurring/MonthlyReoccurring";
import OtherObligations from "./components/OtherObligations/OtherObligations"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Footer from "./components/Footer/Footer";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/portfolio" exact={true} >
          <Portfolio />
        </ProtectedRoute>
        <ProtectedRoute path="/accounts" exact={true} >
          <Accounts />
        </ProtectedRoute>
        <ProtectedRoute path="/assets" exact={true} >
          <Assets />
        </ProtectedRoute>
        <ProtectedRoute path="/credit_cards" exact={true} >
          <CreditCards />
        </ProtectedRoute>
        <ProtectedRoute path="/reoccurring" exact={true} >
          <MonthlyReoccurrings />
        </ProtectedRoute>
        <ProtectedRoute path="/other" exact={true} >
          <OtherObligations />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
