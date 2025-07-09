import { API_URL } from "@/config";
import qs from "qs"; // Certifique-se de instalar via `npm install qs`

export class BaseController {
  static refreshingTokens = false;
  static refreshTokensPromise = null;

  constructor(userStore) {
    this.UserStore = userStore;
    this.url = API_URL;
  }

  urlFull(uri) {
    return `${this.url}${uri}`;
  }

  getHeaders(isForm = false) {
    const headers = {
      Accept: "application/json",
    };

    if (isForm) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async _sendRequest(uri, method, body = null, retry = null, isForm = false) {
    const url = this.urlFull(uri);
    const options = {
      method,
      headers: this.getHeaders(isForm),
    };

    if (body && !["GET", "HEAD"].includes(method)) {
      options.body = isForm ? qs.stringify(body) : JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const error = new Error("HTTP Error");
        error.response = response;
        throw error;
      }

      const bodyText = await response.text();
      const json = bodyText ? JSON.parse(bodyText) : {};

      return {
        body: json,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const retryInfo = retry || [uri, method, body, isForm];

      if (error.response) {
        const response = error.response;
        const bodyText = await response.text();
        const json = bodyText ? JSON.parse(bodyText) : {};

        if (
          json?.message === "Please authenticate" &&
          uri !== "/auth/refresh-tokens"
        ) {
          if (!BaseController.refreshingTokens) {
            BaseController.refreshTokensPromise = this.refreshTokens();
            BaseController.refreshingTokens = true;
          }

          await BaseController.refreshTokensPromise;
          BaseController.refreshingTokens = false;

          return await this._sendRequest(
            retryInfo[0],
            retryInfo[1],
            retryInfo[2],
            retryInfo,
            retryInfo[3]
          );
        }

        throw {
          body: json,
          status: response.status,
          statusText: response.statusText,
        };
      }

      console.error("Erro inesperado:", error);
      throw error;
    }
  }

  async _get(uri) {
    return this._sendRequest(uri, "GET");
  }

  async _post(uri, body, isForm = false) {
		return this._sendRequest(uri, "POST", body, null, isForm);
	}
  async _delete(uri, body) {
    return this._sendRequest(uri, "DELETE", body);
  }

  async _put(uri, body) {
    return this._sendRequest(uri, "PUT", body);
  }

  async _patch(uri, body) {
    return this._sendRequest(uri, "PATCH", body);
  }

  async refreshTokens() {
    try {
      const token = localStorage.getItem("refresh-token");
      if (!token) return;

      const response = await this._post("/auth/refresh-tokens", { token });

      if (response?.body?.tokens) {
        this.UserStore.setToken(response.body.tokens);
      }

      return response;
    } catch (error) {
      if (error.body?.message === "Please authenticate") {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      throw error;
    }
  }
}

export default BaseController;
