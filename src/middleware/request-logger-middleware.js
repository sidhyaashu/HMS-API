export const requestLogger = (req, res, next) => {
  console.log({
    time: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next(); // Call the next middleware
};
