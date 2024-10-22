import jwt from "jsonwebtoken";

//Importando o hash do JWT
const JWT_SECRET = process.env.JWT_SECRET

//NEXT permite que o processo continue, ele autoriza o acesso
const auth = (req, res, next) =>{

    //Verificando o Token de usuário, o Token é enviado peo HEADERS
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message: "Usuário não autorizado"})
    }
    
    //Verificando se o Token é válido
    try {
        const decodificando = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
    } catch (error) {
        return res.status(401).json({message: "Token inválido"})
    }
    
    next()
}

export default auth