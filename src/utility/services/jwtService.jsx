import axios from "axios";
import jwtDefaultConfig from "@configs/jwtConfig";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
// const API_ENDPOINT = "https://rhemar-backend.onrender.com";

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // ** For Refreshing Token
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    axios.defaults.baseURL = API_ENDPOINT;

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken();

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;

              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(this.axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        // ** if (error.message.includes('401')) {
        //   window.location.replace('/login');
        // }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    const token = localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    return token;
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    console.log("Here", args);
    return axios.post(`${this.jwtConfig.loginEndpoint}`, ...args);
  }

  register(...args) {
    console.log(...args);
    return axios.post(`${this.jwtConfig.registerEndpoint}`, ...args);
  }

  forgotPassword(...args) {
    return axios.post(`${this.jwtConfig.forgotPasswordEndpoint}`, ...args);
  }

  resetPassword(...args) {
    return axios.post(`${this.jwtConfig.resetPasswordEndpoint}`, ...args);
  }

  verifyEmail(...args) {
    return axios.post(`${this.jwtConfig.verifyEmailEndpoint}`, ...args);
  }

  refreshToken() {
    return axios.post(`${this.jwtConfig.refreshEndpoint}`, {
      refreshToken: this.getRefreshToken(),
    });
  }
}
