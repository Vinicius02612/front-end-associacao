// Composables
import { createRouter, createWebHistory } from "vue-router"; // Importação direta sem .vite/deps
import { useUserStore } from "@/stores/user.store"; // Use o alias configurado no vite.config.js
import { patch } from "@/services/axios"; // Use o alias configurado no vite.config.js

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"), // Use o alias
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"), // Use o alias
        meta: { requiresAuth: true, preload: true },
      },
      {
        path: "socios",
        children: [
          {
            path: "",
            name: "Sócios",
            component: () => import("@/views/Socios.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
          {
            path: "adicionar",
            name: "Adicionar Socio",
            component: () => import("@/views/AddSocio.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          }
        ]
      },
      {
        path: "projetos",
        children: [
          {
            path: "",
            name: "Projetos",
            component: () => import("@/views/Projetos.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
          {
            path: "adicionar",
            name: "Adicionar Projeto",
            component: () => import("@/views/AddProjeto.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
        ]
      },
      {
        path: "financas",
        children: [
          {
            path: "",
            name: "Finanças",
            component: () => import("@/views/Financas.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
          {
            path: "receitas",
            name: "Receitas",
            component: () => import("@/views/Receitas.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
          {
            path: "despesas",
            name: "Despesas",
            component: () => import("@/views/Despesas.vue"), // Use o alias
            meta: { requiresAuth: true, preload: true },
          },
        ],
      },
      {
        path: "/login",
        name: "LoginView",
        component: () => import("@/views/Login.vue"), // Use o alias
        meta: { requiresAuth: false, preload: true },
      },
    ],
  },
];

const router = createRouter({
  // CORREÇÃO AQUI: Use import.meta.env.BASE_URL para acessar variáveis de ambiente no Vite
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

// router.beforeEach((to, from, next) => {
//    const userStore = useUserStore();

//    if (!userStore.getIsLogged) {
//      if (
//        to.name === "Login" ||
//        to.name === "Register" ||
//        to.name === "ResetPassword" ||
//        to.name === "ForgotPassword" ||
//        to.name === "ConfirmPasswordEmail"
//      ) {
//        next();
//      } else if (to.meta.requiresAuth) {
//        next({ name: "Login" });
//      } else {
//        next();
//      }
//    } else {
//      if (to.name === "Home") {
//        next({ name: "Connections" });
//      }
//      next();
//    }
// });

export default router;
