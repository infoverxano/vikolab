// backend/db/schema.js
import { pgTable, text, timestamp, boolean, pgEnum, integer, decimal, json } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum("role", ["super_admin", "admin", "user"]);

// Tables requises par Better Auth
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name:text("name").notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  city: text("city"),
  country:text("country"),
  address:text("address"),
  company:text("company"),
  website:text("website"),
  phone1:text("phone1"),
  phone2:text("phone2"),
  notes:text("notes"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  password: text("password"),           // ← ajoute cette ligne
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Ta table métier : clients
export const clients = pgTable("clients", {
  id: text("id").primaryKey(),
  name:text("name").notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  city: text("city"),
  country:text("country"),
  address:text("address"),
  website:text("website"),
  status: text("status").default("active"),
  notes: text("notes"),
  image: text("image"),
  createdBy: text("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});



// ── Services table ────────────────────────────────────────────────────────
export const services = pgTable("services", {
  id:          text("id").primaryKey(),
  userId:      text("user_id").references(() => users.id, { onDelete: "cascade" }),
  name:        text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  icon:        text("icon"),          // emoji or short string e.g. "🚀"
  image:       text("image"),         // Cloudinary URL
  createdAt:   timestamp("created_at").notNull().defaultNow(),
  updatedAt:   timestamp("updated_at").notNull().defaultNow(),
});



// ── Portfolios table ────────────────────────────────────────────────────────
export const portfolios = pgTable("portfolios", {
  id:          text("id").primaryKey(),
  userId:      text("user_id").references(() => users.id, { onDelete: "cascade" }),
  name:        text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  category: text("category"),
  categoryAr: text("category_ar"),
  image:       text("image"),
  gallery: json("gallery"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
  updatedAt:   timestamp("updated_at").notNull().defaultNow(),
});






/* =========================
   ENUMS
========================= */

// export const projectStatusEnum = pgEnum("project_status", [
//   "draft",
//   "pending",
//   "in_progress",
//   "review",
//   "completed",
//   "cancelled",
// ]);

// export const projectTypeEnum = pgEnum("project_type", [
//   "website",
//   "ecommerce",
//   "branding",
//   "seo",
//   "marketing",
//   "design",
//   "wordpress",
//   "Shopify"
// ]);

// export const paymentMethodEnum = pgEnum("payment_method", [
//   "cash",
//   "bank_transfer",
//   "paypal",
//   "credit_card",
//   "check",
// ]);

// export const paymentStatusEnum = pgEnum("payment_status", [
//   "pending",
//   "partial",
//   "paid",
//   "refunded",
// ]);

// /* =========================
//    PROJECTS TABLE
// ========================= */

// export const projects = pgTable("projects", {
//   id: text("id").primaryKey(),

//   // Relations
//   userId: text("user_id")
//     .references(() => users.id, { onDelete: "set null" }),

//   clientId: text("client_id")
//     .references(() => clients.id, { onDelete: "cascade" }),

//   /* ===== BASIC INFO ===== */

//   title: text("title").notNull(),

//   websiteName: text("website_name"),

//   description: text("description"),

//   type: projectTypeEnum("type").default("website"),

//   status: projectStatusEnum("status").default("pending"),

//   progress: integer("progress").default(0),

//   /* ===== BRANDING ===== */

//   logo: text("logo"),

//   thumbnail: text("thumbnail"),

//   gallery: json("gallery"),

//   /* ===== WEBSITE ===== */

//   websiteUrl: text("website_url"),

//   adminUrl: text("admin_url"),

//   /* ===== WORDPRESS ===== */

//   wordpressUrl: text("wordpress_url"),

//   wordpressEmail: text("wordpress_email"),

//   wordpressUsername: text("wordpress_username"),

//   wordpressPassword: text("wordpress_password"),

//   /* ===== GOOGLE ===== */

//   googleConsoleLinked:
//     boolean("google_console_linked").default(false),

//   googleAnalyticsLinked:
//     boolean("google_analytics_linked").default(false),

//   /* ===== CONTENT ===== */

//   technologies: json("technologies"),

//   inspirationTemplates:
//     json("inspiration_templates"),

//   attachments: json("attachments"),

//   /* ===== PROJECT DETAILS ===== */

//   budget: decimal("budget", {
//     precision: 10,
//     scale: 2,
//   }),

//   estimatedDays: integer("estimated_days"),

//   startDate: timestamp("start_date"),

//   deadline: timestamp("deadline"),

//   completedAt: timestamp("completed_at"),

//   /* ===== NOTES ===== */

//   notes: text("notes"),

//   /* ===== SYSTEM ===== */

//   createdAt: timestamp("created_at")
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .defaultNow(),
// });

// /* =========================
//    PAYMENTS TABLE
// ========================= */

// export const payments = pgTable("payments", {
//   id: text("id").primaryKey(),

//   // Relations
//   projectId: text("project_id")
//     .notNull()
//     .references(() => projects.id, { onDelete: "cascade" }),

//   clientId: text("client_id")
//     .references(() => clients.id, { onDelete: "set null" }),

//   userId: text("user_id")
//     .references(() => users.id, { onDelete: "set null" }),

//   /* ===== PAYMENT INFO ===== */

//   amount: decimal("amount", {
//     precision: 10,
//     scale: 2,
//   }).notNull(),

//   currency: text("currency").default("MAD"),

//   method: paymentMethodEnum("method"),

//   status: paymentStatusEnum("status")
//     .default("pending"),

//   transactionId: text("transaction_id"),

//   invoiceNumber: text("invoice_number"),

//   /* ===== DATES ===== */

//   paymentDate: timestamp("payment_date"),

//   dueDate: timestamp("due_date"),

//   /* ===== FILES ===== */

//   receipt: text("receipt"),

//   /* ===== NOTES ===== */

//   notes: text("notes"),

//   /* ===== SYSTEM ===== */

//   createdAt: timestamp("created_at")
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .defaultNow(),
// });