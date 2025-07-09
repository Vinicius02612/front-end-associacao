# Build stage
FROM node:19.8.1 AS build
FROM nginx:1.19.0-alpine
# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências
COPY package*.json ./

# Instalando as dependências
RUN npm install 

# Copiando o restante dos arquivos do projeto
COPY . .

RUN npm run build
# Definindo as variáveis de ambiente através de ARG



ARG VITE_API_URL
ARG VITE_DEFAULT_LINK_PREFIX

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEFAULT_LINK_PREFIX=$VITE_DEFAULT_LINK_PREFIX

COPY --from=0 /app/dist /usr/share/nginx/html



# Expondo a porta 80
EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]
