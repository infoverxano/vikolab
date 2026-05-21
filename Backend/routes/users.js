// backend/routes/users.js — géré par admin/super_admin uniquement
import { Router } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { requireRole, requireAuth, requirePermission } from "../middleware/rbac.js";
import { auth } from "../auth/index.js";

const router = Router();

// Lister les users — admin+
router.get("/", requireRole("admin"), async (req, res) => {
  try {
    const all = await db.select({
      id: users.id, name: users.name,
      email: users.email, role: users.role, createdAt: users.createdAt,
    }).from(users);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", requireAuth, requirePermission("read"), async (req, res) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id));

    if (!user) {
      return res.status(404).json({ error: "User introuvable" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Créer un user — admin+ (les clients ne peuvent pas s'inscrire)
router.post("/", requireRole("admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // super_admin only peut créer un autre super_admin
    if (role === "super_admin" && req.user.role !== "super_admin") {
      return res.status(403).json({ error: "Seul super_admin peut créer un super_admin" });
    }
    const newUser = await auth.api.createUser({
      body: { name, email, password, role: role || "user" },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Changer le rôle — super_admin seulement
router.patch("/:id/role", requireRole("super_admin"), async (req, res) => {
  try {
    const { role } = req.body;
    const [updated] = await db.update(users)
      .set({ role })
      .where(eq(users.id, req.params.id))
      .returning();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;