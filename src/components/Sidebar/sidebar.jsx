import React, { useMemo, useState } from "react";
import styles from "./sidebar.module.css";
import { Divider } from "@mui/material";
import { Logo } from "../../Icons/logo";
import { sideBarMenu } from "./utils";

const Sidebar = () => {
  const [collapsed, setCollapse] = useState(false);
  const renderMenu = useMemo(() => {
    return (
      <div className={styles.renderList}>
        {sideBarMenu.map(({ menu, isBottom }) => (
          <ul
            className={styles.list}
            style={isBottom ? { position: "absolute", bottom: "0px" } : {}}
          >
            {menu?.map((cat) => (
              <li key={cat.title}>
                <div
                  className={styles.cat}
                  style={cat.bottom ? { marginTop: "100%" } : {}}
                  onClick={() => cat.allowCollapse && setCollapse(prev => !prev)}
                >
                  {cat.icon}
                  {!collapsed && <span>{cat.title}</span>}
                </div>
                {cat.hasDivider && (
                  <Divider
                    className={styles.divider}
                    style={{
                      width: isBottom ? (collapsed ? "40%" : "115%") : "auto",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }, [collapsed]);

  return (
    <div className={collapsed ? styles.sidebarclosed : styles.sidebaropen}>
      <div>
        <div
          className={styles.kapstanlogo}
          onClick={() => setCollapse((prev) => !prev)}
        >
          <Logo />{" "}
          {!collapsed && (
            <span className={styles.kapstanlogoname}>KAPSTAN</span>
          )}
        </div>
        <Divider className={styles.divider}></Divider>
        {renderMenu}
      </div>
    </div>
  );
};

export default Sidebar;
