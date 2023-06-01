-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL,
    "id_api" BIGINT NOT NULL,
    "nome_popular" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "escudo" TEXT NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" TEXT NOT NULL,
    "id_api" BIGINT NOT NULL,
    "placar" TEXT NOT NULL,
    "timeMandanteId" TEXT NOT NULL,
    "timeVIsitanteId" TEXT NOT NULL,
    "placar_mandante" BIGINT NOT NULL,
    "placar_visante" BIGINT NOT NULL,
    "data_hora_realizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Time_id_api_key" ON "Time"("id_api");

-- CreateIndex
CREATE UNIQUE INDEX "Partida_id_api_key" ON "Partida"("id_api");

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_timeMandanteId_fkey" FOREIGN KEY ("timeMandanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_timeVIsitanteId_fkey" FOREIGN KEY ("timeVIsitanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
