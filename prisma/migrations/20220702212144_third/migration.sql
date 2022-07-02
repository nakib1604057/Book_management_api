-- CreateTable
CREATE TABLE "UserCollection" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
