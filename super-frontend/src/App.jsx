import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateOffer from "./pages/CreateOffer";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notifications from "./pages/Notifications";
import Error404 from "./pages/Error404";
import YourOffers from "./pages/YourOffers";

function App() {
  return (
    <Router>
      <Navbar className="select-custom" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateOffer} />
        <Route exact path="/youroffers" component={YourOffers} />
        <Route exact path="/offers/:id" component={Offer} />
        <Route exact path="/notifications" component={Notifications} />
        <Route path="*" element={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
