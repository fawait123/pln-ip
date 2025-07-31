# Gunakan image Node.js resmi
FROM node:22-alpine

# Buat direktori kerja di container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Bangun proyek Vue
RUN npm run build-only

# Gunakan image Nginx untuk serve hasil build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx jika perlu (opsional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]