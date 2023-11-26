const errorRoute404 = (req, res) => {
  res.status(404).json({ status: "error", message: "No route found" });
};

module.exports = { errorRoute404 };
