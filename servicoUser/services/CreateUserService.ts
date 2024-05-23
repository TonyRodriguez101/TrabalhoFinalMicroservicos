import { Request, Response } from "express";
import { User } from "../sequelize/sequelize";
import { hash } from "bcryptjs";

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  async handle(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body as UserRequest;

      if (!email) {
        throw new Error("Email inválido.");
      }

      const emailExists = await User.findAll({
        where: {
          email: email,
        },
      });

      if (emailExists.length !== 0) {
        throw new Error("Este email já está em uso.");
      }

      // cifrar senha
      const hashPassword = await hash(password, 14);

      const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });

      return res.status(200).json(user);
    } catch (error) {
      // o erro será o erro definido em 'throw new Error("Email inválido.")'
      // ou tambem pode ser qualquer outro erro qualquer na criação do user na db
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreateUserService };
