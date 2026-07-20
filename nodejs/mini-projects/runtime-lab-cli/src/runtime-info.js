'use strict';

const os = require('node:os');
const process = require('node:process');

function getRuntimeInfo() {
  const memoryUsage = process.memoryUsage();

  return {
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    processId: process.pid,
    hostname: os.hostname(),
    availableParallelism: os.availableParallelism(),
    systemMemoryBytes: {
      total: os.totalmem(),
      free: os.freemem(),
    },
    processMemoryBytes: {
      residentSet: memoryUsage.rss,
      heapUsed: memoryUsage.heapUsed,
    },
    processUptimeSeconds: Number(process.uptime().toFixed(3)),
  };
}

module.exports = { getRuntimeInfo };
