import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Tag,
  Images,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Pencil,
  Trash2,
  ImageIcon,
  AlignLeft,
  Globe,
} from "lucide-react";
import { LoadingOverlay } from "@mantine/core";
import usePortfolios from "../../contexts/PortfoliosContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PortfolioView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { portfolios, fetchPortfolios, deletePortfolio, loading } =
    usePortfolios();
  const { lang } = useLanguage();

  const [portfolio, setPortfolio] = useState(null);
  const [lightbox, setLightbox] = useState(null); // index or null
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!portfolios.length) fetchPortfolios();
  }, []);

  useEffect(() => {
    const found = portfolios.find((p) => p.id === id);
    if (found) setPortfolio(found);
  }, [portfolios, id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this portfolio project?")) return;
    try {
      setDeleting(true);
      await deletePortfolio(id);
      navigate("/dashboard/portfolio");
    } finally {
      setDeleting(false);
    }
  };

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImage = () =>
    setLightbox((i) => (i + 1) % gallery.length);

  const name = portfolio
    ? lang === "ar"
      ? portfolio.nameAr
      : portfolio.name
    : "";
  const description = portfolio
    ? lang === "ar"
      ? portfolio.descriptionAr
      : portfolio.description
    : "";
  const category = portfolio
    ? lang === "ar"
      ? portfolio.categoryAr
      : portfolio.category
    : "";
  const gallery = portfolio?.gallery || [];

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div
      className="min-h-screen pb-16 relative font-sans"
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

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-6 pt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.18em] leading-none mb-1">
                  Portfolio
                </p>
                <h1 className="text-[22px] font-bold text-gray-900 leading-none tracking-tight truncate max-w-[240px] sm:max-w-none">
                  {name || "Project"}
                </h1>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigate(`/dashboard/portfolio/${id}/edit`)
              }
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition shadow-sm"
            >
              <Pencil size={13} />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-red-100 text-sm font-semibold text-red-500 hover:bg-red-50 transition shadow-sm disabled:opacity-50"
            >
              <Trash2 size={13} />
              <span className="hidden sm:inline">
                {deleting ? "Deleting…" : "Delete"}
              </span>
            </button>
          </div>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative mb-5">
          <LoadingOverlay
            visible={loading && !portfolio}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
          />

          {/* Cover Hero */}
          <div className="w-full h-64 sm:h-80 bg-gray-100 relative overflow-hidden">
            {portfolio?.image ? (
              <img
                src={portfolio.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <ImageIcon size={24} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-300">No cover image</p>
              </div>
            )}

            {/* Category overlay badge */}
            {category && (
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-bold text-blue-600 border border-blue-100 shadow-sm">
                <Tag size={11} />
                {category}
              </span>
            )}
          </div>

          {/* Info grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

              {/* Created by */}
              {portfolio?.createdBy && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Created by
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {portfolio.createdBy}
                    </p>
                  </div>
                </div>
              )}

              {/* Created at */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Created
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(portfolio?.createdAt)}
                  </p>
                </div>
              </div>

              {/* Gallery count */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Images size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Gallery
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {gallery.length}{" "}
                    {gallery.length === 1 ? "image" : "images"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <AlignLeft size={14} className="text-blue-500" />
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Description
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}

            {/* Both languages if both exist */}
            {portfolio?.description && portfolio?.descriptionAr && lang !== "ar" && (
              <div className="mt-4 pt-4 border-t border-gray-100" dir="rtl">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={14} className="text-blue-500" />
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    الوصف
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {portfolio.descriptionAr}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── GALLERY SECTION ── */}
        {gallery.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Images size={13} className="text-blue-500" />
              </div>
              <h2 className="text-sm font-bold text-gray-800">
                Gallery
              </h2>
              <span className="ml-auto text-xs text-gray-400">
                {gallery.length} images
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group aspect-square rounded-xl overflow-hidden bg-gray-100 relative"
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <Images
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-xs font-semibold">
            {lightbox + 1} / {gallery.length}
          </p>

          {/* Prev */}
          {gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Image */}
          <img
            src={gallery[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />

          {/* Next */}
          {gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Thumbnails strip */}
          {gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(i);
                  }}
                  className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightbox
                      ? "border-white scale-110"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}