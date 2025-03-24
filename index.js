const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tp_ci_cd';

app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log(err));

// Définition du modèle
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

// Route GET /items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Route POST /items
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
