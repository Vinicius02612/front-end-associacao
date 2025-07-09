<template>
	<v-app-bar color="white" elevation="1" height="64" z-index="0">
		<div class="ma-2" style="width: 14%; height: 100%; display: flex; align-items: center;">
			<h3>
				{{ this.$route.name }}
			</h3>
		</div>
		<v-spacer></v-spacer>

		<v-divider class="ms-3 border-opacity-90" inset vertical></v-divider>

		<v-menu location="bottom" transition="slide-y-transition">
			<template v-slot:activator="{ props }">
				<v-btn variant="text" v-bind="props" class="pa-2" height="64">
					<!-- <span class="mr-2">{{ user.name }}</span> -->
					 <span>Aleff </span>
					<v-avatar
						:image="user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=9CBFBB&color=fff`"></v-avatar>
				</v-btn>
			</template>

			<v-list density="compact" nav>
				<!-- <v-list-item @click="goToProfile">
					<template v-slot:prepend>
						<v-icon>mdi-account</v-icon>
					</template>
					<v-list-item-title>Perfil</v-list-item-title>
				</v-list-item> -->

				<v-list-item to="/user/edit" link>
					<template v-slot:prepend>
						<v-icon>mdi-account-circle-outline</v-icon>
					</template>
					<v-list-item-title>Dados da Conta</v-list-item-title>
				</v-list-item>

				<v-list-item link>
					<template v-slot:prepend>
						<v-icon>mdi-help-circle-outline</v-icon>
					</template>
					<v-list-item-title>Ajuda e Suporte</v-list-item-title>
				</v-list-item>

				<v-list-item link>
					<template v-slot:prepend>
						<v-icon>mdi-account-switch-outline</v-icon>
					</template>
					<v-list-item-title>Trocar de Conta</v-list-item-title>
				</v-list-item>

				<v-list-item link>
					<template v-slot:prepend>
						<v-icon>mdi-information-outline</v-icon>
					</template>
					<v-list-item-title>Sobre o Sistema</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();

export default {
	// methods: {
	// 	goToProfile() {
	// 		this.$router.push("/profile");
	// 	},
	// },
	computed: {
		user() {
			return userStore.getUser || {};
		},
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped></style>