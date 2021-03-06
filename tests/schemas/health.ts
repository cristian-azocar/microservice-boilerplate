export default {
  nodeVersion: expect.any(String),
  service: expect.any(String),
  memory: expect.objectContaining({
    rss: expect.any(Number),
    heapTotal: expect.any(Number),
    heapUsed: expect.any(Number),
    external: expect.any(Number),
  }),
  pid: expect.any(Number),
  uptime: expect.any(Number),
  environment: expect.any(String),
  package: expect.objectContaining({
    name: expect.any(String),
    version: expect.any(String),
  }),
};
