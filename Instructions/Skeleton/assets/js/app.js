// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
    };

    // Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".iframeContainer")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("./data.csv", function(error, obeseData) {

    // Throw an error if one occurs
    if (error) throw error;
    
    // Print the obeseData
    console.log(obeseData);

    // Format the date and cast the miles value to a number
    obeseData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });


    var xLinearScale = d3.scaleLinear()
        .range([chartWidth, 0])
        .domain([0, d3.max(obeseData, data => data.poverty)]);

    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(obeseData, data => data.obesity)]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    svg.selectAll("dot")
        .data(obeseData)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) {return xLinearScale(data.poverty);})
        .attr("cy", function(d) {return yLinearScale(data.obesity);});
    

    // Append an SVG group element to the SVG area, create the left axis inside of it
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);      

});