<template>
	<v-container class="fill-height pa-0 ma-0" fluid>
		<v-responsive class="align-center fill-height mx-auto">
			<div class="custom-background d-flex flex-column justify-center align-center" color="red">
				<v-card width="90%" height="80%" elevation="8" class="rounded-xl overflow-hidden">
					<v-row no-gutters class="fill-height w-100">
						<v-col cols="12" md="7" class="">
							<v-img
							src="@/assets/LogScrImage.jpeg"
							class="w-100 h-100"
							cover
							></v-img>
						</v-col>
						<v-col cols="12" md="5" class="d-flex justify-center align-center">
							<v-form  ref="login">
							<v-card
									flat
									width="100%"
									max-width="400"
									class="pa-6 rounded-0"
								>
									<v-row no-gutters class="justify-center align-center">
										<v-col md="12">
											<div class="login-card">
												<div class="mt-5 mb-4 d-flex flex-column align-center">
													<v-img src="@/assets/Logo1.png" min-width="450"/>
												</div>
											</div>
										</v-col>
										<v-col md="12" class="text-center mb-5">
											<span class="text-h4 textC-primary" v-html="$t('formData.login.title')"></span>
										</v-col>
										
										<v-col md="12">
											<v-text-field
												prepend-inner-icon="mdi-email-outline"
												rounded="lg"
												:placeholder="$t('formData.login.email')"
												variant="outlined"
												density="compact"
												:rules="[ruleRequired, ruleEmail]"
												v-model="username"
												type="email"
												@keypress.space.prevent
												@keyup.enter="login"
											></v-text-field>
										</v-col>
										<v-col md="12">
											<v-text-field
												prepend-inner-icon="mdi-lock-outline"
												rounded="lg"
												:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
												:type="visible ? 'text' : 'password'"
												density="compact"
												:placeholder="$t('formData.login.password')"
												variant="outlined"
												:rules="[ruleRequired, rulePassword]"
												@click:append-inner="visible = !visible"
												v-model="password"
												@keypress.space.prevent
												@keyup.enter="login"
											></v-text-field>
											<div class="text-subtitle-1 d-flex align-center justify-space-between">
												<v-spacer></v-spacer>
												<a
												class="text-caption text-decoration-none text-blue"
												@click="resetPassword"
												rel="noopener noreferrer"
												target="_blank"
												>
												<span class="bold" v-html="$t('formData.login.forgotPassword')"></span></a>
											</div>
										</v-col>
										<v-col class="mt-5 mb-4 d-flex flex-column align-center" md="12">
											<v-btn
												color="primary"
												width="400"
												:loading="loading"
												@click="login"
												>
												<span class="text_btn" v-html="$t('button.login')"></span>
											</v-btn>
										</v-col>
										<v-col class="mt-5 mb-4 d-flex flex-column align-center" md="12">
											<v-btn color="primary" variant="outlined" width="400" to="/register">
												<span v-html="$t('formData.login.register')"></span>
											</v-btn>
										</v-col>
									</v-row>
								</v-card>
							</v-form>
						</v-col>
					</v-row>
				</v-card>
			</div>
		</v-responsive>
	</v-container>
</template>
  
<script>
  import { useUserStore } from '@/stores/user.store';
  import { ruleEmail, rulePassword, ruleRequired } from '@/helpers/RulesHelper';
  import { goToGoogleLogin} from '@/services/auth.service';
  import AuthService from '@/controllers/authController';
  import statusCode from '@/helpers/statusCode';

  const userStore = useUserStore();
	const authService = new AuthService();

  export default {
    data() {
      return {
				visible: false,
        loading: false,
        loginMailSent: false,
        username: "",
				password: "",
        timer: 0,
				alert: false,
				valid: false,
				ruleEmail,
				rulePassword,
				ruleRequired,
      }
    },

  methods: {
    async login() {
				try {
					this.valid = await this.$refs.login.validate();
					if (!this.valid.valid) {
						const error = new Error("Fields");
						error.status = 400;
						error.statusText = "Fields";
						throw error;
					};
					
					this.loading = true;

					const bodyLogin = { 
						username: this.username,
						password:this.password 
					};

					const response = await authService.login(bodyLogin).then( async (res) => {
						return res;
					});

					console.log("response", response.body);

					statusCode.toastSuccess({
						status: response.status,
						statusText: "loginSuccess",
					});
				  
					await authService.setUserLocalStorage(response.body)
					window.location.href = "/";
					
				}catch (error) {
					statusCode.toastError(error);
				}finally{	
					this.loading = false;
				}
    	},
			
		resetPassword(){
			this.$router.push("/forgot-password");
		},

	},

    computed: {

      showGoogle() {
        return !userStore.isInstagram;
      },  
    },
  };
</script>

<style scoped>
.custom-background {
	height: 100vh;
	background: linear-gradient(to right, #406A33, #6AAF54);
}
.login-card {
  min-width: 250px !important;
  max-width: 440px !important;
  width: 90%;
  margin: 0 auto;
}
.text_btn {
  color: white;
}
.cadastre {
  border: 2px solid #29d53a;
  
}
.cadText {
  	color: #29d53a;
  }

.alert {
  color: red;
}
.bold {
	font-weight: bold;
	color: #0D626F;
}
a {
	cursor: pointer;
}

.textC-primary {
	color: #406A33;
	font-weight: bold;
}
</style>