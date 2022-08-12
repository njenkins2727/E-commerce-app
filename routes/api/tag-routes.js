const router = require('express').Router();
const handleError500 = require('../../helper-functions');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
 const getTags =  await Tag.findAll({
    include : [
      {model: Product}
    ]
  })
    res.json(getTags);
}catch(err){
  console.log(err);
  handleError500(err)(res);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagById = await Tag.findByPk( req.params.id, {
      include: [
        {model: Product}
      ]
    })
    res.json(tagById)
  }catch(err){
    console.log(err);
    handleError500(err)(res);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((tag) => {
    res.json(tag);
  })
  .catch(handleError500(res));
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,  //what are we targetting
    }, {
      where: {
        id: req.params.id, //where we are targetting
      }
    })
    res.json(updatedTag)
  }catch(err){
    console.log(err);
    handleError500(err)(res);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(deletedTag)
  }catch(err){
    console.log(res)(err);
  }
});

module.exports = router;
