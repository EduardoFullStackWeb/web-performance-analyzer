-- CreateTable
CREATE TABLE "Analysis" (
    "analysisId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "firstContentfulPaint" DOUBLE PRECISION NOT NULL,
    "speedIndex" DOUBLE PRECISION NOT NULL,
    "timeToInteractive" DOUBLE PRECISION NOT NULL,
    "firstMeaningfulPaint" DOUBLE PRECISION NOT NULL,
    "firstCpuIdle" DOUBLE PRECISION NOT NULL,
    "estimatedInputLatency" INTEGER NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("analysisId")
);
