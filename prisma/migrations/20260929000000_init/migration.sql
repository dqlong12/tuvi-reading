CREATE TABLE "Profile" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "gender" TEXT NOT NULL,
  "birthDate" TIMESTAMP(3) NOT NULL,
  "birthTime" TEXT,
  "birthTimeAccuracy" TEXT NOT NULL,
  "birthPlace" TEXT NOT NULL,
  "timezone" TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reading" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "profileId" TEXT NOT NULL,
  "focusArea" TEXT NOT NULL,
  "lifeContext" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "synthesis" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Reading_slug_key" ON "Reading"("slug");
CREATE INDEX "Reading_profileId_idx" ON "Reading"("profileId");
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
