// Rate limiter middleware
const rateLimiter = (req, res, next) => {
  const clientIp = req.ip;
  const now = Date.now();

  if (!rateLimiter.clients[clientIp]) {
    rateLimiter.clients[clientIp] = {
      tokens: rateLimiter.capacity,
      lastRefill: now,
    };
  }

  const client = rateLimiter.clients[clientIp];
  const elapsedTime = now - client.lastRefill;

  // Refill tokens based on elapsed time
  const tokensToAdd =
    Math.floor(elapsedTime / rateLimiter.refillInterval) *
    rateLimiter.refillRate;
  client.tokens = Math.min(rateLimiter.capacity, client.tokens + tokensToAdd);
  client.lastRefill = now;

  if (client.tokens > 0) {
    client.tokens -= 1;
    next();
  } else {
    res.status(429).send("Too many requests. Please try again later.");
  }
};

// Rate limiter configuration
rateLimiter.capacity = 10; // Max tokens (requests) per client
rateLimiter.refillRate = 1; // Tokens added per interval
rateLimiter.refillInterval = 1000; // Interval in milliseconds
rateLimiter.clients = {};

module.exports = rateLimiter;
