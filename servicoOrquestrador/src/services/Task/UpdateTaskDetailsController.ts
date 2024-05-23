import { Request, Response } from "express";
import axios from 'axios';
require('dotenv').config();

// variaveis de ambiente
const { DOMINIO1 } = process.env;

type TaskRequest = {
    id: string,
    title: string,
    description: string
}

class UpdateTaskDetailsController {

    async handle(req: Request, res: Response) {
        try {

            const { id, title, description } = req.body as TaskRequest;

            if (!title || !description || !id) {
                throw new Error("Dados da tarefa inválidos.");
            }

            const response = await axios.put(`http://${DOMINIO1}:3000/task`, {
                id: id,
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

export { UpdateTaskDetailsController }
