import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    canShowLogin: false,
    user: null,
    token: null,
    isLogged: false,
    isInstagram: false,
  }),

  getters: {
    getUser() {
      return this.user;
    },
    getToken() {
      return this.token;
    },
    getIsLogged() {
      return this.isLogged;
    },
    getIsInstagram() {
      return this.isInstagram;
    }
  },

  actions: {
    setUser(user) {
      window.dataLayer.push({
        'event': 'novo-login-zaphub'
      });
      window.gtag('event', 'conversion', {'send_to': 'AW-11342098361/HSYoCLG9-esYELnfqqAq'});

			if(user === null){
				this.setIsLogged(false);
			}else{
				this.user = user;
				// localStorage.setItem("user", JSON.stringify(user));
				this.setIsLogged(true);
			}
    },
    async setToken(token) {
      localStorage.setItem("token", token.access.token);
			localStorage.setItem("refresh-token", token.refresh.token);
      this.token = token;
    },
    setIsLogged(isLogged) {
      this.canShowLogin = true;
      this.isLogged = isLogged;
    },
    setIsInstagram(isInstagram) {
      this.isInstagram = isInstagram;
    }
  },
});