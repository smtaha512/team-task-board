FROM node:22 AS builder
WORKDIR /usr/src

COPY --chown=node:node package*.json .
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build
USER node

# Smaller image for production
FROM node:22-alpine

ARG NODE_ENV="production"

WORKDIR /usr/src

COPY --chown=node:node --from=builder /usr/src/package*.json ./

COPY --chown=node:node --from=builder /usr/src/node_modules ./node_modules

COPY --chown=node:node --from=builder /usr/src/dist ./dist

COPY --chown=node:node --from=builder /usr/src/tsconfig* ./

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]


