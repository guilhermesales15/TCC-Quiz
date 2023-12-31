import prismaClient from "../../../prisma";

class DetailProfService{
    async execute (user_id: string){

        const prof = await prismaClient.userProf.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        return prof
    }
}

export {DetailProfService};