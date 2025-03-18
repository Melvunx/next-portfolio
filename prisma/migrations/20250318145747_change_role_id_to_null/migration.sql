-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_roleId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "roleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
