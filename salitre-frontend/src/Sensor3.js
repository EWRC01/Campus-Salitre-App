import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
const testDate = `2023-10-12`;

const Sensor3 = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Fetch sensor data from your Node.js API
    axios.get('http://localhost:5000/api/sensor-data/' + testDate).then((response) => {
      setSensorData(response.data);
      console.log(formattedDate);
    });
  }, []);

  useEffect(() => {
    // Create the D3 chart when sensorData updates
    createChart(sensorData);
  }, [sensorData]);

  const createChart = (data) => {
    // Remove existing chart
    d3.select('#sensor-chart3').selectAll('*').remove();

    // Define your chart dimensions
    const width = 550;
    const height = 300;
    const margin = { top: 50, right: 20, bottom: 40, left: 80 };

    const svg = d3.select('#sensor-chart3').append('svg')
      .attr('width', width)
      .attr('height', height);

    // Extract the name of the sensor
    const sensorName = data[0] ? data[0].Sensor_Name : '';

    // Extract the last 10 records
    const last10Data = data.slice(0, 10);

    // Extract the unique hours for the bottom axis
    const uniqueHours = [...new Set(last10Data.map(entry => entry.Hour))];

    // Define the gap between bars
    const barGap = 5;

    // Update the xScale to include the gap
    const xScale = d3
      .scaleBand()
      .domain(uniqueHours)
      .range([margin.left, width - margin.right])
      .paddingInner(0.1) // Adjust the inner padding
      .paddingOuter(0.1); // Adjust the outer padding

    // Create scales for y (temperature)
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(last10Data, entry => entry.Crop_Moisture)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add the sensor name on top
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 4)
      .attr('text-anchor', 'first')
      .style("font-size", "10px")
      .text(sensorName);

        // Add the date on the right side of the chart
    svg.append('text')
    .attr('x', width - margin.right) // Position on the right side
    .attr('y', margin.top / 4) // Adjust the y position to move it up
    .attr('text-anchor', 'end') // Align text to the end (right)
    .style("font-size", "8px")
    .text(formattedDate); // Display the date

   // Define line generator function.
   var lineGenerator = d3.line()
     .x((entry) => xScale(entry.Hour))
     .y((entry) => yScale(entry.Crop_Moisture));

   svg.append("path")
     .datum(last10Data)
     .attr("d", lineGenerator)
     .attr("fill", "none")
     .attr("stroke", "steelblue");

   svg.selectAll("circle")
     .data(last10Data)
     .enter()
     .append("circle")
     .attr("cx", (entry) => xScale(entry.Hour))
     .attr("cy", (entry) => yScale(entry.Crop_Moisture))
     .attr("r", 5)
     .attr("fill", "steelblue");

   svg.selectAll(".text")
     .data(last10Data)
     .enter()
     .append("text")
     .attr("x", (entry) => xScale(entry.Hour))
     .attr("y", (entry) => yScale(entry.Crop_Moisture) - 10)
     .text((entry) => entry.Crop_Moisture.toFixed(2))
     .style("font-size", "7px")
     .style("fill", "#333");

   svg.append('g')
     .attr('transform', `translate(0, ${height - margin.bottom})`)
     .call(d3.axisBottom(xScale).tickSize(0));

   svg.append('g')
     .attr('transform', `translate(${margin.left}, 0)`)
     .call(d3.axisLeft(yScale));

   // Add label to the y-axis
   svg.append('text')
     .attr('x', -height / 2)
     .attr('y', margin.left / 3)
     .attr('transform', 'rotate(-90)')
     .style("font-size", "12px")
     .attr('text-anchor', 'middle')
     .text('Humedad del suelo');
  };

  return (
    <div id="sensor-chart3">
    
    </div>

    
  );
};

export default Sensor3;

