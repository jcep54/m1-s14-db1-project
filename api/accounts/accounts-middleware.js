const db = require('../../data/db-config')
exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  const err = {status:400}
  if(!name || !budget){
    err.message= "name and budget are required"
  }else if(name.trim().length < 3 || name.trim().length> 100){
    err.message="name of account must be between 3 and 100"
  }else if (typeof budget !== 'number' || isNaN(budget)){
    console.log('num err ran')
    err.message = "budget of account must be a number"
  } else if (budget<0 || budget>1000000){
    err.message = "budget of account is too large or too small"
  } 

  if(err.message)
    next(err)
  else{
    req.body.name = name.trim();
    next()
  }
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  const nameInUse = await db('accounts').where('name',req.body.name).first();

  if(nameInUse)
    next({status:400, message: 'that name is taken'})
  else
    next()


}

 exports.checkAccountId = async(req, res, next) => {
  // DO YOUR MAGIC
  const id = await db('accounts').where('id',req.params.id).first();
  if(!id){
    next({status:404, message:'account not found'})
  }else{
    next()
  }
}
