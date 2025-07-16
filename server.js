const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let shopData = {
  grasslands: {
    timestamp: Date.now(),
    items: [
      { name: "Soggy Fries", stock: 12 },
      { name: "Wet Nuggets", stock: 8 },
      { name: "Glikshake", stock: 3 }
    ]
  }
};

function restockBiome(biome) {
  // You can replace this logic with real item randomization
  shopData[biome] = {
    timestamp: Date.now(),
    items: [
      { name: "Soggy Fries", stock: Math.floor(Math.random() * 15 + 5) },
      { name: "Wet Nuggets", stock: Math.floor(Math.random() * 10 + 2) },
      { name: "Glikshake", stock: Math.floor(Math.random() * 4 + 1) }
    ]
  };
}

setInterval(() => {
  restockBiome("grasslands");
  console.log("Grasslands restocked");
}, 5 * 60 * 1000); // every 5 minutes

app.get("/", (req, res) => {
  res.send("Shop Backend is running!");
});

app.get("/shop/:biome", (req, res) => {
  const biome = req.params.biome;
  if (shopData[biome]) {
    res.json(shopData[biome]);
  } else {
    res.status(404).send("Biome not found");
  }
});

app.listen(PORT, () => {
  console.log(`Shop server listening on port ${PORT}`);
});
