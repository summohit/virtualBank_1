

const viewEndPoint = (req, res, next) => {
  let showEndPoint = `-----------------${
    req.originalUrl
  } is getting hitted----`;
  console.log(showEndPoint);
  next();
};

module.exports = viewEndPoint;
