import { Request, Response } from "express";
import axios from "axios";
require('dotenv').config();

// variaveis de ambiente
const { DOMINIO2 } = process.env;

class DetailsUserController {
  async handle(req: Request, res: Response) {
    try {
      // recuperar o token definido na requisicao pelo middleware de autenticacao
      // essa é uma rota privada, por isso tem acesso ao req.idUser definido no middleware
      const idUser = req.idUser as string;

      if (!idUser) {
        throw new Error("Erro ao identificar ID do usuário.");
      }

      const response = await axios.get(
        `http://${DOMINIO2}:3000/user/?id=${idUser}`
      );

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(400).json({
        message: `${error.response.data.message}`,
      });
    }
  }
}

export { DetailsUserController };
