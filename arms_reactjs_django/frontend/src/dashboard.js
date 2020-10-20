import React, { Component } from "react";
import Indicators from "./indicators";
import Barchart from "./barchart";
import Linechart from "./linechart";
import PivotTable from './pivottable';

class Dashboard extends Component {
  render() {
      
    return (
        <div>
            <div className="row tile_count">
                <Indicators />
            </div>  
            <div className="row">
                <Barchart />
            </div>
            <div className="row">
                <Linechart />
            </div>
            <div className="row">
                <PivotTable />
            </div>
        </div>
    )
  }
}

export default Dashboard