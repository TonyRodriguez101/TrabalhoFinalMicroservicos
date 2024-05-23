import { Request, Response } from "express";
import { Task } from "../sequelize/sequelize";

type UpdateTaskRequest = {
    id: string,
    title: string,
    description: string
}

class UpdateTaskDetailsService {

    async handle(req: Request, res: Response) {
        try {
            const { id, title, description } = req.body as UpdateTaskRequest;

            // Verifica se todos os campos necessários foram fornecidos
            if (!id || !title || !description) {
                throw new Error("Dados incompletos na requisição.");
            }

            // Procura a tarefa com o ID especificado
            const task = await Task.findByPk(id);

            // Verifica se a tarefa existe
            if (!task) {
                throw new Error("Tarefa não encontrada.");
            }

            // Atualiza os campos title e description da tarefa
            await task.update({
                title: title,
                description: description,
            });

            // Retorna a tarefa atualizada
            return res.status(200).json(task);

        } catch (error) {
            // Trata o erro
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { UpdateTaskDetailsService };
