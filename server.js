import express from 'express'
//Importando a rota
import publicRouts from './routes/public.js'
import privateRouts from './routes/private.js'
import auth from './middlewares/auth.js'


const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  
//Interpretando json
app.use(express.json())


//Chamando rota púlica
app.use('/', publicRouts)

//Chamando rota privada
app.use('/', auth, privateRouts) //Estou dizendo que antes de qualquer ROTA PRIVADA ele deve passar por AUTH

app.listen(3000, ()=> console.log('Servidor rodando!'))

