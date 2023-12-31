import prismaClient from "../../../prisma";
import { hash } from 'bcryptjs'

interface userRequest{
    name: string;
    email: string;
    password: string;
}

class CreateProfService {
    async execute({name, email, password}: userRequest){

        //Verificando se o email está sendo enviado
        if(!email){
            throw new Error("email inválido")
        }
        //verificando se o email já foi cadastrado
       const userAlreadyExist = await prismaClient.userProf.findFirst({
        where: {
            email: email
        }
       })

       if(userAlreadyExist){
        throw new Error("Email já foi cadastrado")
       }

       const passwordHash = await hash(password, 8)

       //criando o usuario-professor e 
       const userProf = await prismaClient.userProf.create({
        data:{
            name: name,
            email: email,
            password: passwordHash
        },select:{
            id:true,
            email: true,
            name: true,
        }

       })

       return userProf;
    }
}

export {CreateProfService};