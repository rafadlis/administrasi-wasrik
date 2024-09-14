/*
  Warnings:

  - A unique constraint covering the columns `[NIK]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_NIK_key" ON "Employee"("NIK");
