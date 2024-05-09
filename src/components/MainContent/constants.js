const currentDate = new Date(); // Create a new Date object with the current date and time
const currentTimeStamp = currentDate.getTime();

export const initialEvnAddData = () => ({
  [currentTimeStamp]: { name: "", value: "" },
  [currentTimeStamp + 1]: { name: "", value: "" },
});
