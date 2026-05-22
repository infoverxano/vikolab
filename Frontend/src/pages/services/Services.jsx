// frontend/pages/Services.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import useServices from "../../contexts/ServicesContext";
import EditServiceModal from "./EditServiceModal";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Wrench,
  AlertTriangle,
  Loader2,

  Rocket,
  Lightbulb,
  Palette,
  Settings,
  Shield,
  BarChart3,
  Globe,
  Smartphone,
  Cloud,

  CreditCard,
  FileText,
  Image,
  Layout,
  Store,
  Car,
  Share2,
  Monitor,
  Tag,
  Megaphone,

  Sticker,
  Signpost,
  ScrollText,
  Building2,
  Menu,
  Ticket,
  Percent,
  Video,
  ShoppingBag,
  Printer,
} from "lucide-react";

const ICON_MAP = {
  rocket: Rocket,
  lightbulb: Lightbulb,
  palette: Palette,
  settings: Settings,
  shield: Shield,
  chart: BarChart3,
  globe: Globe,
  wrench: Wrench,
  smartphone: Smartphone,
  cloud: Cloud,

  creditcard: CreditCard,
  filetext: FileText,
  image: Image,
  layout: Layout,
  store: Store,
  car: Car,
  share: Share2,
  monitor: Monitor,
  tag: Tag,
  megaphone: Megaphone,

  sticker: Sticker,
  signpost: Signpost,
  scrolltext: ScrollText,
  building: Building2,
  menu: Menu,
  ticket: Ticket,
  percent: Percent,
  video: Video,
  shoppingbag: ShoppingBag,
  printer: Printer,
};
// ── Icon display: image > emoji > initials ────────────────────────────────
function ServiceIcon({ icon, image, name }) {
  if (image) {
    return <img src={image} alt={name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />;
  }
  if (icon) {
    const IconComponent = ICON_MAP[icon];

    if (!IconComponent) {
      return (
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
          ?
        </div>
      );
    }

    return (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-white/60 flex items-center justify-center shadow-sm">
        <IconComponent size={26} className="text-blue-600" />
      </div>
    );
  }
}

export default function Services() {
  const navigate = useNavigate();
  const { services, loading, error, fetchServices, deleteService } = useServices();

  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const filtered = services.filter((s) =>
    [s.name, s.description, s.createdBy].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeletingId(deleteTarget.id);
      await deleteService(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen pb-8 font-sans relative overflow-hidden" style={{ background: "#f9fafb" }}>
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Page header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">Portfolio</p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Services</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard/services/new")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
        >
          <Plus size={18} /> New Service
        </button>
      </div>

      {/* Search */}
      <div className="relative z-10 mb-6">
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="relative z-10 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading services…</p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="relative z-10 bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-red-500">{error}</div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="relative z-10 flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl"><Wrench size={30} className="text-blue-500" /></div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">No services yet</p>
            <p className="text-xs text-gray-400 mt-1">
              {search ? "No results for your search." : "Create your first service to get started."}
            </p>
          </div>
          {!search && (
            <button
              onClick={() => navigate("/dashboard/services/new")}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              + New Service
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="group bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Icon + action buttons */}
              <div className="flex items-start justify-between">
                <ServiceIcon icon={service.icon} image={service.image} name={service.name} />
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditTarget(service)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-gray-400 text-sm transition-all"
                    title="Edit"
                  ><Pencil size={15} /></button>
                  <button
                    onClick={() => setDeleteTarget(service)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-400 text-sm transition-all"
                    title="Delete"
                  ><Trash2 size={15} /></button>
                </div>
              </div>

              {/* Name + description */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug">
                  {service.name}
                </h3>

                {service.nameAr && (
                  <p
                    dir="rtl"
                    className="text-xs text-gray-500 mt-1 font-medium"
                  >
                    {service.nameAr}
                  </p>
                )}
                {service.description && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {service.description}
                  </p>
                )}

                {service.descriptionAr && (
                  <p
                    dir="rtl"
                    className="text-xs text-gray-500 mt-1 line-clamp-2"
                  >
                    {service.descriptionAr}
                  </p>
                )}
              </div>

              {/* Created by */}
              {service.createdBy && (
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-white text-[9px] font-bold">
                    {service.createdBy.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-[11px] text-gray-400 truncate">{service.createdBy}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      <EditServiceModal
        service={editTarget}
        opened={!!editTarget}
        onClose={() => setEditTarget(null)}

      />

      {/* Delete confirm modal */}
      <Modal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={
          <div>
            <p className="text-[11px] font-semibold text-red-400 uppercase tracking-widest mb-0.5">Services</p>
            <h2 className="text-base font-semibold text-gray-800">Delete Service</h2>
          </div>
        }
        centered
        size="sm"
        radius="xl"
        overlayProps={{ blur: 3 }}
        styles={{
          content: { background: "rgba(255,255,255,0.90)", backdropFilter: "blur(16px)" },
          header: { background: "transparent" },
        }}
      >
        <div className="space-y-5 pb-2">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl"><AlertTriangle size={20} className="text-red-500" /></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Delete <span className="text-red-500">"{deleteTarget?.name}"</span>?
              </p>
              <p className="text-xs text-gray-400 mt-0.5">This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              disabled={!!deletingId}
              className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={!!deletingId}
              className="flex-1 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {deletingId ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting…
                </>
              ) : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}