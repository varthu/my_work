import axios from 'axios';
import React from 'react'; 

const API_URL = 'http://localhost:8000';

export default class APIServices{
    constructor(){}

    getIndicators(){
        const url = `${API_URL}/rest/indicatorsflow/`;
        var dashboardIndicatorData = axios.get(url).then(function (response) {
            var dashboardIndicators = [];
            if(response.status === 200){
                response.data.forEach(function(key) {
                    dashboardIndicators.push({
                        "id_form": key.id_form,
                        "name": key.name,
                        "percentage": window.toperFixed(key.percentage),
                        "total": window.numberFormat(key.total, 2),
                    });
                });
            }
            return dashboardIndicators; // the response.data is string of src
        })
        .catch(function (response) {
            return ["dataError", "Connection Timeout"];
        });
        return dashboardIndicatorData;
    }

    getMOMRevenueMultilineChart(){
        const url = `${API_URL}/rest/momrevenuMultiline/`;
        return axios.get(url).then(response => response.data);
    }

    getMOMAvgFareMultilineChart(){
        const url = `${API_URL}/rest/momavgfareanalysisMultiline/`;
        return axios.get(url).then(response => response.data);
    }

    getRegionWisePerformPieChart(){
        const url = `${API_URL}/rest/regionwiseperform/`;
        return axios.get(url).then(response => response.data);
    }

    gettop5ODsBarChart(){
        const url = `${API_URL}/rest/topfiveodsbar/`;
        return axios.get(url).then(response => response.data);
    }

