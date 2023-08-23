import prismaClient from "../../../prisma";


interface userRequest{
    name: string;
    email: string;
    password: string;
    birthDate: String;
}

class CreateAlunoService {
    async execute({name, email, password, birthDate}: userRequest){

        //Verificando se o email está sendo enviado
        if(!email){
            throw new Error("email inválido")
        }
        //verificando se o email já foi cadastrado
       const userAlreadyExist = await prismaClient.userAluno.findFirst({
        where: {
            email: email
        }
       })

       if(userAlreadyExist){
        throw new Error("Email já foi cadastrado")
       }
       //
       const [day, month, year] = birthDate.split("/");
       const birthDateISO = `${year}-${month}-${day}`;

       //criando o usuario-professor e 
       const userProf = await prismaClient.userAluno.create({
        data:{
            name: name,
            email: email,
            password: password,
            birthDate: new Date(birthDateISO),
        },select:{
            id:true,
            email: true,
            name: true,
            birthDate: true
        }

       })

       return userProf;
    }
}

export {CreateAlunoService};