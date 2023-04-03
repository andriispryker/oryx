/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const db = require('./db.json');
const routes = require('./routes.json');
const proxyRoutes = require('./proxy-routes.json');

const BASE_PATH = process.env.ORYX_FULFILLMENT_MOCK_BASE_PATH || '/';
const PROXY_URL = process.env.ORYX_FULFILLMENT_MOCK_PROXY_URL;

exports.createMockServer = function createMockServer() {
  const server = jsonServer.create();
  const router = express.Router();

  router.use(cors());
  router.use(corsMiddleware());

  if (PROXY_URL) {
    router.use(createProxyRouter(PROXY_URL, proxyRoutes, BASE_PATH));
  }

  router.use(jsonServer.defaults({ noCors: true }));

  router.post('/authorize', mapRequestToGet);
  router.post('/token', mapRequestToGet);

  router.patch('/picking-lists/:id/picking-list-items', (req, res) => {
    const { id } = req.params;

    res.send({
      data: [
        {
          type: 'picking-lists',
          id,
          attributes: {
            status: 'picking-finished',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        },
      ],
      links: {
        self: `/picking-lists/${id}/picking-list-items`,
      },
    });
  });

  router.patch('/picking-lists/:id', (req, res) => {
    const { id } = req.params;

    res.send({
      data: {
        type: 'picking-list',
        id,
        attributes: {
          status: 'picking-started',
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      links: {
        self: `/picking-lists/${id}`,
      },
    });
  });

  router.use(jsonServer.rewriter(routes));
  router.use(jsonServer.router(db));

  // eslint-disable-next-line no-console
  console.log('Mounting mock server on path:', BASE_PATH);
  server.use(BASE_PATH, router);

  return server;
};

function mapRequestToGet(req, _, next) {
  req.method = 'GET';
  next();
}

function createProxyRouter(proxyUrl, proxyRoutes, basePath) {
  const router = express.Router();

  if (Array.isArray(proxyRoutes) && proxyRoutes.length) {
    // eslint-disable-next-line no-console
    console.log(`Proxying routes: ${proxyRoutes.join(', ')}`);

    const proxy = createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
      xfwd: true,
      logLevel: 'debug',
    });

    const fixProxyPath =
      basePath && basePath !== '/'
        ? (req, _, next) => {
            if (req.originalUrl.startsWith(basePath)) {
              req.originalUrl = req.originalUrl.replace(basePath, '');
            }
            next();
          }
        : (_1, _2, next) => next();

    proxyRoutes.forEach((route) => {
      router.use(route, fixProxyPath, proxy);
    });
  }

  return router;
}

function corsMiddleware(origin = '*') {
  return (_, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PATCH,PUT'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  };
}

/**
 * Read and parse file content as JSONC (Json with Comments)
 * @param {string} path
 * @param {BufferEncoding} encoding
 */
function readJsoncSync(path, encoding = 'utf-8') {
  const content = readFileSync(path, encoding);
  return JSON.parse(content.replace(/^\s*\/\/.*/gm, ''));
}