    getChannelWisePerformPivot(){
        const url = `${API_URL}/rest/channelwiseperform/`;

        var channelwiseperform = axios.get(url).then(function (response) {

            var columnName = ["Name", "CY Revenue", "LY Revenue", "VLY (%)"];
            var channelwiseperformDatas = [];
            response.data.forEach(function(key) {
            
                channelwiseperformDatas.push({
                    "Name": key.channel,
                    "CY Revenue": window.numberFormat(key.cy_revenue),
                    "LY Revenue": window.numberFormat(key.ly_revenue),
                    "VLY (%)": window.toperFixed(key.vly_revenue),
                });
    
            });

            return [{"columnName": columnName, "channelwiseperformtableDatas": channelwiseperformDatas}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return channelwiseperform;

    }
    gettop_10_routesPivot(){
        const url = `${API_URL}/rest/toptenroutespivot/`;

        var toptenroutespivot = axios.get(url).then(function (response) {
            
            var columnName = ["CommonRoute", "CY Revenue", "LY Revenue", "VLY (%)"];
            var toptenroutespivotDatas = [];
            response.data.forEach(function(key) {
            
                toptenroutespivotDatas.push({
                    "CommonRoute": key.commonroute,
                    "CY Revenue": window.numberFormat(key.cy_revenue),
                    "LY Revenue": window.numberFormat(key.ly_revenue),
                    "VLY (%)": window.toperFixed(key.vly_revenue),
                });
    
            });

            return [{"columnName": columnName, "toptenroutespivotDatas": toptenroutespivotDatas}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return toptenroutespivot;

    }

    getPOSMonthTables(){
        const url = `${API_URL}/rest/posMonthDetails/`;

        var posmonthtable = axios.get(url).then(function (response) {
            var columnName = ["Month","", "VLY_AvgFare(%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posmonthtableDatas = [];
            response.data.forEach(function(key) {

                var avgfaredata = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var bookingdata = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var flowpaxdata = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var flowrevdata = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";

                posmonthtableDatas.push({
                    "Month": key.MonthName,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal"><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare(%)": <span className="cabin_table_data" style={{ color: avgfaredata }} id="cabinModel" data-toggle='modal' data-target="#dataTableModal">{window.toperFixed(key.AvgFareVariance)} </span>,
                    "VLY_Bookings": <span style={{ color: bookingdata }}>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX": <span style={{ color: flowpaxdata }}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue": <span style={{ color: flowrevdata }}>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare": <span>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                    "Bookings": <span>{window.numberFormat(key.ODBookingPassengerCount, 2)}</span>,
                    "PAX": <span>{window.numberFormat(key.ODFlownPassengerCount, 2)}</span>,
                    "Revenue": <span>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posmonthtableDatas": posmonthtableDatas, "monthTableTitle": "Month on Month Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return posmonthtable;

    }

    getPOSRegionTables(gettingMonth, getCabinValue){
        const url = `${API_URL}/rest/posRegionDetails/`;

        var posregiontable = axios.get(url, {params: {gettingMonth: gettingMonth , getCabinValue: getCabinValue}}).then(function (response) {

            var columnName = ["RegionName","", "VLY_AvgFare(%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posRegiontableDatas = [];
            response.data.forEach(function(key) {
            
                var regvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var regvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var regvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var regvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posRegiontableDatas.push({
                    "RegionName": <span style={{ color: "#2a3f54e8"}}>{key.RegionName}</span>,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare(%)":   <span style={{ color: regvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                    "VLY_Bookings"  :   <span style={{ color: regvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX"       :   <span style={{ color: regvlyPax}}>{ window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue"   :   <span style={{ color: regvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare"       :   <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                    "Bookings"      :   <span style={{ color: "#2a3f54e8"}}>{ window.numberFormat(key.ODBookingPassengerCount, 2)}</span>,
                    "PAX"           :   <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownPassengerCount, 2)}</span>,
                    "Revenue"       :   <span style={{ color: "#2a3f54e8"}}>{ window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posRegiontableDatas, "tableTitle": "Region wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return posregiontable;
    }

    getPOSCountryDetails(gettingMonth, gettingRegion, getCabinValue){
        const url = `${API_URL}/rest/posCountryDetails/`;

        var posCountrytable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion: gettingRegion, getCabinValue: getCabinValue}}).then(function (response) {

            var columnName = ["CountryName","",  "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posCountrytableDatas = [];
            response.data.forEach(function(key) {

                var countryvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var countryvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var countryvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var countryvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posCountrytableDatas.push({
                    "CountryName"       : <span style={{ color: "#2a3f54e8"}}>{key.CountryName}</span>,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" ><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare (%)"   : <span style={{ color: countryvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                    "VLY_Bookings"      : <span style={{ color: countryvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX"           : <span style={{ color: countryvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue"       : <span style={{ color: countryvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                    "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                    "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                    "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posCountrytableDatas": posCountrytableDatas, "tableTitle": "Country wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return posCountrytable;
    }


    getPOSDetails(gettingMonth, gettingRegion, getCabinValue){
        const url =  `${API_URL}/rest/posPOSDataDetails/`;

        var posregiontable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion:gettingRegion, getCabinValue: getCabinValue }}).then(function (response) {

            var columnName = ["POS", "", "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posRegiontableDatas = [];
            response.data.forEach(function(key) {

                var posvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var posvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var posvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var posvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posRegiontableDatas.push({
                "POS"               : <span style={{ color: "#2a3f54e8"}}>{key.POS}</span>,
                "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                "VLY_AvgFare (%)"   : <span style={{ color: posvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: posvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: posvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: posvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODBookingPassengerCount, 2)}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownPassengerCount, 2)}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posRegiontableDatas, "tableTitle": "POS wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return posregiontable;
    }

    getPOSODDetails(gettingMonth, gettingRegion, getCabinValue){
        const url = `${API_URL}/rest/posODDetails/`;

        var odTable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion: gettingRegion, getCabinValue: getCabinValue}}).then(function (response) {
            
            var columnName = ["CommonOD", "" , "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posRegiontableDatas = [];
            response.data.forEach(function(key) {

                var odvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var odvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var odvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var odvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posRegiontableDatas.push({
                "CommonOD"          : <span style={{ color: "#2a3f54e8"}}>{key.CommonOD}</span>,
                "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                "VLY_AvgFare (%)"   : <span style={{ color: odvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: odvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: odvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: odvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posRegiontableDatas, "tableTitle": "O&D wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return odTable;
    }

      // get Month wise data of selected input(Country, O&D, Classes)
      getMonthWise(gettingRegion, inputLevel, getCabinValue){
        const url = `${API_URL}/rest/monthWiseDetails/`;

        var posmonthtable = axios.get(url, {params: {gettingRegion: gettingRegion, inputLevel: inputLevel, getCabinValue: getCabinValue}}).then(function (response) {
            var columnName = ["Month", "" , "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posmonthtableDatas = [];
            response.data.forEach(function(key) {

                var monthvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var monthvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var monthvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var monthvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";

                posmonthtableDatas.push({
                    "Month"             : <span style={{ color: "#2a3f54e8"}}>{key.MonthName}</span>,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare (%)"   : <span style={{ color: monthvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                    "VLY_Bookings"      : <span style={{ color: monthvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX"           : <span style={{ color: monthvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue"       : <span style={{ color: monthvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                    "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODBookingPassengerCount, 2)}</span>,
                    "PAX"               : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownPassengerCount, 2)}</span>,
                    "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });

            });

            return [{"columnName": columnName, "posmonthtableDatas": posmonthtableDatas, "monthTableTitle": "Month on Month Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });

        return posmonthtable;

    }

    getAgentDetails(gettingMonth,inputLevel,posFlowData, getCabinValue){
        const url = `${API_URL}/rest/agencyWiseDetails/`;

        var odTable = axios.get(url, {params: {gettingMonth: gettingMonth,inputLevel:inputLevel, posFlowData: posFlowData, getCabinValue: getCabinValue}}).then(function (response) {
            
            var columnName = ["Agent", "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posRegiontableDatas = [];
            response.data.forEach(function(key) {

                var agentvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var agentvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var agentvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var agentvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posRegiontableDatas.push({
                "Agent"             : <span style={{ color: "#2a3f54e8"}}>{key.CommonAgent}</span>,
                "VLY_AvgFare (%)"   : <span style={{ color: agentvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: agentvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: agentvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: agentvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posRegiontableDatas, "tableTitle": "Agent Wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return odTable;
    }

    getCabinDetails(gettingMonth, gettingRegion){
        const url = `${API_URL}/rest/cabinWiseDetails/`;

        var odTable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion: gettingRegion}}).then(function (response) {
            
            var columnName = ["Cabin", "", "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posRegiontableDatas = [];
            response.data.forEach(function(key) {

                var cabinvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var cabinvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var cabinvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var cabinvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8";
            
                posRegiontableDatas.push({
                "Cabin"             : <span style={{ color: "#2a3f54e8"}}>{key.CommonRBD}</span>,
                "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                "VLY_AvgFare (%)"   : <span style={{ color: cabinvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: cabinvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: cabinvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: cabinvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posRegiontableDatas, "tableTitle": "Agent Wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return odTable;
    }

    getODFlowTables(gettingMonth, gettingRegion, gettingRegionCode, getCabinValue){
        const url = `${API_URL}/rest/odFlowTableDetails/`;
        var odFlowTable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion: gettingRegion, gettingRegionCode: gettingRegionCode, getCabinValue: getCabinValue}}).then(function (response) {
            
            var columnName = ["OD", "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var odFlowTableDatas = [];
            response.data.forEach(function(key) {

                var odflowvlyAvgfare = key.AvgFareVariance          < 0 ? "red" : "#2a3f54e8";
                var odflowvlyBookings = key.BookingRevVariance      < 0 ? "red" : "#2a3f54e8";
                var odflowvlyPax = key.FlownPAXVariance             < 0 ? "red" : "#2a3f54e8";
                var odflowvlyRevenue = key.FlownRevVariance         < 0 ? "red" : "#2a3f54e8";                
            
                odFlowTableDatas.push({
                "OD"                : <span style={{ color: "#2a3f54e8"}}>{key.CommonOD}</span>,
                "VLY_AvgFare (%)"   : <span style={{ color: odflowvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: odflowvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: odflowvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: odflowvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": odFlowTableDatas, "tableTitle": "O & D Flow Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return odFlowTable;        
    }

    getPOSClassDetails(gettingMonth, gettingRegion, getCabinValue){
        const url = `${API_URL}/rest/posClassDetails/`;

        var odTable = axios.get(url, {params: {gettingMonth: gettingMonth, gettingRegion: gettingRegion, getCabinValue: getCabinValue}}).then(function (response) {
            
            var columnName = ["Cabin&Class", "" , "VLY_AvgFare (%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var posClasstableDatas = [];
            response.data.forEach(function(key) {

                var classvlyAvgfare = key.AvgFareVariance < 0 ? "red" : "#2a3f54e8";
                var classvlyBookings = key.BookingRevVariance < 0 ? "red" : "#2a3f54e8";
                var classvlyPax = key.FlownPAXVariance < 0 ? "red" : "#2a3f54e8";
                var classvlyRevenue = key.FlownRevVariance < 0 ? "red" : "#2a3f54e8"; 
            
                posClasstableDatas.push({
                "Cabin&Class"       : <span style={{ color: "#2a3f54e8"}}>{key.CommonClass}</span>,
                "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal" style={{ color: "#2a3f54e8"}}><i className="fa fa-bar-chart-o"></i></span>,
                "VLY_AvgFare (%)"   : <span style={{ color: classvlyAvgfare}}>{window.toperFixed(key.AvgFareVariance)}</span>,
                "VLY_Bookings"      : <span style={{ color: classvlyBookings}}>{window.toperFixed(key.BookingRevVariance)}</span>,
                "VLY_PAX"           : <span style={{ color: classvlyPax}}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                "VLY_Revenue"       : <span style={{ color: classvlyRevenue}}>{window.toperFixed(key.FlownRevVariance)}</span>,
                "AvgFare"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODAvgFare, 2)}</span>,
                "Bookings"          : <span style={{ color: "#2a3f54e8"}}>{key.ODBookingPassengerCount}</span>,
                "PAX"               : <span style={{ color: "#2a3f54e8"}}>{key.ODFlownPassengerCount}</span>,
                "Revenue"           : <span style={{ color: "#2a3f54e8"}}>{window.numberFormat(key.ODFlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "posregiontableDatas": posClasstableDatas, "tableTitle": "Cabin & Class wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return odTable;
    }

    getClassNameDetails(){
        const url = `${API_URL}/rest/getClassDetails/`;
        var classNameDetails = axios.get(url).then(function (response) {
            var posClasstableDatas = [];
            response.data.forEach(function(key) {
            
                posClasstableDatas.push({
                    "ClassText": key.CommonClass === null ? "All" : key.CommonClass,
                    "ClassValue": key.CommonClass === null ? "Null" : key.CommonClass,
                });
    
            });

            return [{"classDatas": posClasstableDatas}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });        
        return classNameDetails;
    }

    // Route Page API Data Processing
    getRouteMonthTables(){

        const url = `${API_URL}/rest/routeMonthDetails/`;

        console.log("Check API URL : ", url);

        var routemonthtable = axios.get(url).then(function (response) {

            console.log("Check Route Month Tables : ", response.data);

            var columnName = ["Month","", "VLY_AvgFare(%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue", "Ask", "Ask_VY", "Rask", "Rask_VY"];
            var routemonthtableDatas = [];
            response.data.forEach(function(key) {

                var currentMonth = "notcurrentMonthCSS";
                if(new Date().getMonth() + 1 === key.MonthNumber){
                    console.log("Details Month Name 1 : ", key.MonthNumber);
                    currentMonth = "currentMonthCSS";
                }

                routemonthtableDatas.push({
                    "Month": <span id={currentMonth}>{key.MonthName}</span>,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal"><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare(%)": <span className="cabin_table_data" id="cabinModel" data-toggle='modal' data-target="#dataTableModal">{window.toperFixed(key.AvgFareVariance)} </span>,
                    "VLY_Bookings": <span id={currentMonth}>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX": <span id={currentMonth}>{window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue": <span id={currentMonth}>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare": <span id={currentMonth}>{window.numberFormat(key.AvgFare, 2)}</span>,
                    "Bookings": <span id={currentMonth}>{window.numberFormat(key.BookingPassengerCount, 2)}</span>,
                    "PAX": <span id={currentMonth}>{window.numberFormat(key.FlownPassengerCount, 2)}</span>,
                    "Revenue": <span id={currentMonth}>{window.numberFormat(key.FlownRevenue, 2)}</span>,
                    "Ask": <span id={currentMonth}>{key.ASK}</span>,
                    "Ask_VY": <span id={currentMonth}>{key.ASK_VY}</span>,
                    "Rask": <span id={currentMonth}>{key.RASK}</span>,
                    "Rask_VY": <span id={currentMonth}>{key.RASK_VY}</span>,
                });
    
            });

            return [{"columnName": columnName, "routemonthtableDatas": routemonthtableDatas, "monthTableTitle": "Month on Month Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return routemonthtable;
    }

    getRouteRegionTables(gettingMonth, getCabinValue){
        const url = `${API_URL}/rest/routeRegionDetails/`;

        var routeregiontable = axios.get(url, {params: {gettingMonth: gettingMonth , getCabinValue: getCabinValue}}).then(function (response) {

            var columnName = ["RegionName","", "VLY_AvgFare(%)", "VLY_Bookings", "VLY_PAX", "VLY_Revenue", "AvgFare", "Bookings", "PAX", "Revenue"];
            var routeRegiontableDatas = [];

            response.data.forEach(function(key) {
            
                routeRegiontableDatas.push({
                    "RegionName": <span>{key.RegionName}</span>,
                    "":<span className="filter_table_data" id="chartModel" data-toggle='modal' data-target="#myModal"><i className="fa fa-bar-chart-o"></i></span>,
                    "VLY_AvgFare(%)": <span>{window.toperFixed(key.AvgFareVariance)}</span>,
                    "VLY_Bookings": <span>{window.toperFixed(key.BookingRevVariance)}</span>,
                    "VLY_PAX": <span>{window.toperFixed(key.FlownPAXVariance)}</span>,
                    "VLY_Revenue": <span>{window.toperFixed(key.FlownRevVariance)}</span>,
                    "AvgFare": <span>{window.numberFormat(key.AvgFare, 2)}</span>,
                    "Bookings": <span>{window.numberFormat(key.BookingPassengerCount, 2)}</span>,
                    "PAX": <span>{window.numberFormat(key.FlownPassengerCount, 2)}</span>,
                    "Revenue": <span>{window.numberFormat(key.FlownRevenue, 2)}</span>,
                });
    
            });

            return [{"columnName": columnName, "routeRegiontableDatas": routeRegiontableDatas, "tableTitle": "Region wise Performance"}]; // the response.data is string of src
        })
        .catch(function (response) {
            console.log(response);
        });
        
        return routeregiontable;
    }

}