const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/Task");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = [
  {
    titre: "Finir le projet",
    description: "Terminer le développement...",
    statut: "en cours",
    priorite: "haute",
  },
  {
    titre: "Courses",
    description: "Acheter du lait...",
    statut: "à faire",
    priorite: "moyenne",
  },
];

Task.insertMany(seedData)
  .then(() => {
    console.log("✅ Données insérées !");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Erreur d’insertion :", err));
