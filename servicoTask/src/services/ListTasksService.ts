import { Request, Response } from "express";
import { Task } from "../sequelize/sequelize";

type UserTasksRequest = {
    idUser: string,
}

class ListTasksService {

    async handle(req: Request, res: Response) {
        try {
            const { idUser } = req.query as UserTasksRequest;

            if (!idUser) {
                throw new Error("Erro ao identificar ID do usuário.");
            }

            // Procura todas as tarefas do usuário com o ID especificado
            const tasks = await Task.findAll({
                where: {
                    id_user: idUser
                }
            });

            // Verifica se foram encontradas tarefas para o usuário
            if (!tasks || tasks.length === 0) {
                return res.status(404).json({ "message": "Nenhuma tarefa encontrada para este usuário." });
            }

            // Retorna as tarefas encontradas
            return res.status(200).json(tasks);

        } catch (error) {
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { ListTasksService };
