-- AlterTable
CREATE SEQUENCE analysis_analysisid_seq;
ALTER TABLE "Analysis" ALTER COLUMN "analysisId" SET DEFAULT nextval('analysis_analysisid_seq');
ALTER SEQUENCE analysis_analysisid_seq OWNED BY "Analysis"."analysisId";
