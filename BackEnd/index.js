const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

const users = []

app.delete('/users/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        }) 
    } catch (error) {
        console.log("Erro em deletar usuário.")
    }
    
})
app.put('/users/:id', async (req, res) => {
    try {
        await prisma.user.update({

            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }

        })

        res.status(201).json(re.body)
    } catch (error) {
        console.log("Erro em atualizar usuário.")
    }
})

app.post('/users', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }

        })

        res.status(201).json(re.body)
    } catch (error) {
        console.log("Erro em criar usuário.")
    }
})

app.get('/users', async (req, res) => {

    let users = []
    if(req.query){
        await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        await prisma.user.findMany()
    }

    res.status(200).req.json(users)
})

app.listen(5678, () => {
    console.log("API rodando na porta 5678!")
})