export function pingEquipamento() {
  var action = "action:\n\tfunc:\n\t\t\"PingServico\":\n\t\t\t\"Tomás\",";
  fetch("http://localhost:8000/", {
    method: "post",
    mode: "cors",
    body: action,
    headers: { "content-type": "text/plain" }
  });
  return true;
};
