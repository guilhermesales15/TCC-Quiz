-- CreateTable
CREATE TABLE "pergunta" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "banner" TEXT NOT NULL,

    CONSTRAINT "pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nivel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opcao" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL,
    "perguntaId" INTEGER NOT NULL,

    CONSTRAINT "opcao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opcao" ADD CONSTRAINT "opcao_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
