import React, { Component } from 'react';
import APIServices from './apiservices';
import ChartModelDetails from './chartModel'
import DatatableModelDetails from './dataTableModel'
import MUIDataTableComponent from './MuiDataTableComponent.js'
import $ from 'jquery';
import './App.css';
import './breadcrumb.css';

const apiServices = new APIServices();
var bcData = [];
var count = 1;
var inputLevel;
var gettingRegion;
 
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      routeMonthDetails: [],
      routeMonthColumns:[],
      routeRegiondatas: [],
      routeRegionColumn: [],

      modelRegionDatas:[],
      modelregioncolumn:[],
      tableDatas: true,
      gettingMonth: new Date().getMonth() + 1,
      monthTableTitle: '',
      tableTitle: '',
      tabLevel:'',
      cabinOption: [],
      cabinselectedvalue: 'Null',      
    };
  }

  componentDidMount() {
      var self = this;
      var getCabinValue = this.state.cabinselectedvalue;

      apiServices.getRouteMonthTables().then(function (result) {
          var columnName = result[0].columnName;
          var routeMonthdata = result[0].routemonthtableDatas;
          var tableTitle = result[0].monthTableTitle;
          self.setState({ routeMonthDetails: routeMonthdata, routeMonthColumns:columnName, monthTableTitle: tableTitle});
      });

      apiServices.getRouteRegionTables(this.state.gettingMonth, getCabinValue).then(function (result) {
          var columnName = result[0].columnName;
          var routeRegiondata = result[0].routeRegiontableDatas;
          var tableTitle = result[0].tableTitle;
          self.setState({ routeRegiondatas: routeRegiondata, routeRegionColumn: columnName, tableTitle: tableTitle});
      });

      apiServices.getClassNameDetails().then(function (result) {
        var classData = result[0].classDatas;
        self.setState({ cabinOption: classData })
      });
  }

  monthwiseHandleClick(rowData) {
      var monththis  = this;
      var gettingMonth = window.monthNameToNum(rowData[0].props.children);
      var getColName = $('.regionTable thead tr th:nth-child(1)').text();
      var getCabinValue = this.state.cabinselectedvalue;

      console.log("Test gettingMonth Value 1 : ",gettingMonth );
      console.log("Test getColName Value 2 : ",getColName );

      if(getColName === getColName){
        console.log("Test gettingMonth Value 3 : ",gettingMonth );
        console.log("Test getColName Value 4 : ",getColName );

        apiServices.getRouteRegionTables(gettingMonth, getCabinValue).then(function (result) {

          inputLevel = "R";
          var columnName = result[0].columnName;
          var routeRegiondata = result[0].routeRegiontableDatas;
          var tableTitle = result[0].tableTitle;
          monththis.setState({ routeRegiondatas: routeRegiondata, routeRegionColumn:columnName, gettingMonth: gettingMonth, tableTitle: tableTitle})
        });

      }
      // else if(getColName === 'CountryName'){
      //   inputLevel = "C";
      //   apiServices.getPOSCountryDetails(gettingMonth, gettingRegion).then(function (result) {
      //     var columnName = result[0].columnName;        
      //     var posDatas = result[0].posCountrytableDatas;
      //     var tableTitle = result[0].tableTitle;
      //     monththis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName,gettingMonth: gettingMonth, tableTitle: tableTitle})
      //   });
      // }else if(getColName === 'POS'){
      //   inputLevel = "P";
      //   apiServices.getPOSDetails(gettingMonth, gettingRegion).then(function (result) {
      //     var columnName = result[0].columnName;       
      //     var posDatas = result[0].posregiontableDatas;
      //     var tableTitle = result[0].tableTitle;
      //     monththis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName ,gettingMonth: gettingMonth , tableTitle: tableTitle})
      //   });

      // }else{
      //   inputLevel = "O";
      //   apiServices.getPOSODDetails(gettingMonth, gettingRegion).then(function (result) {
      //     var columnName = result[0].columnName;       
      //     var posDatas = result[0].posregiontableDatas;
      //     var tableTitle = result[0].tableTitle;
      //     monththis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName, gettingMonth: gettingMonth, tableTitle: tableTitle})
      //   });  

      // }
      bcData = [];
  }
  
  RegionhandleClick(rowData) {
    var regionthis  = this;
    gettingRegion = rowData[0];
    var gettingMonth = this.state.gettingMonth;
    var getColName = $('.regionTable thead tr th:nth-child(1)').text();

    // var inputLevel;

    if(getColName === 'RegionName'){
      inputLevel = "C";
      console.log("gettingMonth : ",gettingMonth);
      apiServices.getPOSCountryDetails(gettingMonth, gettingRegion).then(function (result) {
        var columnName = result[0].columnName;        
        var posDatas = result[0].posCountrytableDatas;
        var tableTitle = result[0].tableTitle;

        // tabVal = "C";
        bcData.push({"key":inputLevel,"val":gettingRegion,"title":"Region"});
        console.log("Demo Data1 : ", bcData);

        regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName, tableTitle: tableTitle, tabLevel:inputLevel})
      });

      apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
        var columnName = result[0].columnName;
        var posRegionata = result[0].posmonthtableDatas;
        var tableTitle = result[0].monthTableTitle;
        regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
      });
      // bcData.push(rowData[0]);
    }
    //  else if(getColName === 'CountryName') {
  //     inputLevel = "P";
  //     console.log("gettingMonth : ",gettingMonth);
  //     apiServices.getPOSDetails(gettingMonth, gettingRegion).then(function (result) {
  //       var columnName = result[0].columnName;       
  //       var posDatas = result[0].posregiontableDatas;
  //       var tableTitle = result[0].tableTitle;
       
  //       bcData.push({"key":inputLevel,"val":gettingRegion,"title":"Country"});
  //       console.log("Demo Data 2: ", bcData);

  //       regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName , tableTitle: tableTitle})
  //     });
  //     apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });
  
  //     // bcData.push(rowData[0]);
  //   } else if(getColName === 'POS') {
  //     inputLevel = "O";
  //     console.log("gettingMonth : ",gettingMonth);
  //     apiServices.getPOSODDetails(gettingMonth, gettingRegion).then(function (result) {
  //       var columnName = result[0].columnName;       
  //       var posDatas = result[0].posregiontableDatas;
  //     var tableTitle = result[0].tableTitle;

  //       // tabVal = "O";
  //       bcData.push({"key":inputLevel,"val":gettingRegion,"title":"POS"});
  //       console.log("Demo Data3 : ", bcData);

  //       regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName, tableTitle: tableTitle})
  //     });  
  //     apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });
  

  //   }
  //   count = 2;
  }

  // posHandleClick = (e) => {
  //   var region  = this;
  //   apiServices.getPOSRegionTables(this.state.gettingMonth).then(function (result) {
  //       var columnName = result[0].columnName;
  //     var posRegionata = result[0].posregiontableDatas;
  //     var tableTitle = result[0].tableTitle;
  //     region.setState({ posRegionDatas: posRegionata, routeRegionColumn: columnName, tableTitle: tableTitle})
  //   });
  // }

  // odHandleClick = (e) => {
  //   var self = this;
  //   apiServices.getPOSMonthTables().then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posMonthdata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       self.setState({ posRegionDatas: posMonthdata, routeRegionColumn:columnName, tableTitle: tableTitle})
  //   });
  // }

  // agentHandleClick = (e) => {
  //   var self = this;
  //   apiServices.getAgentDetails().then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posAgentData = result[0].posregiontableDatas;
  //       var tableTitle = result[0].tableTitle;
  //       self.setState({ posRegionDatas: posAgentData, routeRegionColumn:columnName, tableTitle: tableTitle})
  //   });
  // }

  // homeHandleClick = (e) =>{
  //   var self = this;
  //   apiServices.getPOSMonthTables().then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posMonthdata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       self.setState({ posMonthDetails: posMonthdata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });

  //   apiServices.getPOSRegionTables(this.state.gettingMonth).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posregiontableDatas;
  //       var tableTitle = result[0].tableTitle;
  //       self.setState({ posRegionDatas: posRegionata, routeRegionColumn: columnName, tableTitle: tableTitle})
  //     });
  //   bcData = [];
  // }

  // listHandleClick = (e) => {
  //   var regionthis  = this;
  //   gettingRegion = e.target.id;
  //   var gettingMonth = this.state.gettingMonth;
  //   var getColName = e.target.title;
    
  //   // var inputLevel;

  //   var indexEnd = bcData.findIndex(function(e) {
  //     return e.val == gettingRegion;
  //   })
  //   var removeArrayIndex = bcData.slice(0,indexEnd+1);
  //   bcData = removeArrayIndex;

  //   if(getColName==='Region'){
  //     inputLevel = "C";
  //     apiServices.getPOSCountryDetails(gettingMonth, gettingRegion).then(function (result) {
  //       var columnName = result[0].columnName;        
  //       var posDatas = result[0].posCountrytableDatas;
  //       var tableTitle = result[0].tableTitle;
  //       regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName, tableTitle: tableTitle})
  //     });
  //     apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });
  //   } else if(getColName ==='Country') {
  //     inputLevel = "P";
  //     apiServices.getPOSDetails(gettingMonth, gettingRegion).then(function (result) {
  //       var columnName = result[0].columnName;       
  //       var posDatas = result[0].posregiontableDatas;
  //       var tableTitle = result[0].tableTitle;
  //       regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName , tableTitle: tableTitle})
  //     });
  //     apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });
  //   } else if(getColName ==='POS') {
  //     inputLevel = "O";
  //     apiServices.getPOSODDetails(gettingMonth, gettingRegion).then(function (result) {
  //       var columnName = result[0].columnName;       
  //       var posDatas = result[0].posregiontableDatas;
  //       var tableTitle = result[0].tableTitle;
  //       regionthis.setState({ posRegionDatas: posDatas, routeRegionColumn:columnName, tableTitle: tableTitle})
  //     });
  //     apiServices.getMonthWise(gettingRegion, inputLevel).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posmonthtableDatas;
  //       var tableTitle = result[0].monthTableTitle;
  //       regionthis.setState({ posMonthDetails: posRegionata, routeMonthColumns:columnName, monthTableTitle: tableTitle})
  //     });
  //   }

  // }
  // cellhandleClick = (cellIndex,rowData) => {
  //   if(rowData.colIndex === 1){
  //     rowData.event.stopPropagation();
  //     var self = this;
  //     apiServices.getPOSRegionTables(this.state.gettingMonth).then(function (result) {
  //       var columnName = result[0].columnName;
  //       var posRegionata = result[0].posregiontableDatas;
  //       self.setState({ modelRegionDatas: posRegionata, modelregioncolumn: columnName})
  //     });
  //   }
  // }
  render() {
    const options = {
      responsive: 'scroll',
      filter: false,
      download:true,
      print:false,
      selectableRows: 'none',
      filterType: 'dropdown',
      rowsPerPage: 6,
      rowsPerPageOptions: [6, 25, 50],
      onRowClick: (rowData, rowIndex) => {
        console.log("Check Row Data : ", rowData);
        var rowindex = (rowIndex.rowIndex) + 1;
        $(".monthTable tbody tr").css("background-color","#fff");
        $(".monthTable tbody tr td").css("color","#000");

        $(".monthTable tbody tr:nth-child("+ rowindex +")").css("background-color", "#537790c2");   
        $(".monthTable tbody tr#MUIDataTableBodyRow-"+ rowIndex.dataIndex +" > td").css("color","#fff")
        this.monthwiseHandleClick(rowData);
      },
      onCellClick: (cellIndex,rowData) => {
        // this.cellhandleClick(cellIndex,rowData)
      },
    };

    const regionOptions = {
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
                      <li onClick={this.homeHandleClick} > Route </li>
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

                <MUIDataTableComponent 
                  datatableClassName = {'monthTable'} 
                  data = {this.state.routeMonthDetails} 
                  columns = {this.state.routeMonthColumns} 
                  options = {options} 
                  title = {this.state.monthTableTitle}
                />

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
                    <li role="presentation" className="active" onClick = {this.odHandleClick}><a href="#Section1" aria-controls="profile" role="tab" data-toggle="tab">Region</a></li>
                    <li role="presentation"><a href="#Section2" aria-controls="messages" role="tab" data-toggle="tab">POS Based</a></li>
                    <li role="presentation"><a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">RBD Based</a></li>
                    <li role="presentation"><a href="#Section4" aria-controls="messages" role="tab" data-toggle="tab">O&D Based</a></li>
                    <li role="presentation"><a href="#Section5" aria-controls="messages" role="tab" data-toggle="tab">Leg Based</a></li>
                    <li role="presentation"><a href="#Section6" aria-controls="messages" role="tab" data-toggle="tab">Flights Based</a></li>
                  </ul>
                  <div className="tab-content tabs">
                    <div role="tabpanel" className="tab-pane fade in active" id="Section1">

                      <MUIDataTableComponent 
                        datatableClassName = {'regionTable'}
                        data = {this.state.routeRegiondatas} 
                        columns = {this.state.routeRegionColumn} 
                        options = {regionOptions} 
                        title = {this.state.tableTitle} 
                      />

                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section2">
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section3">
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section4">
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section5">
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section6">
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

      </div>

    );
  }
}

export default Routes
