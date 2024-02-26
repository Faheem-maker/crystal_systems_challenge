/*
  Warnings:

  - You are about to drop the column `birthdy` on the `Account` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL,
    "modified_at" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("created_at", "email", "first_name", "id", "last_name", "modified_at", "password", "phone") SELECT "created_at", "email", "first_name", "id", "last_name", "modified_at", "password", "phone" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
