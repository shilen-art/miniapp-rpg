-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "username" VARCHAR(255),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "locale" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletLink" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chain" VARCHAR(32) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVerifiedAt" TIMESTAMP(3),

    CONSTRAINT "WalletLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetaAccess" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "BetaAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "WalletLink_userId_idx" ON "WalletLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletLink_chain_address_key" ON "WalletLink"("chain", "address");

-- CreateIndex
CREATE INDEX "BetaAccess_userId_idx" ON "BetaAccess"("userId");

-- AddForeignKey
ALTER TABLE "WalletLink" ADD CONSTRAINT "WalletLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetaAccess" ADD CONSTRAINT "BetaAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
