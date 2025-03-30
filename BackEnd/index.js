const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: parseInt(req.body.age)
      }
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = Object.keys(req.query).length > 0
      ? await prisma.user.findMany({
          where: {
            name: req.query.name ? { contains: req.query.name } : undefined,
            email: req.query.email ? { contains: req.query.email } : undefined,
            age: req.query.age ? parseInt(req.query.age) : undefined
          }
        })
      : await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.listen(5678, () => {
  console.log("API rodando na porta 5678!");
});