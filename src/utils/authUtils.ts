export function getValidAuthToken(): string | null {
  const token = localStorage.getItem("authToken");
  const expiration = localStorage.getItem("authTokenExpiration");

  if (!token || !expiration) return null;

  const now = new Date().getTime();
  if (now > parseInt(expiration)) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    return null;
  }

  return token;
}
