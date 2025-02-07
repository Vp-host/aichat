export const encodeToBase64Url = (data) => {
  const jsonString = typeof data === "string" ? data : JSON.stringify(data);
  const base64 = btoa(jsonString);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const decodeFromBase64Url = (base64Url) => {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;
  if (padding === 2) {
    base64 += "==";
  } else if (padding === 3) {
    base64 += "=";
  }
  const decodedString = atob(base64);
  return JSON.parse(decodedString);
};
