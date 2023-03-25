import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

const getToken = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

api.interceptors.request.use((request) => {
  const accessToken = getToken("accessToken");
  if (accessToken) {
    console.log("accessToken gotten");
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

const refreshAccessToken = async (failedRequest) => {
  const refreshToken = getToken("refreshToken");

  if (!refreshToken) {
    console.log("No refresh token found");
    // Logout
    // window.location.href = "/login";

    return Promise.reject(failedRequest);
  }
  const response = await axios.post(`${API_ENDPOINT}/auth/refresh`, {
    skipAuthRefresh: true,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  if (response.status !== 200) {
    console.log("Refresh token failed");
  }
  await Promise.all([
    localStorage.setItem("accessToken", response.data.accessToken),
    localStorage.setItem("refreshToken", response.data.refreshToken),
  ]);
  failedRequest.response.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return Promise.resolve();
};

// createAuthRefreshInterceptor(api, refreshAccessToken, {
//   statusCodes: [401, 403],
// });

export default api;
