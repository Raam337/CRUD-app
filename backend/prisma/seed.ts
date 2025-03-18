import { PrismaClient } from "@prisma/client";
import casual from "casual";

const prisma = new PrismaClient();

async function main() {
  await prisma.person.deleteMany({})
  for (let id = 1; id < 20; id++) {
    await prisma.person.upsert({
      create: {
        id,
        name: casual.first_name,
        surname: casual.last_name ,
        dob: new Date(casual.date('YYYY-MM-DD')),
        phone: casual.integer( 30_000_000, 90_000_000 ),
        email: casual.email

      },
      update: {},
      where: { id },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });