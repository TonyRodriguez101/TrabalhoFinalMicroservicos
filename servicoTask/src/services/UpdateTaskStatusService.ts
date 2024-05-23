import { Request, Response } from "express";
import { Task } from "../sequelize/sequelize";

type UpdateStatusRequest = {
    id: string,
    status: boolean
}

class UpdateTaskStatusService {

    async handle(req: Request, res: Response) {
        try {
            const { id, status } = req.body as UpdateStatusRequest;

            // Verifica se todos os campos necessários foram fornecidos
            if (id === undefined || status === undefined) {
                throw new Error("Dados incompletos na requisição.");
            }

            // Procura a tarefa com o ID especificado
            const task = await Task.findByPk(id);

            // Verifica se a tarefa existe
            if (!task) {
                throw new Error("Tarefa não encontrada.");
            }

            // Atualiza o campo status da tarefa
            await task.update({
                status: status,
            });

            // Retorna a tarefa atualizada
            return res.status(200).json(task);

        } catch (error) {
            // Trata o erro
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { UpdateTaskStatusService };
