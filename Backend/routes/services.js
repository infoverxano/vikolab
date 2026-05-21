// backend/routes/services.js
import { Router }   from "express";
import { db }       from "../db/index.js";
import { services, users } from "../db/schema.js";
import { eq }       from "drizzle-orm";
import { requireAuth, requirePermission } from "../middleware/rbac.js";
import { randomUUID } from "crypto";

const router = Router();

// ── GET /api/services  — all connected roles ──────────────────────────────
router.get("/", async (req, res) => {
  try {
    const all = await db
      .select({
        id:          services.id,
        userId:      services.userId,
        name:        services.name,
        description: services.description,
        nameAr:        services.nameAr,
        descriptionAr: services.descriptionAr,
        icon:        services.icon,
        image:       services.image,
        createdAt:   services.createdAt,
        updatedAt:   services.updatedAt,
        createdBy:   users.name,
      })
      .from(services)
      .leftJoin(users, eq(services.userId, users.id))
      .orderBy(services.createdAt);

    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/services/:id ─────────────────────────────────────────────────
router.get("/:id", requireAuth, requirePermission("read"), async (req, res) => {
  try {
    const [service] = await db
      .select({
        id:          services.id,
        userId:      services.userId,
        name:        services.name,
        description: services.description,
        nameAr:        services.nameAr,
        descriptionAr: services.descriptionAr,
        icon:        services.icon,
        image:       services.image,
        createdAt:   services.createdAt,
        updatedAt:   services.updatedAt,
        createdBy:   users.name,
      })
      .from(services)
      .leftJoin(users, eq(services.userId, users.id))
      .where(eq(services.id, req.params.id));

    if (!service) return res.status(404).json({ error: "Service introuvable" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/services — admin & super_admin ──────────────────────────────
router.post("/", requireAuth, requirePermission("create"), async (req, res) => {
  try {
    console.log(req.body);

    const { name, description, icon, image ,nameAr,descriptionAr} = req.body;

    if (!name?.trim() && !nameAr?.trim() ) {
      return res.status(400).json({ error: "name is required" });
    }

    const [service] = await db
      .insert(services)
      .values({
        id:          randomUUID(),
        userId:      req.user.id,   // comes from Better Auth session via requireAuth
        name:        name.trim(),
        description: description ?? null,
        nameAr:        nameAr?.trim(),
        descriptionAr: descriptionAr ?? null,
        icon:        icon        ?? null,
        image:       image       ?? null,
      })
      .returning();

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/services/:id — admin & super_admin ───────────────────────────
router.put("/:id", requireAuth, requirePermission("update"), async (req, res) => {
  try {
    const { name, description, icon, image ,nameAr,descriptionAr} = req.body;

    const [service] = await db
      .update(services)
      .set({
        ...(name        !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description }),
        ...(nameAr        !== undefined && { nameAr: nameAr.trim() }),
        ...(descriptionAr !== undefined && { descriptionAr }),
        ...(icon        !== undefined && { icon }),
        ...(image       !== undefined && { image: image ?? null }),
        updatedAt: new Date(),
      })
      .where(eq(services.id, req.params.id))
      .returning();

    if (!service) return res.status(404).json({ error: "Service introuvable" });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/services/:id — super_admin only ───────────────────────────
router.delete("/:id", requireAuth, requirePermission("delete"), async (req, res) => {
  try {
    await db.delete(services).where(eq(services.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;