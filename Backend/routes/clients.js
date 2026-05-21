// backend/routes/clients.js
import { Router } from "express";
import { db } from "../db/index.js";
import { clients } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { requireAuth, requirePermission } from "../middleware/rbac.js";
import { randomUUID } from "crypto";

const router = Router();

// READ — tous les rôles connectés
router.get("/", requireAuth, requirePermission("read"), async (req, res) => {
  try {
    const all = await db.select().from(clients);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get("/:id", requireAuth, requirePermission("read"), async (req, res) => {
  try {
    const [client] = await db.select().from(clients).where(eq(clients.id, req.params.id));
    if (!client) return res.status(404).json({ error: "Client introuvable" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE — admin et super_admin
// router.post("/", requireAuth, requirePermission("create"), async (req, res) => {
//   try {
//     const { name, email, phone, company, notes } = req.body;
//     const [client] = await db.insert(clients).values({
//       id: randomUUID(),
//       name, email, phone, company, notes,
//       createdBy: req.user.id,
//     }).returning();
//     res.status(201).json(client);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/", requireAuth, requirePermission("create"), async (req, res) => {
  try {
    console.log(req.body);
    
    const { name,first_name, last_name, email, phone, company, notes, address, city, country, website, status, image } = req.body; // ← image

    const [client] = await db.insert(clients).values({
      id: randomUUID(),
      name,
      first_name,
      last_name,
      email,
      phone,
      company,
      notes,
      address, city, country, website, status,
      image: image ?? null, // ← image
      createdBy: req.user.id,
    }).returning();

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE — admin et super_admin
// router.put("/:id", requireAuth, requirePermission("update"), async (req, res) => {
//   try {
//     const { name, email, phone, company, notes, status } = req.body;
//     const [client] = await db.update(clients)
//       .set({ name, email, phone, company, notes, status, updatedAt: new Date() })
//       .where(eq(clients.id, req.params.id))
//       .returning();
//     res.json(client);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.put("/:id", requireAuth, requirePermission("update"), async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      company,
      address,
      city,
      country,
      website,
      notes,
      status,
      image 
    } = req.body;

    const [client] = await db
      .update(clients)
      .set({
        name: `${first_name} ${last_name}`,
        first_name,
        last_name,
        email,
        phone,
        company,
        address,
        city,
        country,
        website,
        notes,
        status,
        image: image ?? null,
        updatedAt: new Date()
      })
      .where(eq(clients.id, req.params.id))
      .returning();

    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE — super_admin seulement
router.delete("/:id", requireAuth, requirePermission("delete"), async (req, res) => {
  try {
    await db.delete(clients).where(eq(clients.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;