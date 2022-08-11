const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { model: Product}
    ]
  }).then((categories) => {
    res.json(categories);
  })
  .catch(err => {
    console.log('error');
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      { model: Product}
    ]
  }).then(category => res.json(category))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then((category) => {
    res.json(category);
  })
  .catch(err => {
    console.log('error');
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update({
      category_name: req.body.category_name,
    })
    res.json(updated)
  } catch(err) {
    console.log('error');
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
});

module.exports = router;
