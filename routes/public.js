import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const app = express()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const prisma = new PrismaClient();
const router = express.Router();
//Puxando a variável do .ev
const JWT_SECRET = process.env.JWT_SECRET

//Criando rota post
router.post("/cadastro", async (req, res) => {
  const user = req.body;

  try {
    //Escolhendo o nível de encriptação, no caso é 10
    const salt = await bcrypt.genSalt(10);

    //Criando o hash da senha
    const hashSenha = await bcrypt.hash(user.password, salt);

    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        //Enviandno a senha encriptografada para o banco de dados
        password: hashSenha,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

/* 
router.get("/usuarios", async (req, res) => {
  const user = await prisma.user.findMany();

  res.status(200).json(user);
});
 */
//Criando tokin de usuário
//Rota de login desencriptando senha
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body; //Pegando as informações de login do usuário
    const user = await prisma.user.findUnique({
        where:{
            email: userInfo.email
        }
    }) //Varificando no banco de dados se o usuário existe, estou procurando apenas 1

    //Condição
    if(!user){
        res.status(404).json({message: "Usuário não encontrado"})
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password) //Desencriptando a senha 

    //Validando senha
    if(!isMatch){
        res.status(400).json({message: "Senha inválida"})
    }

    //Gerando o token JWT
    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '15m'}) //Estou colocando dentro do payload o ID do usuário, posso colocar outras informaçôes também
    //expiresIn é o tempo que o token vai expirar

    res.status(200).json(token) //Por enqanto para ver se o usuário está certo, depois vamos mudar
  } catch (error) {
    console.log(error);   
  }
});

export default router;
