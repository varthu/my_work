import React from "react";
import { Route } from "react-router-dom";
import LeftNavheader from './leftnavheader';
import Login from "./Component/login";

const BaseRouter = () => (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={LeftNavheader} />
    </div>
  );
  
  export default BaseRouter;