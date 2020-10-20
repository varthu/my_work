import React, { Component } from 'react';
import APIServices from './apiservices';
import $ from 'jquery';

import { Route, NavLink, HashRouter } from "react-router-dom";

import POSDetail from "./posDetails";
import Routes from "./route";
import Dashboard from "./dashboard"

const apiServices = new APIServices();

class LeftNavheader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails: []
    };

  }
  componentDidMount() {
    var self = this;

    // apiServices.getPOSDetails().then(function (result) {
    //   console.log("Happy : ", result);
    //   self.setState({ posDetails: result})
    // });


  }

  render() {
    return (

      <div className="container body">
          <div className="main_container">
            <Headernav />
            <LeftSidemenu />
        </div>
      </div>
    );
  }
}


class Headernav extends React.Component {

   sidemenuToggle = () => {

      if ($('body').hasClass('nav-md')) {
        $('#sidebar-menu').find('li.active ul').hide();
        $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
      } else {
        $('#sidebar-menu').find('li.active-sm ul').show();
        $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
      }

      $('body').toggleClass('nav-md nav-sm');

   };

   render() {
      return (
        <div className="top_nav">
          <div className="nav_menu">
            <nav>
              <div className="nav toggle">
                <a id="menu_toggle" onClick={this.sidemenuToggle}><i className="fa fa-bars"></i></a>
              </div>

              <ul className="nav navbar-nav navbar-right">
                <li className="">
                  <a href="index.html" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="static/images/img.jpg" alt="" />Hi, Muthu<span className=" fa fa-angle-down"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="index.html"> Profile</a></li>
                    <li>
                      <a href="javascript:void(0)">
                        <span>Settings</span>
                      </a>
                    </li>
                    <li><a href="/"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      );
   }
}

class LeftSidemenu extends React.Component {

   render() {
      return (
        <HashRouter>
          <div className="col-md-3 left_col menu_fixed">
            <div className="left_col scroll-view">
              <div className="navbar nav_title" style={{ border: '0' }}>
                <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span> ARMS </span></a>
              </div>

              <div className="clearfix"></div>

              <div className="profile clearfix">
                <div className="profile_pic">
                  <img src="static/images/img.jpg" alt="..." className="img-circle profile_img" />
                </div>
                <div className="profile_info">
                  <span>Welcome,</span>
                  <h2>Hi, Muthu</h2>
                </div>
              </div>

              <br />

              <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section">
                  <h3>General</h3>
                  <ul className="nav side-menu">
                    <li><NavLink to="/"><i className="fa fa-laptop"></i> Dashboard </NavLink> </li>
                    <li><NavLink to="/pospage"><i className="fa fa-bar-chart-o"></i> POS </NavLink> </li>
                    <li><NavLink to="/routepage"><i className="fa fa-bar-chart-o"></i> Route </NavLink> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="right_col" role="main">
            <Route exact  path="/" component={Dashboard}/>
            <Route path="/pospage" component={POSDetail}/>
            <Route path="/routepage" component={Routes}/>
          </div>

          <footer>
            <div className="pull-right">
              <a href="http://pathfinder.global/" target="_blank">Pathfinder Global FZCO</a>
            </div>
            <div className="clearfix"></div>
          </footer>

        </HashRouter>
      );
   }
}

export default LeftNavheader;