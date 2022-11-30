export async function get(url: string) {
  return fetch(url).then(async (r) => r.json());
}
export async function post(url: string, body: object) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    // credentials: "same-origin", // Sends express-session credentials with request
  };
  return fetch(url, options).then((r) => {
    console.log("POST sent. Received:", r);
    return r.json();
  });
}
