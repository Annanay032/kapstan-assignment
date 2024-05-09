import React, { useEffect, useState } from "react";
import { getTimeDiffFromTimeStamp } from "../../../globalUtils";
import { DotIcon } from "../../../Icons/dot";
import ReactDOMServer from "react-dom/server";
import "../style.css";
import { statusColorCode } from "../utils";

function EventHistory() {
  const [eventHistoryData, setEventHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://retoolapi.dev/TYjDIe/eventhistory");
      const data = await response.json();
      setEventHistoryData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Generate HTML table
    const eventHistory = eventHistoryData.map((dt) => {

        const statusCodeData = statusColorCode(dt?.status)
        return ({
      ...dt,
      status: ReactDOMServer.renderToString(
        <div
            className="tab-section-status"
            style={{
              border: statusCodeData.border,
              backgroundColor: statusCodeData.backgroundColor,
              gap:'10px',
              justifyContent:'flex-start'
            }}
          >
            <DotIcon color={statusCodeData.color} />
            <span
              className="tab-section-status-label"
              style={{ color: statusCodeData.color }}
            >
              {statusCodeData.label}
            </span>
          </div>
      ),
    })});
    const tableHtml = `<table id="dataTable">
    <thead>
        <tr>
            <th>Event</th>
            <th>Version</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        ${eventHistory
          .map(
            (row) => `<tr>
            <td><span>${row.event}<span>${getTimeDiffFromTimeStamp(
              row.timestamp,
              true
            )}</span></span></td>
            <td>${row.version}</td>
            <td>${row.status}</td>
        </tr>`
          )
          .join("")}
    </tbody>
</table>`;

    // Set the HTML table content in the container
    document.getElementById("eventContainer").innerHTML = tableHtml;
  }, [eventHistoryData]);

  return <div id="eventContainer"></div>;
}

export default EventHistory;
