import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors()); // Aplica o middleware CORS

//Importando o hash do JWT
const JWT_SECRET = process.env.JWT_SECRET;

//NEXT permite que o processo continue, ele autoriza o acesso
const auth = (req, res, next) => {
  const token = req.headers.authorization;
 /*  console.log("Token recebido no servidor:", token); */ // Log para verificar o token recebido

  if (!token) {
    return res.status(401).json({ message: "Usuário não autorizado" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Remove 'Bearer ' do token
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export default auth;
