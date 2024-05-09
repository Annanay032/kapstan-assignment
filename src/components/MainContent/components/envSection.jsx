import React, { useCallback, useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { AddIcon } from "../../../Icons/add";
import { DownloadIcon } from "../../../Icons/download";
import Drawer from "@mui/material/Drawer";
import { CloseIcon } from "../../../Icons/close";
import { DeleteIcon } from "../../../Icons/delete";
import DragAndDropUpload from "../../Base/upload";
import { initialEvnAddData } from "../constants";
import "../style.css";

function EnvSection() {
  const [openDrawer, setOpenDrawer] = useState("");
  const [envData, setEnvData] = useState(
    JSON.parse(sessionStorage.getItem("envVariables")) || {}
  );
  const [envAddData, setEnvAddData] = useState(initialEvnAddData());

  useEffect(() => {
    sessionStorage.setItem("envVariables", JSON.stringify(envData));
  }, [envData]);

  const renderDrawerData = useMemo(() => {
    const addNewEntry = () => {
      const currentDate = new Date(); // Create a new Date object with the current date and time
      const currentTimeStamp = currentDate.getTime();
      const tempObj = JSON.parse(JSON.stringify(envAddData));
      tempObj[currentTimeStamp] = { name: "", value: "" };
      setEnvAddData(tempObj);
    };

    const deleteEntry = (key) => {
      const tempObj = JSON.parse(JSON.stringify(envAddData));
      delete tempObj[key];
      setEnvAddData(tempObj);
    };

    const handleValue = (e, key, type) => {
      const tempObj = JSON.parse(JSON.stringify(envAddData));
      tempObj[key][type] = e.target.value;
      setEnvAddData(tempObj);
    };

    const submitEntry = () => {
      const nonEmptyEnvAddData = {};

      Object.entries(envAddData)?.forEach(([key, data]) => {
        if (data.name && data.value) {
          const currentDate = new Date(); // Create a new Date object with the current date and time
          const currentTimeStamp = currentDate.getTime();
          nonEmptyEnvAddData[key + currentTimeStamp] = data;
        }
      });
      setEnvData({ ...envData, ...nonEmptyEnvAddData });
      setEnvAddData(initialEvnAddData());
      setOpenDrawer("");
    };

    if (openDrawer === "add") {
      return (
        <div style={{ width: "696px", minWidth: "696px" }}>
          <CloseIcon
            style={{ position: "absolute", right: "6px", marginTop: "4px" }}
            onClick={() => setOpenDrawer("")}
          />
          <div className="drawer-div">
            {Object.entries(envAddData).map(([val, envdata]) => {
              return (
                <div className="drawer-add-inputs">
                  <div className="drawer-fields">
                    <span>Name</span>
                    <input
                      className="drawer-input-text"
                      value={envdata.name}
                      onChange={(e) => handleValue(e, val, "name")}
                    ></input>
                  </div>
                  <div className="drawer-fields">
                    <span>Value</span>
                    <input
                      className="drawer-input-text"
                      value={envdata.value}
                      onChange={(e) => handleValue(e, val, "value")}
                    ></input>
                  </div>
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteEntry(val)}
                  />
                </div>
              );
            })}
            <Button
              variant="text"
              className="drawer-buttons-style"
              onClick={() => addNewEntry()}
              style={{
                color: "blue",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
              }}
            >
              + New Row
            </Button>
            <div className="drawer-buttons">
              <Button
                variant="outlined"
                className="drawer-buttons-style"
                onClick={() => setOpenDrawer("")}
                style={{
                  border: "1px solid #333333",
                  color: "#333333",
                  fontWeight: 700,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="drawer-buttons-style"
                onClick={() => submitEntry()}
                style={{ background: "#6E27D5", fontWeight: 700 }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }, [envAddData, envData, openDrawer]);

  const renderDragAndDrop = useMemo(() => {
    const handleUploadSubmit = (data) => {
      setEnvData({...envData ,...data});
      setOpenDrawer("");
    };
    return (
      <div style={{ width: "696px", minWidth: "696px" }}>
        <CloseIcon
          style={{ position: "absolute", right: "6px", marginTop: "4px" }}
          onClick={() => setOpenDrawer("")}
        />
        <DragAndDropUpload
          onSubmit={handleUploadSubmit}
          handleCancel={() => setOpenDrawer("")}
        />
        ;
      </div>
    );
  }, [envData]);

  const deleteEnvVariable = useCallback(
    (key) => {
      const tempObj = JSON.parse(JSON.stringify(envData));
      delete tempObj[key];
      setEnvData(tempObj);
    },
    [envData]
  );

  return (
    <div className="info-section">
      <div
        className="service-info"
        style={{ minHeight: "363px", height: "70vh", overflowY: 'auto' }}
      >
        <div
          className="service-info-label"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Environment variables{" "}
          <div>
            <Button
              variant="text"
              style={{ minWidth: "36px" }}
              onClick={() => setOpenDrawer("add")}
            >
              <AddIcon />
            </Button>
            <Button
              variant="text"
              style={{ minWidth: "36px" }}
              onClick={() => setOpenDrawer("download")}
            >
              <DownloadIcon />
            </Button>
          </div>
        </div>
        {Object.entries(envData)?.length ? (
          Object.entries(envData)?.map(
            ([key, data]) =>
              data?.name && (
                <div className="env-var-details" >
                  <span style={{ fontWeight: 700, color: "#333333" }}>
                    {data.name}{" "}
                  </span>
                  <span style={{ fontWeight: 500, color: "#595959" }}>
                    {" "}
                    {data.value}
                  </span>
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteEnvVariable(key)}
                  />
                </div>
              )
          )
        ) : (
          <span className="no-env-val">No environment variables created</span>
        )}
        <Drawer
          anchor="right"
          open={!!openDrawer}
          onClose={() => setOpenDrawer("")}
        >
          {openDrawer === "download" ? renderDragAndDrop : renderDrawerData}
        </Drawer>
      </div>
    </div>
  );
}

export default EnvSection;
