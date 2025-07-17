const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Full item pool with spawn chances and stock ranges
const allItems = [
  {
    name: "Soggy Fries",
    chance: 100,
    minStock: 5,
    maxStock: 20
  },
  {
    name: "Wet Nuggets",
    chance: 100,
    minStock: 2,
    maxStock: 10
  },
  {
    name: "Glikshake",
    chance: 70,
    minStock: 1,
    maxStock: 6
  },
  {
    name: "Galaxy Burger",
    chance: 50,
    minStock: 1,
    maxStock: 5
  },
  {
    name: "Burrito",
    chance: 25,
    minStock: 1,
    maxStock: 4
  },
  {
    name: "Cookie",
    chance: 5,
    minStock: 1,
    maxStock: 3
  }
];

// Helper to pick items based on chance
function pickItemsWithChance() {
  const selected = [];
  for (const item of allItems) {
    const roll = Math.random() * 100;
    if (roll <= item.chance) {
      selected.push({
        name: item.name,
        stock: Math.floor(Math.random() * (item.maxStock - item.minStock + 1)) + item.minStock
      });
    }
  }
  return selected;
}

// Storage
let shopData = {
  grasslands: {
    timestamp: Date.now(),
    items: pickItemsWithChance()
  }
};

// Restock biome with new items
function restockBiome(biome) {
  shopData[biome] = {
    timestamp: Date.now(),
    items: pickItemsWithChance()
  };
}

// Restock every 5 minutes
setInterval(() => {
  restockBiome("grasslands");
  console.log("Grasslands restocked");
}, 5 * 60 * 1000);

// Routes
app.get("/", (req, res) => {
  res.send("Shop Backend is running!");
});

app.get("/shop/:biome", (req, res) => {
  const biome = req.params.biome;
  const data = shopData[biome];

  if (data) {
    res.json({
      biome,
      timestamp: data.timestamp,
      items: data.items
    });
  } else {
    res.status(404).send("Biome not found");
  }
});

app.listen(PORT, () => {
  console.log(`Shop server listening on port ${PORT}`);
});
