import React, { Component } from 'react';
import APIServices from './apiservices';
import ChartModelDetails from './chartModel';
import DatatableModelDetails from './dataTableModel';
import MUIDataTableComponent from './MuiDataTableComponent.js';
import $ from 'jquery';
import './App.css';
import './breadcrumb.css';

const apiServices = new APIServices();

var bcData = [];
var count = 1;
var inputLevel;
var gettingRegion;
var datatableClassName ;

class POSDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
        posMonthDetails: [],
        monthcolumns:[],
        regioncolumn: [],
        posRegionDatas: [],
        modelRegionDatas:[],
        modelregioncolumn:[],
        tableDatas: true,
        gettingMonth: new Date().getMonth() + 1,
        tableTitle: '',
        monthTableTitle: '',
        tabLevel:'R',
        posFlowData:'Null',
        posAgentFlowDatas: [],
        posAgentFlowcolumn: [],
        cabinOption: [],
        cabinselectedvalue: 'Null',
     };

  }

  componentDidMount() {
    
    var self = this;
    var getCabinValue = this.state.cabinselectedvalue;

    apiServices.getPOSMonthTables().then(function (result) {
        var columnName = result[0].columnName;
        var posMonthdata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        self.setState({ posMonthDetails: posMonthdata, monthcolumns:columnName, monthTableTitle: tableTitle })
    });

    apiServices.getPOSRegionTables(this.state.gettingMonth, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        self.setState({ posRegionDatas: posRegionata, regioncolumn: columnName, tableTitle: tableTitle })
    });
   
    apiServices.getClassNameDetails().then(function (result) {
      var classData = result[0].classDatas;
      self.setState({ cabinOption: classData })
    });

  }

  handleClick(rowData) {
      var monththis  = this;
      var gettingMonth = window.monthNameToNum(rowData[0].props.children);
      var getColName = $('.regionTable thead tr th:nth-child(1)').text();
      var getCabinValue = this.state.cabinselectedvalue;

      if(getColName === 'RegionName'){
        apiServices.getPOSRegionTables(gettingMonth,getCabinValue).then(function (result) {
          inputLevel = "R";
          var columnName = result[0].columnName;
          var posRegionata = result[0].posregiontableDatas;
          var tableTitle = result[0].tableTitle;
          monththis.setState({ posRegionDatas: posRegionata, regioncolumn:columnName, gettingMonth: gettingMonth, tableTitle: tableTitle})
        });

      }else if(getColName === 'CountryName'){
        inputLevel = "C";
        apiServices.getPOSCountryDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
          var columnName = result[0].columnName;        
          var posDatas = result[0].posCountrytableDatas;
          var tableTitle = result[0].tableTitle;
          monththis.setState({ posRegionDatas: posDatas, regioncolumn:columnName,gettingMonth: gettingMonth, tableTitle: tableTitle})
        });
      }else if(getColName === 'POS'){
        inputLevel = "P";
        apiServices.getPOSDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
          var columnName = result[0].columnName;       
          var posDatas = result[0].posregiontableDatas;
          var tableTitle = result[0].tableTitle;
          monththis.setState({ posRegionDatas: posDatas, regioncolumn:columnName ,gettingMonth: gettingMonth , tableTitle: tableTitle})
        });

      }else{
        inputLevel = "O";
        apiServices.getPOSODDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
          var columnName = result[0].columnName;       
          var posDatas = result[0].posregiontableDatas;
          var tableTitle = result[0].tableTitle;
          monththis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, gettingMonth: gettingMonth, tableTitle: tableTitle})
        });  

      }
      bcData = [];
  }
  
  RegionhandleClick(rowData) {
    var regionthis  = this;
    gettingRegion = rowData[0].props.children;
    var gettingMonth = this.state.gettingMonth;
    var getColName = $('.regionTable thead tr th:nth-child(1)').text();
    var getCabinValue = this.state.cabinselectedvalue;

    if(getColName === 'RegionName'){
      inputLevel = "C";

      apiServices.getPOSCountryDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;        
        var posDatas = result[0].posCountrytableDatas;
        var tableTitle = result[0].tableTitle;

        bcData.push({"key":inputLevel,"val":gettingRegion,"title":"Region"});

        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle, tabLevel:'R', posFlowData: gettingRegion})
      });

      apiServices.getMonthWise(gettingRegion, inputLevel,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });
       
    } else if(getColName === 'CountryName') {
      inputLevel = "P";
      apiServices.getPOSDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
       
        bcData.push({"key":inputLevel,"val":gettingRegion,"title":"Country"});

        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName , tableTitle: tableTitle, tabLevel:'C', posFlowData: gettingRegion})
      });
      apiServices.getMonthWise(gettingRegion, inputLevel,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });
  
    } else if(getColName === 'POS') {
      inputLevel = "O";
      apiServices.getPOSODDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        bcData.push({"key":inputLevel,"val":gettingRegion,"title":"POS"});

        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle, posFlowData: gettingRegion})
      });  
      apiServices.getMonthWise(gettingRegion, inputLevel,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });

    } else if(getColName === 'CommonOD') {
      inputLevel = "S";
      apiServices.getPOSClassDetails(gettingMonth, gettingRegion, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        bcData.push({"key":inputLevel,"val":gettingRegion,"title":"CommonOD"});
        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle})
      });  
      apiServices.getMonthWise(gettingRegion, inputLevel, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });

    }

    count = 2;
  }

  posHandleClick = (e) => {
    var region  = this;
    region.setState({ posRegionDatas: []})

    var inputLevel = this.state.tabLevel;
    var posFlowData = this.state.posFlowData;
    var getCabinValue = this.state.cabinselectedvalue;
    var tabValueChange;

    if(inputLevel === 'R' && posFlowData === 'Null'){
    apiServices.getPOSRegionTables(this.state.gettingMonth, getCabinValue).then(function (result) {
      var columnName = result[0].columnName;
      var posRegionata = result[0].posregiontableDatas;
      var tableTitle = result[0].tableTitle;
      region.setState({ posRegionDatas: posRegionata, regioncolumn: columnName, tableTitle: tableTitle})
    });
    }else if(inputLevel === 'R' && posFlowData != 'Null'){
      tabValueChange = 'C';
      apiServices.getPOSCountryDetails(this.state.gettingMonth, posFlowData, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;        
        var posDatas = result[0].posCountrytableDatas;
        var tableTitle = result[0].tableTitle;
        region.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle})
      });

    } else if(inputLevel === 'C'){
      tabValueChange = 'P';
      apiServices.getPOSDetails(this.state.gettingMonth, posFlowData, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        region.setState({ posRegionDatas: posDatas, regioncolumn:columnName , tableTitle: tableTitle})
      });
    } else {
      tabValueChange = 'O';
      apiServices.getPOSODDetails(this.state.gettingMonth, gettingRegion, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        region.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle})
      });  
    } 
  }

  odHandleClick = (e) => {
    var region = this;
    region.setState({ posRegionDatas: []})

    var getCabinValue = this.state.cabinselectedvalue;
    var inputLevel = this.state.tabLevel;
    var tabValueChange;
    if(inputLevel === 'R' && this.state.posFlowData === 'Null'){
      tabValueChange = 'R';
    }else if(inputLevel === 'R' && this.state.posFlowData != 'Null'){
      tabValueChange = 'C';
    }else if(inputLevel === 'C'){
      tabValueChange = 'P';
    }else{
      tabValueChange = 'O';
    }
    apiServices.getODFlowTables(this.state.gettingMonth, tabValueChange, this.state.posFlowData,getCabinValue).then(function (result) {
      var columnName = result[0].columnName;
      var posODdata = result[0].posregiontableDatas;
      var tableTitle = result[0].tableTitle;
      region.setState({ posRegionDatas: posODdata, regioncolumn:columnName, tableTitle: tableTitle})
    });
  }

  agentHandleClick = (e) => {
    var region = this;
    region.setState({ posRegionDatas: []})

    var getCabinValue = this.state.cabinselectedvalue;
    var gettingMonth = this.state.gettingMonth;
    var inputLevel = this.state.tabLevel;
    var posFlowData = this.state.posFlowData;

    apiServices.getAgentDetails(gettingMonth,inputLevel,posFlowData,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posAgentData = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        region.setState({ posRegionDatas: posAgentData, regioncolumn:columnName, tableTitle: tableTitle})
    });
  }

  homeHandleClick = (e) =>{
    var self = this;
    var getCabinValue = this.state.cabinselectedvalue;
    apiServices.getPOSMonthTables().then(function (result) {
        var columnName = result[0].columnName;
        var posMonthdata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        self.setState({ posMonthDetails: posMonthdata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });

    apiServices.getPOSRegionTables(this.state.gettingMonth, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        self.setState({ posRegionDatas: posRegionata, regioncolumn: columnName, tableTitle: tableTitle})
      });
    bcData = [];
  }

  listHandleClick = (e) => {
    var regionthis  = this;
    gettingRegion = e.target.id;
    var gettingMonth = this.state.gettingMonth;
    var getColName = e.target.title;
    var getCabinValue = this.state.cabinselectedvalue;

    var indexEnd = bcData.findIndex(function(e) {
      return e.val == gettingRegion;
    })
    var removeArrayIndex = bcData.slice(0,indexEnd+1);
    bcData = removeArrayIndex;

    if(getColName === 'Region'){
      inputLevel = "C";
      apiServices.getPOSCountryDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;        
        var posDatas = result[0].posCountrytableDatas;
        var tableTitle = result[0].tableTitle;
        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle})
      });
      apiServices.getMonthWise(gettingRegion, inputLevel,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });
    } else if(getColName === 'Country') {
      inputLevel = "P";
      apiServices.getPOSDetails(gettingMonth, gettingRegion,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName , tableTitle: tableTitle})
      });
      apiServices.getMonthWise(gettingRegion, inputLevel, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });
    } else if(getColName === 'POS') {
      inputLevel = "O";
      apiServices.getPOSODDetails(gettingMonth, gettingRegion, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;       
        var posDatas = result[0].posregiontableDatas;
        var tableTitle = result[0].tableTitle;
        regionthis.setState({ posRegionDatas: posDatas, regioncolumn:columnName, tableTitle: tableTitle})
      });
      apiServices.getMonthWise(gettingRegion, inputLevel,getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });
    }

  }

  monthWiseCellClick= (cellIndex,rowData) => {
    if(rowData.colIndex === 2){
      rowData.event.stopPropagation();
      var self = this;
      apiServices.getCabinDetails(this.state.gettingMonth).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posregiontableDatas;
        self.setState({ modelRegionDatas: posRegionata, modelregioncolumn: columnName})
      });
    }
  }

  cellhandleClick = (cellIndex,rowData) => {
    if(rowData.colIndex === 1){
      rowData.event.stopPropagation();
      var self = this;
      var getCabinValue = this.state.cabinselectedvalue;
      apiServices.getPOSRegionTables(this.state.gettingMonth, getCabinValue).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posregiontableDatas;
        self.setState({ modelRegionDatas: posRegionata, modelregioncolumn: columnName})
      });
    }
  }

  cabinSelectChange = (e) => {
    var self = this;
    var getCabinValue = this.state.cabinselectedvalue;
    var gettingRegion = 'Null';
    var inputLevel = 'R';
    
    self.setState({ cabinselectedvalue: e.target.value });

    apiServices.getMonthWise(gettingRegion, inputLevel,e.target.value).then(function (result) {
      var columnName = result[0].columnName;
      var posRegionata = result[0].posmonthtableDatas;
      var tableTitle = result[0].monthTableTitle;
      self.setState({ posMonthDetails: posRegionata, monthcolumns:columnName, monthTableTitle: tableTitle})
      });

    apiServices.getPOSRegionTables(this.state.gettingMonth, e.target.value).then(function (result) {
      var columnName = result[0].columnName;
      var posRegionata = result[0].posregiontableDatas;
      var tableTitle = result[0].tableTitle;
      self.setState({ posRegionDatas: posRegionata, regioncolumn: columnName, tableTitle: tableTitle})
      });

  }
  render() {

    let options = {
      responsive: 'scroll',
      filter: false,
      download:true,
      print:false,
      selectableRows: 'none',
      filterType: 'dropdown',
      rowsPerPage: 6,
      rowsPerPageOptions: [6, 25, 50],
      onRowClick: (rowData, rowIndex) => {
        this.handleClick(rowData);
        var rowindex = (rowIndex.rowIndex) + 1;
        $(".monthTable tbody tr").css("background-color","#fff");
        $(".monthTable tbody tr td").css("color","#2a3f54e8");
        $(".monthTable tbody tr:nth-child("+ rowindex +")").css("background-color", "#537790c2");   
        $(".monthTable tbody tr#MUIDataTableBodyRow-"+ rowIndex.dataIndex +" > td").css("color","#fff")
      },
      onCellClick: (cellIndex,rowData) => {this.monthWiseCellClick(cellIndex,rowData)},
    };

    let regionOptions = {
      responsive: 'scroll',
      filter: false,
      download:true,
      print:false,
      selectableRows: 'none',
      filterType: 'dropdown',
      rowsPerPage: 6,
      rowsPerPageOptions: [6, 25, 50],
      onRowClick: rowData => {this.RegionhandleClick(rowData)},
      onCellClick: (cellIndex,rowData) => {this.cellhandleClick(cellIndex,rowData)},
    };

    $("#pagination-next").on("click" , function() {
        $(".monthTable tbody tr").css("background-color","#fff");
        $(".monthTable tbody tr td").css("color","#000");
    });
    $("#pagination-back").on("click" , function() {
        $(".monthTable tbody tr").css("background-color","#fff");
        $(".monthTable tbody tr td").css("color","#000");
    });

    return (
      <div>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="navdesign">
                <div className="col-md-10 col-sm-10 col-xs-12" style={{backgroundColor: "#EDEDED"}}>
                  <section>
                    <nav>
                      <ol className="cd-breadcrumb">
                      <li onClick={this.homeHandleClick} > POS </li>
                      {bcData.map((item) =>
                        <li onClick={this.listHandleClick} data-value={item.key}  id={item.val} title={item.title}> {item.val} </li>
                      )}
                      </ol>
                    </nav>
                  </section>
                </div>

                <div className="col-md-2 col-sm-2 col-xs-12" style={{backgroundColor: "#EDEDED"}}>
                  <div className="form-group" style={{marginTop:"14px", marginBottom:"14px"}}>
                    <select className="form-control cabinselect" onChange={this.cabinSelectChange}>
                      <option selected={true} disabled="disabled" value="">Select Cabin</option>
                        {this.state.cabinOption.map((item) => 
                          <option key = {item.ClassValue} value={item.ClassValue}>{item.ClassText}</option>
                        )}
                    </select>
                  </div>
                </div>

            </div>
            
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">

            <div className="x_panel" style={{marginTop: "15px"}}>
              <div className="x_content">

                <MUIDataTableComponent datatableClassName = {'monthTable'} data={this.state.posMonthDetails} columns = {this.state.monthcolumns} options={options} title={this.state.monthTableTitle}/>

              </div>
            </div>

          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              <div className="x_content">

                <div className="tab" id="posTableTab" role="tabpanel">
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active" onClick = {this.posHandleClick} ><a href="#Section1" aria-controls="home" role="tab" data-toggle="tab">POS Flow</a></li>
                    <li role="presentation" onClick = {this.odHandleClick}><a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">O&D Flow</a></li>
                    <li role="presentation" onClick = {this.agentHandleClick}><a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">Agency Flow</a></li>
                  </ul>
                  <div className="tab-content tabs">
                    <div role="tabpanel" className="tab-pane fade in active" id="Section1">

                        <MUIDataTableComponent datatableClassName = {'regionTable'} data={this.state.posRegionDatas} columns = {this.state.regioncolumn} options={regionOptions} title={this.state.tableTitle}/>

                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="Section2">

                        <MUIDataTableComponent datatableClassName = {'odTable'} data={this.state.posRegionDatas} columns = {this.state.regioncolumn} options={regionOptions} title={this.state.tableTitle}/>

                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="Section3">

                        <MUIDataTableComponent datatableClassName = {'agencyTable'} data={this.state.posRegionDatas} columns = {this.state.regioncolumn} options={regionOptions} title={this.state.tableTitle}/>

                    </div>

                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>

        <div> 
          <ChartModelDetails datas = {this.state.modelRegionDatas} columns = {this.state.modelregioncolumn}/>
        </div>

        <div> 
          <DatatableModelDetails datas = {this.state.modelRegionDatas} columns = {this.state.modelregioncolumn}/>
        </div>


      </div>

    );
  }
}

export default POSDetail;