import React, { Component } from "react";
import APIServices from './apiservices';
import * as d3 from "d3";
import './bar.css';
import d3Tip from "d3-tip";
import Loader from 'react-loader-spinner';

const apiServices = new APIServices();

class TopFiveODs extends Component {
  constructor(props) {
    super();
    this.state = { 
        topfiveODsData: [],
        isLoading: true,
    };
  }

  componentDidMount() {
    apiServices.gettop5ODsBarChart().then((top5ODsBarChart) => {
      this.setState({ topfiveODsData: top5ODsBarChart ,isLoading: false});
      this.barchart(this.state.topfiveODsData);
    });
  }

  barchart(data) {
    // set the dimensions of the canvas
    var margin = {
            top: 10,
            right: 30,
            bottom: 23,
            left: 85
        },
        width =  630 - margin.left - margin.right,
        height = 260 - margin.top - margin.bottom;


    var tip = d3Tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
        return "<span style='color:white'>" + window.numberFormat(d.CYRevenue) + "</span>";
    });

    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(6)
        .tickFormat(d3.format("s"))
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);

    var svg = d3.select("#top5o_ds_barChart").append("svg")
        .attr("viewBox", "0 0 "+( width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
        .attr("preserveAspectRatio", "none")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function(d) {
        d.CYRevenue = +d.CYRevenue;
    });

    svg.call(tip)

    x.domain(data.map(function(d) {
        return d.CommonRoute;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.CYRevenue;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("fill","#73879c")
        .style("text-anchor", "end")
        .attr("dx", "0em")
        .attr("dy", "-.55em")
        .attr("x", -4)
        .attr("y", 20)
        

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 1)
        .attr("x", -66)
        .attr("dx", "1em")
        .attr("dy", "-4em")
        .style("text-anchor", "end")
        .style("font-family", '"Helvetica Neue",Roboto,Arial,"Droid Sans",sans-serif')
        .style("font-size", "14px")
        .style("font-weight", "500")
        .attr("fill","#73879c")
        .text("CYRevenueuency");

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("cursor", "pointer")
        .attr("x", function(d) {
            return x(d.CommonRoute);
        })
        .attr("width", x.rangeBand()-70)
        .attr("height", function(d) {
            return y(d.CYRevenue);
        })
        .attr("y", function(d) {
            return height - y(d.CYRevenue);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .transition()
        .attr('y', function(d) {
            return y(d.CYRevenue);
        })
        .attr('height', function(d) {
            return height - y(d.CYRevenue);
        })
        .delay(750)
        .duration(2000)
}

  render() {
    return (      
        this.state.isLoading ? <div className="loader"> <Loader
    type="Bars"
    color="#00BFFF"
    height="100"
        width="100"
     /></div>   : <div id="top5o_ds_barChart"></div>
        
    )
  }
}

export default TopFiveODs;
