// backend/middleware/rbac.js

// Hiérarchie des rôles
const ROLE_HIERARCHY = {
  super_admin: 3,
  admin: 2,
  user: 1,
};

// Vérifier si l'utilisateur est connecté
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Non authentifié" });
  }
  next();
}

// Vérifier un rôle minimum
export function requireRole(minRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Non authentifié" });
    }
    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] || 0;
    if (userLevel < requiredLevel) {
      return res.status(403).json({ error: "Permission insuffisante" });
    }
    next();
  };
}

// Permissions CRUD par rôle
const PERMISSIONS = {
  super_admin: ["create", "read", "update", "delete", "manage_users"],
  admin:       ["create", "read", "update", "delete"],
  user:        ["read"],
};

export function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Non authentifié" });
    }
    const perms = PERMISSIONS[req.user.role] || [];
    if (!perms.includes(permission)) {
      return res.status(403).json({ error: `Permission '${permission}' requise` });
    }
    next();
  };
}