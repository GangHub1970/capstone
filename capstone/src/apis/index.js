export const conversion = () =>
  fetch("http://localhost:8080/api/execute-command")
    .then((response) => response.json())
    .then((data) => data.contents);
