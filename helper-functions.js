function handleError500(res){
    return err => {
    console.log(err)
    res.status(500).json({
      error: 'Something went wrong. Try again shortly!'
    })
   }
  }

  module.exports = handleError500;