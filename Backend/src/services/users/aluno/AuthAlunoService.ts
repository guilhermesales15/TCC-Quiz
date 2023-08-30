import prismaClient from "../../../prisma";
import { compare } from "bcryptjs";
import {sign } from 'jsonwebtoken';

interface AuthRequest {
  email: string;
  password: string;
}

class AuthAlunoService {
  async execute({ email, password }: AuthRequest) {
    try {
      // Verificando se o email existe
      const userAluno = await prismaClient.userAluno.findFirst({
        where: {
          email: email,
        },
      });

      if (!userAluno) {
        throw new Error("Email incorreto ou não existe");
      }

      if (userAluno.password) {
        // Verificando se a senha existe e está correta
        const passwordMatch = await compare(password, userAluno.password);

        if (!passwordMatch) {
          throw new Error("Senha incorreta ou não existe");
        }

        
      const token = sign(
        {
          name: userAluno.name,
          email: userAluno.email
        },
        process.env.JWT_SECRET,
        {
          subject: userAluno.id,
          expiresIn: '30d'
        }
      )

      return {
        id: userAluno.id,
        name: userAluno.name,
        email: userAluno.email,
        birthDate: userAluno.birthDate,
        token: token
      }

        // Caso tudo esteja certo, você pode retornar alguma indicação de sucesso
        
      } else {
        throw new Error("Usuário não possui senha");
      }

    } catch (error) {
      // Captura e lida com exceções
      throw new Error("Erro ao autenticar usuário");
    }
   

  }
}

export { AuthAlunoService };
