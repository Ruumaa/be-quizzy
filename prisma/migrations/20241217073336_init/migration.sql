-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "high_score" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSessions" (
    "id" TEXT NOT NULL,
    "current_question_idx" INTEGER NOT NULL DEFAULT 0,
    "user_answers" TEXT[],
    "time_left" INTEGER NOT NULL DEFAULT 90,
    "user_id" TEXT NOT NULL,
    "quizzes" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "QuizSessions" ADD CONSTRAINT "QuizSessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
