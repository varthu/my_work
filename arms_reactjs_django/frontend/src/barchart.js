import React, { Component } from "react";
import TopFiveODs from './topfiveodsbarchart';
import Piechart from './piechart';

class Barchart extends Component {

  render() {
    return (      
      <div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="x_panel tile">
            <div className="x_title">
              <h2>Top 5 O&Ds</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
                <li><a href="#"><i className="fa fa-wrench"></i></a></li>
                <li><a className="close-link"><i className="fa fa-close"></i></a></li>
              </ul>
              <div className="clearfix"></div>
            </div>
              <TopFiveODs />
            </div>
          </div>

        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="x_panel tile">
            <div className="x_title">
              <h2>Region wise Performance</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
                <li><a href="#"><i className="fa fa-wrench"></i></a></li>
                <li><a className="close-link"><i className="fa fa-close"></i></a></li>
              </ul>
              <div className="clearfix"></div>
            </div>
              <Piechart />
            </div>
          </div>
        </div>

    )
  }

}

export default Barchart;