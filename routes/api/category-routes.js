const router = require('express').Router();
const res = require('express/lib/response');
const handleError500 = require('../../helper-functions');
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
  .catch(handleError500(res))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      { model: Product}
    ]
  }).then(category => res.json(category))
  .catch(handleError500(res))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then((category) => {
    res.json(category);
  })
  .catch(handleError500(res));
});

//update
router.put('/:id', async (req, res) => {
  try{
    const updated = await Category.update({
      category_name: req.body.category_name,
    },{
      where: {
        id: req.params.id,
      }
    })
    res.json(updated)
  }catch(err){
    console.log(err);
    handleError500(res)(err);
  }
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const deleted = await Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.json(deleted)
}catch(err){
  console.log(res)(err);
}
});

module.exports = router;
