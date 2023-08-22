interface userRequest{
    name: string;
    email: string;
    password: string;
}

class CreateProfService {
    async execute({name, email, password}: userRequest){
        return {ok: "true"}
    }
}

export {CreateProfService};