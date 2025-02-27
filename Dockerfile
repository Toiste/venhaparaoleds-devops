# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia todo o código do projeto para o container
COPY . .

# Expõe a porta que a API usa
EXPOSE 3000

# Define as variáveis de ambiente para o PostgreSQL
ENV DB_USER=postgres
ENV DB_HOST=localhost
ENV DB_NAME=postgres
ENV DB_PASSWORD=secret
ENV DB_PORT=5432

# Comando para rodar a aplicação
CMD ["node", "src/index.js"]
