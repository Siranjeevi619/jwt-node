const jwt = require("jsonwebtoken");

module.export = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, process.env.TZ, {
    expiresIn: "1m",
  });
};
