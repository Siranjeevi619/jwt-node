const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: "10000ms",
    })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.log(" MongoDB Error:", err));
};
