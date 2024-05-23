import { Request, Response } from "express";
import axios from 'axios';
require('dotenv').config();

// variaveis de ambiente
const { DOMINIO1 } = process.env;

type TaskRequest = {
    title: string,
    description: string
}

class CreateTaskController {

    async handle(req: Request, res: Response) {
        try {

            // recuperar o token definido na requisicao pelo middleware de autenticacao
            // essa é uma rota privada, por isso tem acesso ao req.idUser definido no middleware
            const idUser = req.idUser as string

            if (!idUser) {
                throw new Error("Erro ao identificar ID do usuário.");
            }

            const { title, description } = req.body as TaskRequest;

            if (!title || !description) {
                throw new Error("Dados da tarefa inválidos.");
            }

            const response = await axios.post(`http://${DOMINIO1}:3000/task`, {
                idUser: idUser,
                title: title,
                description: description
            });

            return res.status(200).json(response.data)

        } catch (error) {

            return res.status(400).json({
                message: error.response.data.message
            })

        }
    }

}

export { CreateTaskController }
