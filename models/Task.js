const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  dateCreation: { type: Date, default: Date.now },
  echeance: Date,
  statut: {
    type: String,
    enum: ["à faire", "en cours", "terminée", "annulée"],
    default: "à faire",
  },
  priorite: {
    type: String,
    enum: ["basse", "moyenne", "haute", "critique"],
    default: "moyenne",
  },
  auteur: { nom: String, prenom: String, email: String },
  categorie: String,
  etiquettes: [String],
  sousTaches: [{ titre: String, statut: String, echeance: Date }],
  commentaires: [{ auteur: String, date: Date, contenu: String }],
  historiqueModifications: [
    {
      champModifie: String,
      ancienneValeur: String,
      nouvelleValeur: String,
      date: Date,
    },
  ],
});

// 🟢 Force Mongoose à utiliser "MyCollection" au lieu de "tasks"
module.exports = mongoose.model("Task", TaskSchema, "MyCollection");
