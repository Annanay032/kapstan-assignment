import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";

function GraphSection({
  applicationsData,
  selectedTabApi,
  sellectTabOptionsData,
}) {
  const [memoryUtilizationData, setMemoryUtilizationData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(selectedTabApi);
      const data = await response.json();
      setMemoryUtilizationData(data);
    };
    fetchData();
  }, [selectedTabApi]);

  useEffect(() => {
    // Parse string timestamps to numbers
    memoryUtilizationData.forEach((data) => {
      data.timestamp = parseInt(data.timestamp);
      data.memoryUtilization = parseFloat(data.memoryUtilization);
      data.cpuUtilization = parseFloat(data.cpuUtilization);
      data.name = applicationsData.find(
        (item) => item.id === +data.applicationId
      )?.name;
    });
    //System metrics
    // Create the chart
    Highcharts.chart("container", {
      title: {
        text: sellectTabOptionsData?.yAxis || "",
        align: "left",
        style: {
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          letterSpacing: "-0.01em",
          textAlign: "left",
          color: "#333333",
        },
      },
      yAxis: {
        title: {
          text: "",
        },
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          hour: "%I %p", // Display hours in AM/PM format
        },
      },
      legend: {
        layout: "horizontal",
        align: "left",
        verticalAlign: "bottom",
      },
      series: memoryUtilizationData.reduce((acc, data) => {
        // Check if series already exists for this applicationId
        let series = acc.find((series) => series.name === data.name);
        if (!series) {
          series = {
            name: data.name,
            data: [],
          };
          acc.push(series);
        }
        series.marker = {
          enabled: false, // Disable markers for this series
        };
        // Add data point to the series
        series.data.push([
          data.timestamp * 1000,
          data.memoryUtilization || data.cpuUtilization,
        ]);
        return acc;
      }, []),
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }, [memoryUtilizationData, applicationsData, sellectTabOptionsData?.yAxis]);

  return <div id="container"></div>;
}

export default GraphSection;
