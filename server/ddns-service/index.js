const express = require("express");

const init = async () => {
  const app = express();

  app.get("/", async (req, res) => {
    res
      .json({
        status: "OK",
        data: "test data",
      })
      .end();
  });

  const PORT = 3010;
  app.listen(PORT);

  console.log(`[DDNS] App running on http://localhost:${PORT}`);
};

init();
