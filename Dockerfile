# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install sqlite3 --save
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Default command to run migrations and then start the app
CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run && npx ts-node -r tsconfig-paths/register src/main.ts"]
