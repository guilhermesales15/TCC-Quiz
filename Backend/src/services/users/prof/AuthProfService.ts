import prismaClient from "../../../prisma";
import { compare } from "bcryptjs";

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

        // Caso tudo esteja certo, você pode retornar alguma indicação de sucesso
        return "Autenticação bem-sucedida!";
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
