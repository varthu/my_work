import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './postableStyle.js';
import Spinners from "./spinneranimation";

class MUIDataTableComponent extends Component{
    render(){

        if (!this.props.data.length) {
            return(
            <Spinners />)
        } else {
            return(
                <MuiThemeProvider theme={theme}>
                    <MUIDataTable className = {this.props.datatableClassName}
                        data={this.props.data} 
                        columns={this.props.columns}
                        options={this.props.options}
                        title={this.props.title} 
                    />
                </MuiThemeProvider>
            );
        }

    }
}

export default MUIDataTableComponent;
