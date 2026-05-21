// backend/routes/portfolios.js
import { Router }   from "express";
import { db }       from "../db/index.js";
import { portfolios, users } from "../db/schema.js";
import { eq }       from "drizzle-orm";
import { requireAuth, requirePermission } from "../middleware/rbac.js";
import { randomUUID } from "crypto";

const router = Router();

// ── GET /api/portfolios  — all connected roles ──────────────────────────────
router.get("/", async (req, res) => {
  try {
    const all = await db
      .select({
        id:          portfolios.id,
        userId:      portfolios.userId,
        name:        portfolios.name,
        description: portfolios.description,
        nameAr:        portfolios.nameAr,
        descriptionAr: portfolios.descriptionAr,
        category: portfolios.category,
        categoryAr: portfolios.categoryAr,
        image:       portfolios.image,
        gallery: portfolios.gallery,
        createdAt:   portfolios.createdAt,
        updatedAt:   portfolios.updatedAt,
        createdBy:   users.name,
      })
      .from(portfolios)
      .leftJoin(users, eq(portfolios.userId, users.id))
      .orderBy(portfolios.createdAt);

    console.log(res)
    res.json(all);
  } catch (err) {
    console.error("GET /portfolios error:", err); // add this
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/portfolios/:id ─────────────────────────────────────────────────
router.get("/:id", requireAuth, requirePermission("read"), async (req, res) => {
  try {
    const [portfolio] = await db
      .select({
        id:          portfolios.id,
        userId:      portfolios.userId,
        name:        portfolios.name,
        description: portfolios.description,
        nameAr:        portfolios.nameAr,
        descriptionAr: portfolios.descriptionAr,
        category: portfolios.category,
        categoryAr: portfolios.categoryAr,
        image:       portfolios.image,
        gallery: portfolios.gallery,
        createdAt:   portfolios.createdAt,
        updatedAt:   portfolios.updatedAt,
        createdBy:   users.name,
      })
      .from(portfolios)
      .leftJoin(users, eq(portfolios.userId, users.id))
      .where(eq(portfolios.id, req.params.id));

    if (!portfolio) return res.status(404).json({ error: "portfolios introuvable" });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/portfolios — admin & super_admin ──────────────────────────────
router.post("/", requireAuth, requirePermission("create"), async (req, res) => {
  try {
    console.log(req.body);

    const { name, description, icon, image ,nameAr,descriptionAr,category,categoryAr,gallery} = req.body;

    if (!name?.trim() && !nameAr?.trim() ) {
      return res.status(400).json({ error: "name is required" });
    }

    const [portfolio] = await db
      .insert(portfolios)
      .values({
        id:          randomUUID(),
        userId:      req.user.id,   // comes from Better Auth session via requireAuth
        name:        name.trim(),
        description: description ?? null,
        nameAr:        nameAr?.trim(),
        descriptionAr: descriptionAr ?? null,
        category: category ?? null,
        categoryAr: categoryAr ?? null,
        image:       image       ?? null,
        gallery: gallery ?? []
      })
      .returning();

    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/portfolios/:id — admin & super_admin ───────────────────────────
router.put("/:id", requireAuth, requirePermission("update"), async (req, res) => {
  try {
    const { name, description, icon, image ,nameAr,descriptionAr,category,categoryAr,gallery} = req.body;

    const [portfolio] = await db
      .update(portfolios)
      .set({
        ...(name        !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description }),
        ...(nameAr        !== undefined && { nameAr: nameAr.trim() }),
        ...(descriptionAr !== undefined && { descriptionAr }),
        ...(category !== undefined && { category }),
        ...(categoryAr !== undefined && { categoryAr }),
        ...(image       !== undefined && { image: image ?? null }),
        ...(gallery       !== undefined && { gallery: gallery ?? [] }),
        updatedAt: new Date(),
      })
      .where(eq(portfolios.id, req.params.id))
      .returning();

    if (!portfolio) return res.status(404).json({ error: "portfolio introuvable" });
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/portfolios/:id — super_admin only ───────────────────────────
router.delete("/:id", requireAuth, requirePermission("delete"), async (req, res) => {
  try {
    await db.delete(portfolios).where(eq(portfolios.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;