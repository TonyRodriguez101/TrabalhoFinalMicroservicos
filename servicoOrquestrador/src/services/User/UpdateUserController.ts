import { Request, Response } from "express";
import axios from 'axios';

require('dotenv').config();

// variaveis de ambiente
const { DOMINIO2 } = process.env;

interface UserRequest {
    name: string,
}

class UpdateUserController {

    async handle(req: Request, res: Response) {
        try {
            // receber name, email e password do body
            const { name } = req.body as UserRequest

            // recuperar o token definido na requisicao pelo middleware de autenticacao
            // essa é uma rota privada, por isso tem acesso ao req.idUser definido no middleware
            const idUser = req.idUser as string

            if (!name) {
                throw new Error("Dados incompletos!")
            }

            const response = await axios.put(`http://${DOMINIO2}:3000/update`, {
                id: idUser,
                name: name,
            });

            return res.status(200).json(response.data)

        } catch (error) {

            return res.status(400).json({
                message: `${error.message}`
            })

        }
    }

}

export { UpdateUserController }
