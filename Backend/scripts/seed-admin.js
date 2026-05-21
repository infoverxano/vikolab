// // backend/scripts/seed-admin.js
// import "dotenv/config";
// import { db } from "../db/index.js";
// import { users, accounts } from "../db/schema.js";
// import { eq } from "drizzle-orm";
// import { randomUUID } from "crypto";
// import { scrypt, randomBytes } from "crypto";
// import { promisify } from "util";

// const scryptAsync = promisify(scrypt);

// async function hashPassword(password) {
//   const salt = randomBytes(16).toString("hex");
//   const buf = await scryptAsync(password, salt, 64);
//   return `${buf.toString("hex")}.${salt}`;
// }

// const id = randomUUID();
// const email = "admin@moncrm.com";
// const password = "Admin123!";

// // Check si déjà existe
// const existing = await db.select().from(users).where(eq(users.email, email));
// if (existing.length > 0) {
//   console.log("✅ Super admin existe déjà :", email);
//   process.exit(0);
// }

// const hashedPassword = await hashPassword(password);

// await db.insert(users).values({
//   id,
//   first_name: "Ayoub",
//   last_name:"Ibidarne",
//   email,
//   emailVerified: true,
//   role: "super_admin",
// });

// await db.insert(accounts).values({
//   id: randomUUID(),
//   userId: id,
//   accountId: id,
//   providerId: "credential",
//   password: hashedPassword,
// });

// console.log("✅ Super admin créé !");
// console.log("   Email    :", email);
// console.log("   Password :", password);
// process.exit(0);

import "dotenv/config";
import { db } from "../db/index.js";
import { users, accounts } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { auth } from "../auth/index.js";

const email = "admin@moncrm.com";
const password = "Admin123!";

// Supprimer l'ancien si existe
const existing = await db.select().from(users).where(eq(users.email, email));
if (existing.length > 0) {
  console.log("🗑️  Suppression ancien admin...");
  await db.delete(accounts).where(eq(accounts.userId, existing[0].id));
  await db.delete(users).where(eq(users.email, email));
}

//   last_name:"Ibidarne",
// Créer via Better Auth (hash correct)
const result = await auth.api.signUpEmail({
  body: { 
    name:"Ayoub Ibidarne",
    first_name: "Ayoub" ,
    last_name:"Ibidarne",
    company:"Atlas Media",
    city:"Casablanca",
    country:"Morocco",
    address:"Maarif",
    website:"https://atlasmedia.ma",
    phone1:"0677687809",
    image:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    email, password 
  },
});

// Mettre le rôle super_admin
await db.update(users)
  .set({ role: "super_admin", emailVerified: true })
  .where(eq(users.email, email));

console.log("✅ Super admin créé !");
console.log("   Email    :", email);
console.log("   Password :", password);
process.exit(0);