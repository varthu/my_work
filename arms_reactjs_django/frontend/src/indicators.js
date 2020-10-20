import React, { Component } from "react";
import APIServices from './apiservices';

const apiServices = new APIServices();
 
class Indicators extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            indicatorsDatas: [],
            indicatorsDivWidth: "",
        };
    }
    
    componentDidMount() {
        var self = this;
        apiServices.getIndicators().then(function (indicatorsData) {
            var widthCalc = 100/indicatorsData.length;
            self.setState({ indicatorsDatas: indicatorsData, indicatorsDivWidth: widthCalc+"%" })
        });
    }
    
    render() {

        return (
            <div>
                {this.state.indicatorsDatas.map((indicator) =>
                    <div id="indicator_data" className="col-sm-4 col-xs-6 tile_stats_count" style={{width: this.state.indicatorsDivWidth}}>
                        <span className="count_top"> {indicator.name} </span>
                        <div className="count" id={indicator.id_form}> {indicator.total} </div>
                        <span className="count_bottom"><i className="" id="revenue_YTD_per"> {indicator.percentage} %</i></span>
                        <div className="progress active" id="indicator_progress" style={{ "width":"90%" }}>
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{"width": indicator.percentage+"%"}} >
                            </div>
                        </div>
                    </div>
                )};
            </div>
        ) 

    }
}

export default Indicators;
