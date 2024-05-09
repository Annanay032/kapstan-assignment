import React, { useState, useRef } from "react";
import "./dragAndDropUpload.css"; // CSS file for styling
import { UploadIcon } from "../../Icons/upload";
import Button from "@mui/material/Button";
import { DeleteIcon } from "../../Icons/delete";

function DragAndDropUpload({ onSubmit, handleCancel }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadData, setUploadData] = useState({});
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // No need to spread `e.target.files` here, it's already an array-like object
    // Call `uploadFile` for each file
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i]);
    }
  };

  const uploadFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      handleEnvContent(fileContent);
    };

    reader.readAsText(file);
  };

  const handleUploadIconClick = () => {
    // Trigger the click event of the file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEnvContent = (content) => {
    // Process the content of the .env file here
    // Example: Parse the content
    const envData = parseEnvFile(content);
    const storingEnvData = {};
    Object.keys(envData)?.forEach((evd) => {
      const currentDate = new Date(); // Create a new Date object with the current date and time
      const currentTimeStamp = currentDate.getTime();
      storingEnvData[currentTimeStamp + evd] = {
        name: evd,
        value: envData[evd],
      };
    });
    setUploadData({ ...storingEnvData });
  };

  const parseEnvFile = (content) => {
    // Parsing logic to extract key-value pairs
    const lines = content.split("\n");
    const envData = {};

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...valueParts] = trimmedLine.split("=");
        const value = valueParts.join("=").trim();
        envData[key] = value;
      }
    });

    return envData;
  };

  const deleteEnvVariable = (key) => {
    const tempObj = { ...uploadData };
    delete tempObj[key];
    setUploadData(tempObj);
  };

  return (
    <div className="drag-div">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files, e)}
      />
      <div
        className={`drop-area ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadIconClick}
      >
        <UploadIcon width="auto" />
        <span className="upload-text">
          Click or drag file(s) here to upload
        </span>
      </div>
      <span className="upload-info">
        Upload a .env file. It should not be greater than 5KB.
      </span>
      <div>
        {Object.entries(uploadData)?.map(
          ([key, data]) =>
            data?.name && (
              <div className="env-var-details">
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
        )}
      </div>
      <div className="drawer-buttons">
        <Button
          variant="outlined"
          className="drawer-buttons-style"
          onClick={() => {
            handleCancel();
            setUploadData({});
          }}
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
          onClick={() => {
            onSubmit(uploadData);
            setUploadData({});
          }}
          style={{ background: "#6E27D5", fontWeight: 700 }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default DragAndDropUpload;
