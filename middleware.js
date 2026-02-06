export function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
}

export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });} 