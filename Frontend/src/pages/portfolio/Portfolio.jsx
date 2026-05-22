import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Plus,
  Search,
  X,
  Image as ImageIcon,
  Tag,
  LayoutGrid,
  List,
  Trash2,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { LoadingOverlay } from "@mantine/core";
import usePortfolios from "../../contexts/PortfoliosContext";
import { useLanguage } from "../../contexts/LanguageContext";

// const CATEGORIES = [
//   "All",
//   "Web Design",
//   "Mobile App",
//   "Branding",
//   "E-commerce",
//   "UI/UX",
//   "Photography",
//   "Video",
//   "Other",
// ];

const CATEGORIES = [
  "All",
  "Business Card",
  "Flyer",
  "Banner",
  "Roll-Up",
  "Poster",
  "Catalogue",
  "Brochure",
  "Logo",
  "Brand Identity",
  "Sticker",
  "Label",
  "Packaging",
  "T-Shirt Print",
  "Mug Print",
  "Light Sign",
  "Outdoor Sign",
  "Shop Facade",
  "Vehicle Wrap",
  "Wall Mural",
  "Exhibition Stand",
  "Social Media Post",
  "Social Media Cover",
  "Email Signature",
  "Presentation",
  "Invoice / Quote",
  "Stamp",
  "Envelope",
  "Notebook",
  "Menu",
  "Other",
];
export default function Portfolio() {
  const navigate = useNavigate();
  const { portfolios, loading, fetchPortfolios, deletePortfolio } =
    usePortfolios();
  const { lang } = useLanguage();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const filtered = portfolios.filter((p) => {
    const name = lang === "ar" ? p.nameAr : p.name;
    const matchSearch = name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this portfolio?")) return;
    try {
      setDeletingId(id);
      await deletePortfolio(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className="min-h-screen pb-12 relative font-sans"
      style={{ background: "#f4f6f9" }}
    >
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#64748b 1px, transparent 1px),
            linear-gradient(90deg, #64748b 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-8 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.18em] leading-none mb-1">
                Portfolio
              </p>
              <h1 className="text-[22px] font-bold text-gray-900 leading-none tracking-tight">
                Projects
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/portfolio/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={15} />
            New Project
          </button>
        </div>

        {/* ── FILTERS BAR ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div className="flex gap-2 flex-wrap mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
          />

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <FolderOpen size={28} className="text-blue-300" />
              </div>
              <p className="text-gray-800 font-semibold text-base mb-1">
                No projects found
              </p>
              <p className="text-gray-400 text-sm mb-5">
                {search || activeCategory !== "All"
                  ? "Try adjusting your filters"
                  : "Create your first portfolio project"}
              </p>
              {!search && activeCategory === "All" && (
                <button
                  onClick={() => navigate("/dashboard/portfolio/new")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all"
                >
                  <Plus size={14} />
                  New Project
                </button>
              )}
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === "grid" && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PortfolioCard
                  key={p.id}
                  portfolio={p}
                  lang={lang}
                  deleting={deletingId === p.id}
                  onDelete={(e) => handleDelete(e, p.id)}
                  onClick={() =>
                    navigate(`/dashboard/portfolio/${p.id}`)
                  }
                />
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === "list" && filtered.length > 0 && (
            <div className="flex flex-col gap-3">
              {filtered.map((p) => (
                <PortfolioRow
                  key={p.id}
                  portfolio={p}
                  lang={lang}
                  deleting={deletingId === p.id}
                  onDelete={(e) => handleDelete(e, p.id)}
                  onClick={() =>
                    navigate(`/dashboard/portfolio/${p.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* count */}
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mt-5 text-center">
            {filtered.length}{" "}
            {filtered.length === 1 ? "project" : "projects"}
          </p>
        )}
      </div>
    </div>
  );
}

// ── GRID CARD ──────────────────────────────────────────────────────────────
function PortfolioCard({ portfolio, lang, deleting, onDelete, onClick }) {
  const name =
    lang === "ar" ? portfolio.nameAr : portfolio.name;
  const description =
    lang === "ar"
      ? portfolio.descriptionAr
      : portfolio.description;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-100 transition-all duration-200"
    >
      {/* Cover */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        {portfolio.image ? (
          <img
            src={portfolio.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <ImageIcon size={28} className="text-gray-300" />
            <span className="text-[11px] text-gray-300">No cover</span>
          </div>
        )}

        {/* Category badge */}
        {portfolio.category && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-blue-600 border border-blue-100 flex items-center gap-1">
            <Tag size={9} />
            {lang === "ar" ? portfolio.categoryAr : portfolio.category}
          </span>
        )}

        {/* Gallery count */}
        {portfolio.gallery?.length > 0 && (
          <span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[10px] font-semibold text-white flex items-center gap-1">
            <ImageIcon size={9} />
            {portfolio.gallery.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-50 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          <ExternalLink size={12} />
          View
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition disabled:opacity-50"
        >
          <Trash2 size={12} />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ── LIST ROW ───────────────────────────────────────────────────────────────
function PortfolioRow({ portfolio, lang, deleting, onDelete, onClick }) {
  const name =
    lang === "ar" ? portfolio.nameAr : portfolio.name;
  const description =
    lang === "ar"
      ? portfolio.descriptionAr
      : portfolio.description;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 px-4 py-3 cursor-pointer hover:shadow-md hover:border-blue-100 transition-all duration-200"
    >
      {/* Thumb */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        {portfolio.image ? (
          <img
            src={portfolio.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={20} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-bold text-gray-900 truncate">{name}</h3>
          {portfolio.category && (
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-[10px] font-semibold text-blue-600 flex-shrink-0">
              <Tag size={9} />
              {lang === "ar" ? portfolio.categoryAr : portfolio.category}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-400 truncate">{description}</p>
        )}
        {portfolio.gallery?.length > 0 && (
          <p className="text-[10px] text-gray-300 mt-0.5 flex items-center gap-1">
            <ImageIcon size={9} />
            {portfolio.gallery.length} images
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition"
        >
          <ExternalLink size={13} />
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition disabled:opacity-50"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}