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

export function getValidRecoveryUsername() {
  const stored = localStorage.getItem('recoveryUsername');
  if (!stored) return null;

  const { value, expiresAt } = JSON.parse(stored);
  const now = new Date().getTime();

  if (now > expiresAt) {
    localStorage.removeItem('recoveryUsername');
    return null;
  }

  return value;
}
