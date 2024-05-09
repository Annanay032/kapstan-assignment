import { HistoryIcon } from "../../Icons/history";
import { OverviewIcon } from "../../Icons/overviewIcon";
import { EnvIcon } from "../../Icons/env";
import { AlertIcon } from "../../Icons/alert";
import { DotIcon } from "../../Icons/dot";

export const statusColorCode = (status) => {
  switch (status) {
    case "deployed":
    case "successful":
      return {
        border: "1px solid #00b88c",
        backgroundColor: " #f0fcf9",
        color: "#00b88c",
        label: "Successful",
      };

    case "failed":
    case "uninstalled":
      return {
        border: "1px solid #E91F04",
        backgroundColor: "#FEF4F2",
        color: "#E91F04",
        label: "Failed",
      };
    case "in_progress":
      return {
        border: "1px solid #F39C12",
        backgroundColor: "#FEF5E6",
        label: "In progress",
        color: "#F39C12",
      };
    default:
      return {
        border: "1px solid #00b88c",
        backgroundColor: " #f0fcf9",
        color: "#00b88c",
      };
  }
};

export const tabOptions = [
  {
    label: "Overview",
    key: "overview",
    icon: <OverviewIcon />,
  },
  {
    key: "envVariable",
    label: "Environment Variables",
    icon: <EnvIcon />,
  },
  {
    key: "alerts",
    label: <span>Alerts<span><DotIcon color='#E91F04' style={{marginBottom: '6px', marginLeft: '4px'}} width='6px' height='6px'/></span></span>,
    icon: <AlertIcon />,
  },
  {
    key: "event",
    label: "Event History",
    icon: <HistoryIcon />,
  },
];
