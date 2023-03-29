-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "plate" VARCHAR(7) NOT NULL,
    "renavam" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year_launch" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "registered_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplies" (
    "id" SERIAL NOT NULL,
    "qtd" DOUBLE PRECISION NOT NULL,
    "type_fuel" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "registered_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_registered_by_fkey" FOREIGN KEY ("registered_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplies" ADD CONSTRAINT "supplies_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplies" ADD CONSTRAINT "supplies_registered_by_fkey" FOREIGN KEY ("registered_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
