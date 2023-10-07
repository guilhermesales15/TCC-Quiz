import prismaClient from "../../../prisma";

interface CategoryRequest{
    nome: string
}

class CreateNivelService{
    async execute({nome}: CategoryRequest){
        if(nome ===''){
            throw new Error('Nome invalido')
        }

        const nivel = await prismaClient.nivel.create({
            data:{
                nome: nome,
            },
            select:{
                id: true,
                nome: true
            }
        })

        return nivel;
    }
}

export {CreateNivelService}