import { Connection } from "../../Icons/connections";
import { BackArrows } from "../../Icons/backArrows";
import { AdminIcon } from "../../Icons/admin";
import { DocsIcon } from "../../Icons/docs";
import { SecurityIcon } from "../../Icons/security";
import { PriceIcon } from "../../Icons/price";
import { ApplicationIcon } from "../../Icons/applications";
import { SecurityBeta } from "../../Icons/securityBeta";

export const sideBarMenu = [
  {
    menu: [
      { title: "Applications", icon: <ApplicationIcon />, hasDivider: true },
      { title: "Connections", icon: <Connection /> },
      { title: "Cost", icon: <PriceIcon /> },
      {
        title: "Security",
        icon: <SecurityIcon />,
        hasDivider: true,
        postFixIcon: <SecurityBeta style={{padding: '4px 8px 4px 8px', background: '#6E27D5'}} />
      },
    ],
    isBottom: false,
  },
  {
    menu: [
      { title: "Admin", icon: <AdminIcon /> },
      { title: "Docs", icon: <DocsIcon />, hasDivider: true },
      { title: "", icon: <BackArrows />, allowCollapse: true },
    ],
    isBottom: true,
  },
];
