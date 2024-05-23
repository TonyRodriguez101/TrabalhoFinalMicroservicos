import { Request, Response } from "express";
import { User } from "../sequelize/sequelize";
import { hash } from "bcryptjs";

type UserRequest = {
    id: string,
    name: string,
}

class UpdateUserService {

    async handle(req: Request, res: Response) {
        try {
            const { id, name } = req.body as UserRequest;

            if (!name) {
                throw new Error("Dados incompletos no service.");
            }

            // Verifica se o usuário com o ID especificado existe
            const existingUser = await User.findByPk(id);
            if (!existingUser) {
                throw new Error("Usuário não encontrado.");
            }

            // Atualiza o campo name do user
            await existingUser.update({
                name: name,
            });

            // Retorna o usuário atualizado
            return res.status(200).json(existingUser);

        } catch (error) {
            // Trata o erro
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { UpdateUserService };
