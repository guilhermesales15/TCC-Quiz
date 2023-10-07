import prismaClient from "../../../prisma";

class ListNivelSercice{
    async execute(){
       
        const nivel = await prismaClient.nivel.findMany({
            select:{
                id: true,
                nome: true
            }
        })

        return nivel

    }
}

export {ListNivelSercice}