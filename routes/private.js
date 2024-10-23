import express from 'express'
import { PrismaClient } from "@prisma/client";

const router = express.Router()
const prisma = new PrismaClient()

const app = express()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//Criando rota GET
router.get('/listar-usuarios', async (req, res) =>{

    try {
        
        //Pegando dados dos usuários do banco menos a senha
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Erro no servidor"})
    }

    
})

export default router