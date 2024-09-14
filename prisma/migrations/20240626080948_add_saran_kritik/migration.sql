-- CreateTable
CREATE TABLE "KritikSaran" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "subjek" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "upvoteUser" JSONB,
    "donwvoteUser" JSONB,
    "status" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KritikSaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KritikSaran" ADD CONSTRAINT "KritikSaran_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
