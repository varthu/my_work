import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './postableStyle.js';
import MOMRevenueMultiline from './momrevenueLine';
import "./legends.css";
import "./index.css";


class ChartModelDetails extends Component{
    render(){
        const regionOptions = {
            responsive: 'scroll',
            filter: false,
            download:true,
            print:false,
            selectableRows: 'none',
            filterType: 'dropdown',
            rowsPerPage: 6,
            rowsPerPageOptions: [6, 25, 50],
          };
      
        return(

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">

                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel tile">
                                    <div className="x_title">
                                    <h2>Month on Month Revenue</h2>
                                    <ul className="nav navbar-right panel_toolbox">
                                        <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
                                        <li><a href="#"><i className="fa fa-wrench"></i></a></li>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
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
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel">
                                <div className="x_content">
                                    <MuiThemeProvider theme={theme}>
                                    <MUIDataTable className = 'modelRegionTable'
                                        data={this.props.datas} 
                                        columns={this.props.columns} 
                                        options={regionOptions}
                                        title={"Model DataTable"} 
                                    />
                                    </MuiThemeProvider>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>

        );
    }
}
export default ChartModelDetails;




