const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());
server.use('/api/accounts',accountsRouter)

server.get('/hello',(req,res)=>{
    res.json('server hooked up')
})

module.exports = server;
