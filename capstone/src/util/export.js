const downloadData = (title, data) => {
  const element = document.createElement("a");
  const type = typeof data === "string" ? "text/plain" : "audio/wav";
  const file = new Blob([data], {
    type,
  });
  element.href = URL.createObjectURL(file);
  element.download = title;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default downloadData;
