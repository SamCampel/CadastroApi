const express = require ('express')

const app = express();

const users = []

app.post('/users', (req,res) => {
    try {
        
        console.log(req)
    } catch (error) {
        
    }
})

app.get('/users', (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

app.listen(5678, () => {
    console.log("API rodando na porta 5678!")
})