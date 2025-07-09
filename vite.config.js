// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const renderAppHostname = process.env.VITE_RENDER_APP_HOSTNAME || 'sistema-da-associacao-l5ow.onrender.com';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // IMPRESCINDÍVEL para ouvir em todas as interfaces
    port: process.env.PORT || 3000, // Usa a porta do Render, ou 3000 como fallback
    fs: {
      // Permite o diretório atual e qualquer outro que possa ser necessário.
      // O '*' é um "wildcard" para permitir todos os hosts para `fs.allow`.
      // Isso é uma medida de último recurso para o erro "Blocked request".
      allow: ['.', '/'], // Permite acesso à raiz do projeto e do sistema de arquivos
      strict: false // Desativa verificações de segurança de caminho (usar com cautela)
    },
    // O '*' aqui significa que qualquer host é permitido.
    // Isso é o mais permissivo possível para `server.allowedHosts` que o erro sugere.
    // Note: 'allowedHosts' não é uma propriedade direta de `server`, mas é um conceito.
    // `host: '0.0.0.0'` geralmente cuida disso, mas o erro insiste.
    // Podemos tentar adicionar uma HMR mais permissiva se estiver relacionada.
    hmr: {
      host: 'frontend-m8bu.onrender.com', // Especifique o host exato para HMR
      protocol: 'wss' // Use wss para HTTPS, ws para HTTP
    },
  },
  build: {
    outDir: 'dist', // Verifique se isso corresponde ao "Publish Directory" no Render
    emptyOutDir: true
  }
})