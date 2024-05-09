import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";

export default function BaseTabs({
  defaultValue,
  options,
  selectedTab,
  setSelectedTab,
  tabListStyles={},
  tabStyles={},
  selectedTabStyle={},
}) {
  return (
    <div>
      <Tabs
        defaultValue={defaultValue}
        value={selectedTab}
        onChange={(e, val) => setSelectedTab(val)}
        aria-label="Tabs where selection does not follow focus"
      >
        <TabsList style={{ ...tabListStyles }}>
          {options.map((opt) => (
            <Tab
              style={
                opt.key === selectedTab
                  ? { ...tabStyles, ...selectedTabStyle }
                  : { ...tabStyles }
              }
              value={opt.key}
            >
              {opt.icon || ""}
              {opt.label}
            </Tab>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

const Tab = styled(BaseTab)`
  cursor: pointer;
  background-color: transparent;
  width: auto;
  padding: 12px 12px 12px 0px;
  margin: 6px 6px 6px 0px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #595959;

  &.${tabClasses.selected} {
    font-weight: 700;
    color: #000000;
  }
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  width: fit-content;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
);
