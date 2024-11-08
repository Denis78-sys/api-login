import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middlewares/auth.js"; // ajuste o caminho conforme a localização real do arquivo
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const router = express.Router();

// Configuração CORS
/* app.use(cors({
    origin: 'http://localhost:43101', // substitua pelo seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Criando rota GET
router.get("/listar-usuarios", async (req, res) => {
  try {
    //Pegando dados dos usuários do banco menos a senha
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default router;
