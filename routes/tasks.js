const express = require("express");
const Task = require("../models/Task");
const mongoose = require("mongoose");
const router = express.Router();

// Récupérer toutes les tâches avec filtres et tris
router.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.statut) filter.statut = req.query.statut;
    if (req.query.priorite) filter.priorite = req.query.priorite;
    if (req.query.categorie) filter.categorie = req.query.categorie;
    if (req.query.etiquette) filter.etiquettes = req.query.etiquette;

    let sort = {};
    if (req.query.tri)
      sort[req.query.tri] = req.query.ordre === "desc" ? -1 : 1;

    const tasks = await Task.find(filter).sort(sort);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une nouvelle tâche (POST /tasks)
router.post("/", async (req, res) => {
  try {
    const {
      titre,
      description,
      echeance,
      statut,
      priorite,
      categorie,
      etiquettes,
    } = req.body;

    if (!titre || !description) {
      return res
        .status(400)
        .json({ error: "Titre et description sont obligatoires." });
    }

    const nouvelleTache = new Task({
      titre,
      description,
      echeance: echeance || null,
      statut: statut || "à faire",
      priorite: priorite || "moyenne",
      categorie: categorie || "non spécifié",
      etiquettes: etiquettes || [],
    });

    await nouvelleTache.save();
    res.status(201).json(nouvelleTache);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier une tâche (PUT /tasks/:id)
router.put("/:id", async (req, res) => {
  try {
    // Vérifie si l'ID est bien un ObjectId MongoDB
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID invalide." });
    }

    const {
      titre,
      description,
      echeance,
      statut,
      priorite,
      categorie,
      etiquettes,
    } = req.body;

    const miseAJour = await Task.findByIdAndUpdate(
      req.params.id,
      { titre, description, echeance, statut, priorite, categorie, etiquettes },
      { new: true, runValidators: true }
    );

    if (!miseAJour) {
      return res.status(404).json({ error: "Tâche non trouvée." });
    }

    res.json(miseAJour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une tâche (DELETE /tasks/:id)
router.delete("/:id", async (req, res) => {
  try {
    const suppression = await Task.findByIdAndDelete(req.params.id);
    if (!suppression) {
      return res.status(404).json({ error: "Tâche non trouvée." });
    }

    res.json({ message: "Tâche supprimée avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
