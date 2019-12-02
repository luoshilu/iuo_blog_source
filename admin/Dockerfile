FROM node:12.11.0-alpine AS admin_builder
WORKDIR /usr/src/admin
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-engines

FROM node:12.11.0-alpine AS admin
WORKDIR /usr/src/admin
COPY --from=admin_builder /usr/src/admin/node_modules ./node_modules
COPY . .
