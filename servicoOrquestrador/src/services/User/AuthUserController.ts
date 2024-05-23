// requisicoes
import { Request, Response } from "express";
import axios from 'axios';
require('dotenv').config();

// variaveis de ambiente
const { DOMINIO2 } = process.env;

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserController {

    async handle(req: Request, res: Response){

        try {
            // receber email e password do body
            const { email, password } = req.body as AuthRequest

            // conferir se os dados são válidos
            // será conferido em um try catch ao chamar a api no client
            // caso caia no 'catch', será exibido o erro abaixo
            if (!email || !password) {
                throw new Error("Credenciais inválidas!")
            }

            const response = await axios.post(`http://${DOMINIO2}:3000/auth`, {
                email: email,
                password: password
            });

            return res.status(200).json(response.data)

        } catch (error) {

            return res.status(400).json({
                "message": error.response.data.message
            })

        }
    }

}

export { AuthUserController }
