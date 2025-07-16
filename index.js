const express = require("express");
const app = express();
const port = 3000;

const shopData = {
  grasslands: {
    "Soggy Fries": {
      Name: "Soggy Fries",
      Price: 5,
      ["Number Rarity"]: 100,
      MinStock: 5,
      MaxStock: 20,
    },
    "Wet Nuggets": {
      Name: "Wet Nuggets",
      Price: 40,
      ["Number Rarity"]: 100,
      MinStock: 2,
      MaxStock: 10,
    },
  },
};

// 🟢 Root route to prevent "Cannot GET /"
app.get("/", (req, res) => {
  res.send("✅ Shop Backend Server Running");
});

// 🛒 Get shop by biome
app.get("/shop/:biome", (req, res) => {
  const biome = req.params.biome.toLowerCase();
  const data = shopData[biome];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: `Biome '${biome}' not found.` });
  }
});

app.listen(port, () => {
  console.log(`Shop server running at http://localhost:${port}`);
});
