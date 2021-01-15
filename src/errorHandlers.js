const badRequestHandler = (err, rq, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.message || "Bad request!");
  } else {
    next(err);
  }
};

const notFoundHandler = (err, rq, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "Not found!");
  } else {
    next(err);
  }
};

const forbiddenHandler = (err, rq, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send(err.message || "Bad handler!");
  } else {
    next(err);
  }
};

const notAuthorized = (err, rq, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "Not authorized!");
  } else {
    next(err);
  }
};

const genericErrorHandler = (err, rq, res, next) => {
  if (err.httpStatusCode === 500) {
    res.status(500).send(err.message || "Server error!");
  } else {
    next(err);
  }
};

module.exports = {
  badRequestHandler,
  notFoundHandler,
  forbiddenHandler,
  notAuthorized,
  genericErrorHandler,
};
