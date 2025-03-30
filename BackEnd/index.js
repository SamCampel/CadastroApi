import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

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
    const users = Object.keys(req.query).length
       await prisma.user.findMany({
          where: {
            name: req.query.name,
            email: req.query.email,
            age: req.query.age
          }
        })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  } 
});

app.listen(5678, () => {
  console.log("API rodando na porta 5678!");
});