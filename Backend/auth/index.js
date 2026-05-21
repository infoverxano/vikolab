// // backend/auth/index.js
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema.js";

// export const auth = betterAuth({
//   secret: process.env.BETTER_AUTH_SECRET,
//   database: drizzleAdapter(db, {
//     provider: "pg",
//     schema: {
//       user: schema.users,
//       session: schema.sessions,
//       account: schema.accounts,
//       verification: schema.verifications,
//     },
//   }),

//   emailAndPassword: {
//     enabled: true,
//     // Les clients ne peuvent PAS s'inscrire eux-mêmes
//     // Seuls les admins créent des comptes
//     signupDisabled: false,
//   },

//   session: {
//     expiresIn: 60 * 60 * 24 * 7, // 7 jours
//     updateAge: 60 * 60 * 24,      // refresh si > 1 jour
//   },

//   trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
// });

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
  ],

  advanced: {
    disableCsrfCheck: true, // ← fix le problème Origin
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
    signupDisabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "user",
      },
      first_name: {
        type: "string",
        required: true,
      },
      last_name: {
        type: "string",
        required: true,
      },
      company: {
        type: "string",
        required: false,
      },
      city: {
        type: "string",
        required: false,
      },
      country: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
      website: {
        type: "string",
        required: false,
      },
      phone1: {
        type: "string",
        required: false,
      },
      image: {
        type: "string",
        required: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
