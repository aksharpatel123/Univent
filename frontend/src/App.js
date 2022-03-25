import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Dashboard from "./user/pages/Dashboard";
// import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import Forms from "./forms/Forms";
import Events from "./events/EventList";
import Clubs from "./Clubs/Clubs";
import Profile from "./Profile/Profile";
// import Group from "./groups/pages/Group";
// import Dashboard from "./dashboard/pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  /*<Route path="/"> given a specific path in the url, components or pages between closing braces of 
  route will be rendered when that url starts with that specific path name
  Add exact key word <Route path="/" exact> for only that exact url to render components in that route
   
  Redirect component redirects to a url or page when the user enters a url that is not in the routes.
  */
  //switch route: when one route is true the rest of the routes will not be evaluated
  //Triggered when user logged in, they are able to see all pages except log in
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/clubs" exact>
          <Clubs />
        </Route>

        {/* <Route path="/:userId/places" exact></Route>
        <Route path="/groups/:groupUserId/" exact></Route> */}
        <Route path="/events">
          <Events />
        </Route>
        {/* <Route path="/places/new" exact></Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route> */}
        <Route path="/forms">
          <Forms />
        </Route>
        <Route path="/account/:userId">
          <Profile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    //when user not logged in they are only able to see few pages
    // <Route path="/:userId/places" exact> the : means it is dynamic and you don't know the exact value yet.
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  //everything we wrap <AuthContext.Provide value(we want to manage)> in gets access to it
  //when logged in will display logout button, when not logged in shows login button
  //all the components listening to the context(not wrapped) will re-render it
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />

        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
