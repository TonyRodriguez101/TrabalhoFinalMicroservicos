import { Request, Response } from "express";
import { User } from "../sequelize/sequelize";

type UserDetailsRequest = {
    id: string,
}

class DetailsUserService {

    async handle(req: Request, res: Response) {
        try {
            const { id } = req.query as UserDetailsRequest;

            if (!id) {
                throw new Error("Erro ao identificar ID do usuário.");
            }

            // Procura pelo usuário com o ID especificado, retornando apenas o nome
            const user = await User.findByPk(id, {
                attributes: ['name']
            });

            // Verifica se o usuário foi encontrado
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            // Retorna o nome do usuário encontrado
            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({ "message": error.message });
        }
    }

}

export { DetailsUserService };
