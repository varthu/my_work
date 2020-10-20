import React, { Component } from "react";
import MOMRevenueMultiline from './momrevenueLine';
import MOMAvgFareMultiline from './momavgfaremultiline';
import "./legends.css";

class Linechart extends Component {

  render() {    
    return (
      <div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="x_panel tile">
            <div className="x_title">
              <h2>Month on Month Revenue</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
                <li><a href="#"><i className="fa fa-wrench"></i></a></li>
                <li><a className="close-link"><i className="fa fa-close"></i></a></li>
              </ul>
              <div className="clearfix"></div>
            </div>
         
              <MOMRevenueMultiline />
              <div id="legend2" className='col-md-12'>
                <div className="legend2"> <p className="country-name"><span className="key-dot queens"></span>CY Revenue</p> </div>
                <div className="legend2"> <p className="country-name"><span className="key-dot kings"></span>Forcast</p> </div>
                <div className="legend2"> <p className="country-name"><span className="key-dot bronx"></span>LY Revenue</p> </div>
              </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="x_panel tile">
            <div className="x_title">
              <h2>Month on Month Avg Fare Analysis</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className ="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
                <li><a href="#"><i className="fa fa-wrench"></i></a></li>
                <li><a className="close-link"><i className="fa fa-close"></i></a></li>
              </ul>
              <div className="clearfix"></div>
            </div>
              <MOMAvgFareMultiline />
              <div id="legend2" className='col-md-12'>
                <div className="legend2"> <p className="country-name"><span className="key-dot queens"></span>CY Avg Fare</p> </div>
                <div className="legend2"> <p className="country-name"><span className="key-dot kings"></span>Forcast</p> </div>
                <div className="legend2"> <p className="country-name"><span className="key-dot bronx"></span>LY Avg Fare</p> </div>
              </div>
          </div>
        </div>
    </div>
    )
  } 
}
export default Linechart;