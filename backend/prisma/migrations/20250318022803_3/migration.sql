/*
  Warnings:

  - You are about to alter the column `phone` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Person" ("dob", "email", "id", "name", "phone", "surname") SELECT "dob", "email", "id", "name", "phone", "surname" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
