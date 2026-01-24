export function logReq(req, res, next) {
  console.log(req.method, req.url);
  next();
}

export function globalErr(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
}
