FROM node:12.11.0-alpine AS ssr_builder
WORKDIR /usr/src/ssr
COPY package.json yarn.lock ./
# 该镜像用于存储依赖包
RUN yarn install --production

FROM node:12.11.0-alpine AS ssr
WORKDIR /usr/src/ssr
# 将ssr_builder构建的node_modules 复制到目标路径内
COPY --from=ssr_builder /usr/src/ssr/node_modules ./node_modules
COPY package.json nuxt.config.js ./
COPY ./server ./server
EXPOSE 3000
