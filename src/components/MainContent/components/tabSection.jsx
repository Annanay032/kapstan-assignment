import React from "react";
import { VerticalDots } from "../../../Icons/threeDots";
import { DotIcon } from "../../../Icons/dot";
import { capitalize } from "../../../globalUtils";
import { statusColorCode, tabOptions } from "../utils";
import BaseTabs from "../../Base/tabs";
import "../style.css";

function TabSection({ selectedApplicationData, selectedTab, setSelectedTab }) {
  const statusCodesForStyle = statusColorCode(selectedApplicationData?.status);

  return (
    <div className="tab-section">
      <div className="tab-section-heading">
        <span className="tab-section-label">
          {selectedApplicationData?.name}
        </span>
        <div className="tab-section-right">
          <div
            className="tab-section-status"
            style={{
              border: statusCodesForStyle.border,
              backgroundColor: statusCodesForStyle.backgroundColor,
            }}
          >
            <DotIcon color={statusCodesForStyle.color} />
            <span
              className="tab-section-status-label"
              style={{ color: statusCodesForStyle.color }}
            >
              {capitalize(selectedApplicationData?.status)}
            </span>
          </div>
          <VerticalDots />
        </div>
      </div>

      <BaseTabs
        defaultValue={tabOptions[0]?.key}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        options={tabOptions}
      />
      
    </div>
  );
}

export default TabSection;
