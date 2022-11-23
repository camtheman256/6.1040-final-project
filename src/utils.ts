export async function get(url: string) {
  console.log("GET url provided:", url);
  return fetch(url).then(async (r) => r.json());
}
export async function post(url: string, body: object) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    // credentials: "same-origin", // Sends express-session credentials with request
  };
  await fetch(url, options);
  console.log("POST sent to url:", url);
}
