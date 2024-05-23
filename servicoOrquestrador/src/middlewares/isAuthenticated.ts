import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// este é um middleware que será usado para validar rotas privadas,
// ele recebe um token do tipo 'Bearer' passado pelo header da requisicao
// caso o token seja válido, é usado o next() para avancar para a rota privada
// caso o token seja inválido, é gerado um erro e a rota nao prossegue

interface payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction //usado para avançar com a requisição da rota
){

    //receber o token que vem no campo 'authorization' do 'headers' da requisicao (neste caso o 'Bearer')
    const authToken = req.headers.authorization

    if(!authToken){
        //se nao receber um token, retorna erro nao autorizado
        return res.status(401).json({"message": "Token não encontrado."}).end();
    }

    // é recebido uma string "bearer GWeosf3..." por exemplo
    // entao separa a string pelo espaço e guarda apenas o valor do token, eliminando o que vem antes do espaço
    const [, token] = authToken.split(" ")

    try{
        //validar token
        //o verify confere se o token está de acordo com a senha privada da variavel de ambiente
        const { sub } = verify(
            token,
            process.env.JWT_SECRET_MD5
        ) as payload;

        // se for válido, adicionar o token na requisição para acessar nos outros métodos da rota com o atributo req.token
        // dessa forma, todas as rotas que chamarem esse middleware terao acesso ao id do user autenticado apenas usando req.idUser
        req.idUser = sub;

        // prosseguir rota caso nao haja nenhum erro
        return next()

    }catch(err){
        // retornar 401 (nao autorizado) caso haja um erro na validacao do token
        return res.status(401).json({"message": "Token de autenticação inválido"}).end()
    }
}