export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";
}

export function getTimeDiffFromTimeStamp(timestamp, disableLastUpdate) {
  const currentTime = Date.now();

  // Convert the timestamp to milliseconds and calculate the difference
  const difference = currentTime - timestamp * 1000; // Multiply by 1000 to convert to milliseconds

  // Convert the difference to hours
  const hoursAgo = Math.floor(difference / (1000 * 60 * 60));

  // Generate the "last updated X hours ago" string
  const lastUpdatedString = disableLastUpdate ? `${hoursAgo} hours ago` : `Last updated ${hoursAgo} hours ago`;

  return lastUpdatedString;
}
