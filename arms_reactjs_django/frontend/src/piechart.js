import React, { Component } from "react";
import APIServices from './apiservices';
import $ from 'jquery';
import * as d3 from 'd3';

const apiServices = new APIServices();

class Piechart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regionwiseperformpie: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        var self = this;
        apiServices.getRegionWisePerformPieChart().then((regionwiseperformpieChart) => {
            self.setState({ regionwiseperformpie: regionwiseperformpieChart ,isLoading: false})
            this.drawpieChart(regionwiseperformpieChart)
        });
    }
    
    drawpieChart(data) {
        var width = 315;
        var height = 280;
        var padding = 20;
        var opacity = .8;
        var opacityHover = 1;
        var otherOpacityOnHover = .8;
        var tooltipMargin = 13;

        var radius = Math.min(490 - padding, 280 - padding) / 2;
        // var color = d3.scale.category10()

        var colors = ['rgb(38, 185, 154)', '#3498db', 'rgb(66, 245, 152)', 'rgb(238, 210, 2)','rgb(242, 63, 132)'];

        // Do not include a domain
        var color = d3.scale.ordinal()
            .range(colors);
        // var color = d3.scale.category10();


        var svg = d3.select("#piechart")
            .append('svg')
        .attr('class', 'pie text-muted')
        .attr("viewBox", "25 0 "+(width)+" "+(height))
        .attr("preserveAspectRatio", "none")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .style("margin","0px")

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
            .innerRadius(radius-70)
            .outerRadius(radius);

        var pie = d3.layout.pie()
        .startAngle(1.1*Math.PI)
        .endAngle(3.1*Math.PI)
            .value(function(d) {
                return d.revenue;
            })

      var test =  g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
    
        test.transition()
            .delay(function(d,i) {
                return i ; })
            .duration(1000)
                    .attrTween('d', function(d) {
                        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                        return function(t) {
                            d.endAngle = i(t); 
                            return arc(d)
                            }
                        });
            test.style('opacity', opacity)
            .style('stroke', 'white')
            
            .on("mouseover", function(d) {
                d3.selectAll('path').style("opacity", otherOpacityOnHover);
                d3.select(this).style("opacity", opacityHover)
                    .transition().duration(500).ease('elastic')
                    .attr('transform', function(d) {
                        var dist = 10;
                        d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * dist;
                        var y = -Math.cos(d.midAngle) * dist;
                        return 'translate(' + x + ',' + y + ')';
                    });

                var total = d3.sum(data.map(function(d) {
                    return d.revenue;
                }));
                var percent = Math.round(1000 * d.data.revenue / total) / 10;

                let g = d3.select(".pie")
                    .style("cursor", "pointer")
                    .append("g")
                    .style("border-radius",'3px')
                    .attr("class", "tooltip_pie")
                    .style("opacity", 0)

                g.append("text")
                    .attr("class", "name-text")
                    .text(`${d.data.RegionName} (${percent}%)`)
                    .style('fill','white')
                    .attr('text-anchor', 'middle');

                let text = g.select("text");
                let bbox = text.node().getBBox();
                let padding = 10;
                g.insert("rect", "text")
                    .attr("x", bbox.x - padding)
                    .attr("y", bbox.y - padding)
                    .attr("width", bbox.width + (padding * 2))
                    .attr("height", bbox.height + (padding * 2))
                    .attr("fill", "#2A3F54")
                    .style("opacity", 0.75);
            })

            .on("mousemove", function(d) {
                d3.select('.tooltip_pie')
                    .style("opacity",1)
                    .attr('transform', `translate(${160}, ${135})`);
            })

            .on("mouseout", function(d) {
                d3.selectAll('path')
                    .style("opacity", opacity);

                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('transform', 'translate(0,0)')
                    d3.select(".pie")
                    .select(".tooltip_pie").remove();
            })
            .on("touchstart", function(d) {
                d3.select(".pie")
            })
            .each(function(d, i) {
                this._current = i;
            });

            

        let legend = d3.select(".legendpie").append('div')
            .attr('class', 'legend col-md-12')
            .style("padding-left", "20%")
            .style("padding-top", "20%")
            .style("font-family", '"Helvetica Neue",Roboto,Arial,"Droid Sans",sans-serif')
            .style("font-size", "13px")
            .style("font-weight", "400");

        let keys = legend.selectAll('.key')
            .data(data)
            .enter().append('div')
            .attr('class','key')
            .style('display','flex')
            .style('align-items','center')
            .style('padding-top','1%')
            .style('padding-bottom','1%');

        keys.append('div')
            .attr('class','symbol')
            .style('height','15px')
            .style('width','15px')
            .style('margin','5px 5px')
            .style('border-radius','3px')
            .style('background-color',(d, i) => color(i));

        keys.append('div')
            .attr('class', 'name')
            .style('width','50px')
            .style('margin-left','5px')
            .text(d => `${d.RegionName}`);

            var total = d3.sum(data.map(function(d) {
                return d.revenue;
            }));
            keys.append('div')
            .style('margin-left','20px')
            .style('width','50px')
            .style('text-align','left')
            .text(d => `${Math.round(1000 * d.revenue / total) / 10}%`);

}
    render() {
        return (
            <div>
            <div className="col-md-6 col-sm-6 col-xs-6 legendpie"> </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
               <div id="piechart" className="text-muted"></div>
            </div>
            </div>
        )
    }
}

export default Piechart;