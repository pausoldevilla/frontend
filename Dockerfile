# ─── Stage 1: Builder ───────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copiem primer els fitxers de dependències
COPY package*.json ./

# Instal·lem TOTES les dependències (incloent devDependencies per fer el build)
RUN npm ci

# Copiem tot el codi font
COPY . .

# Generem el build estàtic de producció (crea la carpeta /app/dist)
RUN npm run build

# ─── Stage 2: Production amb Nginx ──────────────────────────────────────────
FROM nginx:alpine AS production

# Copiem els fitxers estàtics generats al directori de servei de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiem la nostra configuració personalitzada de Nginx
# (gestiona el routing de React i el proxy a l'API)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Node.js NO s'envia a producció: imatge final molt més petita (~25MB vs ~200MB)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
