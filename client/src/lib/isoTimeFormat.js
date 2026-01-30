const isTimeFormat = (dateTime) => {
  if (!dateTime) return "";

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default isTimeFormat;
