import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent variable declaration conflicts in the global scope during hot-reloading in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// Ensure PrismaClient is instantiated only once in development and not recreated on every module reload
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export default db;
