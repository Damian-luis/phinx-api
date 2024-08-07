FROM node:16

WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala sqlite3 explícitamente
RUN npm install sqlite3

# Copia todos los archivos del proyecto
COPY . .

# Construye el proyecto
RUN npm run build

# Mostrar el contenido de la carpeta dist para depuración
RUN ls -la dist

# Mostrar todas las dependencias instaladas para depuración
RUN npm list

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["sh", "-c", "ls -la node_modules/sqlite3 && ls -la dist && cat dist/data-source.js && npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d dist/data-source.js && npm run start:dev"]
