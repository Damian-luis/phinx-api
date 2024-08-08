# Usar una imagen oficial de Node.js como la imagen base
FROM node:14

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que la aplicación utiliza
EXPOSE 3000

# Ejecutar migraciones y luego iniciar la aplicación
CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts && npx ts-node -r tsconfig-paths/register src/main.ts"]
