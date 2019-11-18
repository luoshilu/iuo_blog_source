FROM node:12.11.0-alpine AS serve_builder
WORKDIR /usr/src/serve
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-engines

FROM node:12.11.0-alpine AS serve
WORKDIR /usr/src/serve
COPY --from=serve_builder /usr/src/serve/node_modules ./node_modules
COPY . .
EXPOSE 8765