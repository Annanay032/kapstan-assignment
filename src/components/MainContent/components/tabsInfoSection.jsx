import React, { useState } from "react";
import "../style.css";
import { SuccessIcon } from "../../../Icons/success";
import CancelIcon from "@mui/icons-material/Cancel";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { getTimeDiffFromTimeStamp } from "../../../globalUtils";
import GraphSection from "./graphSection";
import BaseTabs from "../../Base/tabs";
import EventHistory from "./eventHistory";

const StyleButton = styled(Button)({
  width: "96px",
  height: "36px",
  padding: "8px 24px 8px 24px",
  borderRadius: "4px",
  background: "#6e27d5",
  color: "#595959",
});

const TabsInfoSection = ({ selectedApplicationData, applicationsData }) => {
  const tabOptions = [
    { key: "cpu", label: "CPU", yAxis: "CPU Utilization (%)" },
    { key: "memory", label: "Memory", yAxis: "Memory" },
  ];

  const [selectedTab, setSelectedTab] = useState(tabOptions[0].key);

  const isInSync =
    selectedApplicationData &&
    selectedApplicationData.desiredVersion === selectedApplicationData.version;

  const selectedTabApiMap = {
    cpu: "https://retoolapi.dev/Ymxfa2/cpuutilization",
    memory: "https://retoolapi.dev/ybFVVH/memoryutilization",
  };

  const sellectTabOptionsData = tabOptions.find((tb) => tb.key === selectedTab);

  return (
    <div className="info-section">
      <div className="service-info">
        <span className="service-info-label">Service info</span>
        <div className="service-info-details">
          <div className="current-version">
            <span className="current-version-label">Current Version</span>
            <div className="version-status">
              {isInSync ? (
                <SuccessIcon />
              ) : (
                <CancelIcon
                  style={{ color: "red", width: "1.2rem", height: "1.2rem" }}
                />
              )}
              <span className="version-status-label">
                {isInSync ? "In sync" : "Not in Sync"}
              </span>
            </div>
          </div>
          <div className="current-version">
            <span className="current-version-label">Desired Version</span>
            <span className="version-status-label">
              {selectedApplicationData?.desiredVersion}
            </span>
          </div>
        </div>
        <div className="deploy-data">
          <StyleButton variant="outlined">
            <span className="deploy-text">Deploy</span>
          </StyleButton>
          <span className="time-stamp">
            {selectedApplicationData?.updatedAt
              ? getTimeDiffFromTimeStamp(selectedApplicationData?.updatedAt)
              : ""}
          </span>
        </div>
      </div>
      <div className="other-info">
        <div className="system-matrics">
          <span className="system-matrics-label">System metrics</span>
          <BaseTabs
            defaultValue={tabOptions[0]?.key}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            options={tabOptions}
            tabListStyles={{
              width: "100%",
              justifyContent: "space-around",
              gap: "0px",
              marginBottom: "12px",
            }}
            tabStyles={{
              width: "100%",
              borderBottom: "1px solid",
              margin: "0px",
              padding: "8px",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "-0.01em",
              textAlign: "center",
              color: "#595959",
            }}
            selectedTabStyle={{
              color: "#6E27D5",
              borderBottom: "2.5px solid #6E27D5",
              fontWeight: 700,
            }}
          />
          <GraphSection
            applicationsData={applicationsData}
            selectedTabApi={selectedTabApiMap[selectedTab]}
            sellectTabOptionsData={sellectTabOptionsData}
          />
        </div>
        <div className="system-matrics">
          <span className="event-div">Event history</span>
          <EventHistory />
        </div>
      </div>
    </div>
  );
}

export default TabsInfoSection;
