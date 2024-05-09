import { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar/navbar";
import TabSection from "./components/tabSection";
import "./style.css";
import { tabOptions } from "./utils";
import TabsInfoSection from "./components/tabsInfoSection";
import EnvSection from "./components/envSection";
import UserInfo from "./components/userInfo";


const MainContent = () => {
  const [applicationsData, setApplicationsData] = useState([]);
  const [selectedApplicationsId, setSelectedApplicationsId] = useState();
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]?.key);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://retoolapi.dev/71NNjB/applications");
      const data = await response.json();
      setApplicationsData(data);
      setSelectedApplicationsId(data[0].id);
    };
    fetchData();
  }, []);

  const selectedApplicationData = useMemo(
    () => applicationsData?.find((data) => data.id === selectedApplicationsId),
    [applicationsData, selectedApplicationsId]
  );

  return (
    <div className="main-container">
      <div className="navbar-container">
        <Navbar
          applicationsData={applicationsData}
          selectedApplicationsId={selectedApplicationsId}
          setSelectedApplicationsId={setSelectedApplicationsId}
        />
        <div className="user">
          <UserInfo/>
        </div>
      </div>
      <div className="info-container">
        <TabSection
          selectedApplicationData={selectedApplicationData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "overview" && (
          <TabsInfoSection
            selectedApplicationData={selectedApplicationData}
            applicationsData={applicationsData}
          />
        )}
        {selectedTab === "envVariable" && (
          <EnvSection
            selectedApplicationData={selectedApplicationData}
            applicationsData={applicationsData}
          />
        )}
      </div>
    </div>
  );
};

export default MainContent;
