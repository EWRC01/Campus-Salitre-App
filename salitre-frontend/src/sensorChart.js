import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
const testDate = `2023-10-12`;

const SensorChart = () => {
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
    d3.select('#sensor-chart').selectAll('*').remove();

    // Define your chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 50, right: 20, bottom: 40, left: 80 };

    const svg = d3.select('#sensor-chart').append('svg')
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
      .domain([0, d3.max(last10Data, entry => entry.Relative_Temperature_Crop)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add the sensor name on top
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 4)
      .attr('text-anchor', 'middle')
      .text(sensorName);

        // Add the date on the right side of the chart
    svg.append('text')
    .attr('x', width - margin.right) // Position on the right side
    .attr('y', margin.top / 4) // Adjust the y position to move it up
    .attr('text-anchor', 'end') // Align text to the end (right)
    .text(formattedDate); // Display the date


    // Draw the rectangles for temperature data with gaps
    svg
      .selectAll('rect')
      .data(last10Data)
      .enter()
      .append('rect')
      .attr('x', (entry) => xScale(entry.Hour))
      .attr('y', (entry) => yScale(entry.Relative_Temperature_Crop))
      .attr('width', xScale.bandwidth() - barGap) // Reduce width by the gap
      .attr('height', (entry) => height - margin.bottom - yScale(entry.Relative_Temperature_Crop))
      .attr('fill', 'steelblue');

    // Add data values on top of each bar
    svg
      .selectAll('text')
      .data(last10Data)
      .enter()
      .append('text')
      .attr('x', (entry) => xScale(entry.Hour) + xScale.bandwidth() / 2)
      .attr('y', (entry) => yScale(entry.Relative_Temperature_Crop) - 10) // Adjust the y position for labels
      .attr('text-anchor', 'middle')
      .text((entry) => entry.Relative_Temperature_Crop.toFixed(2)); // Display the temperature data on top of the bar

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0));

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add label to the y-axis
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', margin.left / 3)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Relative Temperature');
  };

  

  return (
    <div id="sensor-chart">
      {/* Chart will be displayed here */}
    </div>
  );
};

export default SensorChart;
