import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './postableStyle.js';
import "./index.css";


class DatatableModelDetails extends Component{
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
            <div className="modal fade bd-example-modal-lg" id="dataTableModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
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
export default DatatableModelDetails;




