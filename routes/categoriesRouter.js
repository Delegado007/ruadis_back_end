const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Yo soy categorias');
});

router.get('/:categoryId/products/:prodcutId', (req, res) => {
  const { categoryId, prodcutId } = req.params;
  res.json({
    categoryId,
    prodcutId,
  });
});

module.exports = router;
