import { useUserStore } from "@/stores/user.store";
import BaseController from "./baseController";

export default class AuthService {
	userStore = useUserStore()
  urlBase = "/login";

  constructor() {
    this.base = new BaseController(this.userStore);
  }

  static refreshingTokens = false;
  static refreshTokensPromise = null;

	async getCurrentUser() {
		return await this.base._get(`${this.urlBase}/me`).then((res) => {
			return res.body
		});
	}

  async register(data) {
		return await this.base._post(`${this.urlBase}/register`, data)
  }

  async login(data) {
    return this.base._post(`${this.urlBase}/auth`, data, true);
  }

  async logout() {
    const tokens = JSON.parse(localStorage.getItem("token"));
    const body = {
      refreshToken: tokens.refresh.token,
    };
    const response = await this.base._post(`${this.urlBase}/logout`, body);
    if (response.status === 204) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
    }
    return response;
  }

  async refreshTokens() {
		const token = localStorage.getItem("refresh-token");
    return this.base._post(`${this.urlBase}/refresh-tokens`, { refreshToken: token });
  }

  async forgotPassword(body) {
    return this.base._post(`${this.urlBase}/forgot-password`, body);
  }

  async resetPassword(token, body) {
    return this.base._post(
      `${this.urlBase}/reset-password?token=${token}`,
      body
    );
  }

  async sendVerificationEmail() {
    return this.base._post(`${this.urlBase}/send-verification-email`);
  }

  async verifyEmail(token) {
    return this.base._post(`${this.urlBase}/verify-email?token=${token}`);
  }

  async setUserLocalStorage(data) {
    try {
			this.userStore.setUser(data)
    } catch (err) {
      throw new Error(err);
    }
  }
}
