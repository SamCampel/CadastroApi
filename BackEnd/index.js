const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

const users = []

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

    }
})

app.get('/users', (req, res) => {
    try {

        res.status(200).req.json(users)
    } catch (error) {

    }
})

app.listen(5678, () => {
    console.log("API rodando na porta 5678!")
})