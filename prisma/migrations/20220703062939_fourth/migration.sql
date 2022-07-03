-- CreateTable
CREATE TABLE "SharedCollection" (
    "id" SERIAL NOT NULL,
    "shareHolderId" INTEGER NOT NULL,
    "userCollectionId" INTEGER NOT NULL,

    CONSTRAINT "SharedCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedCollection" ADD CONSTRAINT "SharedCollection_userCollectionId_fkey" FOREIGN KEY ("userCollectionId") REFERENCES "UserCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
