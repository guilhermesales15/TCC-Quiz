import prismaClient from "../../../prisma";

interface ItemRequest {
    texto: string,
    correta: boolean,
    pergunta_id: string
}

class CreateItemService{
    async execute({texto, correta, pergunta_id}: ItemRequest){
        return{ok:true}
    }
}

export { CreateItemService}