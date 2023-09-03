import prismaClient from "../../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthProfService {
  async execute({ email, password }: AuthRequest) {
    try {
      // Verificando se o email existe
      const userProf = await prismaClient.userProf.findFirst({
        where: {
          email: email,
        },
      });

      if (!userProf) {
        throw new Error("Email incorreto ou não existe");
      }

      if (userProf.password) {
        // Verificando se a senha existe e está correta
        const passwordMatch = await compare(password, userProf.password);

        if (!passwordMatch) {
          throw new Error("Senha incorreta ou não existe");
        }

        // criando o token que será utilizado para acessar certas rotas
        const token = sign(
          {
            name: userProf.name,
            email: userProf.email
          },
          process.env.JWT_SECRET,
          {
            subject: userProf.id,
            expiresIn: '30d'
          }
        )
  
        return {
          id: userProf.id,
          name: userProf.name,
          email: userProf.email,
          token: token
        }
  
      } else {
        throw new Error("Usuário não possui senha");
      }
    } catch (error) {
      // Captura e lida com exceções
      throw new Error("Erro ao autenticar usuário");
    }
  }
}

export { AuthProfService };
