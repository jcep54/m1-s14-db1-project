const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')





router.get('/', async (req, res, next) => {
  const accounts = await Accounts.getAll()
  res.json(accounts)
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
  const accountById = await Accounts.getById(req.params.id);
  res.json(accountById)
  }
  catch(err){
    next(err)
  }
})

router.post('/', [checkAccountPayload, checkAccountNameUnique], async (req, res, next) => {
  try{
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', [checkAccountId,checkAccountPayload], async (req, res, next) => {
  try{
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.json(updatedAccount)

  }catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const delAccount = await Accounts.deleteById(req.params.id)
    res.json(delAccount)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message:err.message,
    stack:err.stack
  })
})

module.exports = router;
