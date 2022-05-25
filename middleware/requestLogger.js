function requestLogger(req, res, next) {
  console.log("R " + req.method + " " + req.url);
  next();
}

export default requestLogger;
