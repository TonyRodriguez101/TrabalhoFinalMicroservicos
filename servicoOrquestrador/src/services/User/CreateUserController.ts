import { Request, Response } from "express";
import axios from 'axios';
require('dotenv').config();

// variaveis de ambiente
const { DOMINIO2 } = process.env;

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserController {

    async handle(req: Request, res: Response) {
        try {
            // receber name, email e password do body
            const { name, email, password } = req.body as UserRequest

            if (!email || !password || !name) {
                throw new Error("Dados incompletos!")
            }

            const response = await axios.post(`http://${DOMINIO2}:3000/signup`, {
                name: name,
                email: email,
                password: password
            });

            return res.status(200).json(response.data)

        } catch (error) {

            console.log(error)

            return res.status(400).json({
                "message": error.response.data.message
            })

        }
    }

}

export { CreateUserController }
