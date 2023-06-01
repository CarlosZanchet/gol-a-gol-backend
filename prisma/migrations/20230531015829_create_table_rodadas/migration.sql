-- CreateTable
CREATE TABLE "Rodada" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rodada" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Rodada_pkey" PRIMARY KEY ("id")
);
