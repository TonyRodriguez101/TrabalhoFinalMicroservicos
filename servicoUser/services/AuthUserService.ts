// requisicoes
import { Request, Response } from "express";

// lidar com senhas cifradas
import { compare } from "bcryptjs";

// jwt
import { sign } from "jsonwebtoken";

// importar modelos da base de dados
import { User } from "../sequelize/sequelize";
import { Model } from "sequelize";

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {

    async handle(req: Request, res: Response){

        try{
            // receber email e password do body
            const { email, password } = req.body as AuthRequest

            console.log("Corpo recebido da requisicao: ", email, password)

            // 'user' conterá o valor recebido pela query
            // tipando 'user' como  'Model<any, any>' (padrao do sequelize)
            // ou 'null' caso nao seja encontrado nada
            const user: Model<any, any> | null = await User.findOne({
                where: {
                    email: email
                }
            });

            // se nao for encontrado nenhum email..
            if (!user) {
                throw new Error("Email e/ou senha incorretos.")
            }

            // se existir um email, então prossegue com a verificação

            // acessar os atributos do user
            const passwordUser = user.get("password") as string;
            const nameUser = user.get("name") as string;
            const emailUser = user.get("email") as string;
            const id = user.get("id") as string;

            // 'compare' (bcryptjs) compara automaticamente o password da request com o password cifrado da db
            // retorna true ou false
            const passwordMatch = await compare(password, passwordUser)
            
            if(!passwordMatch){
                throw new Error("Email e/ou senha incorretos.");
            }

            // caso nao haja nenhum erro, gerar token jwt
            // gerar token JWT
            // é gerado um token novo sempre que o user faz login
            const token = sign(
                // payload (conteudo do token)
                {
                    name: nameUser,
                    email: emailUser
                },
                // chave privada do .env
                process.env.JWT_SECRET_MD5,
                {
                    subject: id,
                    expiresIn: "30d" //token expira em 30 dias
                }
            )

            const response =  { 
                id: id,
                name: nameUser,
                email: emailUser,
                token: token
            }

            return res.status(200).json(response)

        } catch(err){

            console.log(`Erro no serviço de autenticação: ${err}`)

            return res.status(400).json({
                "message": err.message
            })

        }     
    } 

}

export { AuthUserService }
