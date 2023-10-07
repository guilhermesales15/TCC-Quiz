import prismaClient from "../../../prisma";

class DetailAlunoService{
    async execute (user_id: string){

        const aluno = await prismaClient.userAluno.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
                birthDate: true
            }
        })
        return aluno;
    }
}

export {DetailAlunoService};