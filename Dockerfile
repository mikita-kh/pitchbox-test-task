ARG NODE_VERSION=16

FROM node:${NODE_VERSION} AS builder

RUN mkdir -p /workspace
WORKDIR /workspace
COPY package.json .
COPY yarn.lock .
COPY config/eslint-base/package.json ./config/eslint-base/
COPY config/eslint-node/package.json ./config/eslint-node/
COPY config/eslint-react/package.json ./config/eslint-react/
COPY config/prettier/package.json ./config/prettier/
COPY server/api/package.json ./server/api/
COPY client/app/package.json ./client/app/

RUN yarn install

COPY . .
ENV NODE_ENV=production
RUN yarn run build

#FROM nginx:mainline-alpine
#COPY --from=builder /workspace/client/app/build /usr/share/nginx/html
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80

FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV=production

RUN mkdir -p /workspace
WORKDIR /workspace

COPY package.json .
COPY yarn.lock .
COPY config/eslint-base/package.json ./config/eslint-base/
COPY config/eslint-node/package.json ./config/eslint-node/
COPY config/eslint-react/package.json ./config/eslint-react/
COPY config/prettier/package.json ./config/prettier/
COPY server/api/package.json ./server/api/
RUN yarn install --frozen-lockfile --non-interactive --production=true --ignore-scripts

COPY --from=builder /workspace/server/api/dist /workspace/server/api/dist
COPY --from=builder /workspace/client/app/build /workspace/client/app/build

EXPOSE 3000

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD /wait && node server/api/dist/main.js


