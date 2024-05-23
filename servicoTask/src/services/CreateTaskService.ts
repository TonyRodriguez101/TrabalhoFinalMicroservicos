import { Request, Response } from "express";
import { Task } from "../sequelize/sequelize";

type TaskRequest = {
    idUser: string,
    title: string,
    description: string
}

class CreateTaskService {

    async handle(req: Request, res: Response) {
        try {
            const { idUser, title, description } = req.body as TaskRequest;

            if (!idUser || !title || !description) {
                throw new Error("Parâmetros inválidos.");
            }

            const task = await Task.create({
                id_user: idUser,
                title: title,
                description: description,
                status: true // valor padrao. true = aberto / false = fechado
            });

            return res.status(200).json(task);

        } catch (error) {
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { CreateTaskService };
