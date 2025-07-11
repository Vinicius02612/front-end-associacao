import { useUserStore } from "@/stores/user.store";
import BaseController from "./baseController";

export default class AuthService {
	userStore = useUserStore()
  urlBase = "/auth/";

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
		return await this.base._post(`${this.urlBase}register`, data)
  }

  async login(data) {
    console.log('Dados de login enviados:', data);
    
    // Teste 1: JSON para /auth/login
    try {
      console.log('Teste 1: JSON para /auth/login');
      const response = await this.base._post('/auth/login', data, false);
      console.log('Sucesso com JSON para /auth/login');
      return response;
    } catch (error) {
      console.log('Erro com JSON para /auth/login:', error.status, error.statusText);
    }
    
    // Teste 2: Form-urlencoded para /auth/login
    try {
      console.log('Teste 2: Form-urlencoded para /auth/login');
      const response = await this.base._post('/auth/login', data, true);
      console.log('Sucesso com form-urlencoded para /auth/login');
      return response;
    } catch (error) {
      console.log('Erro com form-urlencoded para /auth/login:', error.status, error.statusText);
    }
    
    // Teste 3: JSON para /login/auth
    try {
      console.log('Teste 3: JSON para /login/auth');
      const response = await this.base._post('/login/auth', data, false);
      console.log('Sucesso com JSON para /login/auth');
      return response;
    } catch (error) {
      console.log('Erro com JSON para /login/auth:', error.status, error.statusText);
    }
    
    // Teste 4: Form-urlencoded para /login/auth
    try {
      console.log('Teste 4: Form-urlencoded para /login/auth');
      const response = await this.base._post('/login/auth', data, true);
      console.log('Sucesso com form-urlencoded para /login/auth');
      return response;
    } catch (error) {
      console.log('Erro com form-urlencoded para /login/auth:', error.status, error.statusText);
      throw error; // Lança o último erro se todos falharem
    }
  }

  async logout() {
    const tokens = JSON.parse(localStorage.getItem("token"));
    const body = {
      refreshToken: tokens.refresh.token,
    };
    const response = await this.base._post(`${this.urlBase}logout`, body);
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
      // Define o usuário no store
      this.userStore.setUser(data.user || data);
      
      // Se houver tokens na resposta, salva eles
      if (data.tokens) {
        await this.userStore.setToken(data.tokens);
      }
      
      // Marca como logado
      this.userStore.setIsLogged(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
