const auth = async (req, res, next) => {
  console.log("meow");
  next();
};

module.exports = auth;
