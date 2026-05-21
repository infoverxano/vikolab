// frontend/pages/NewService.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea, TextInput, LoadingOverlay } from "@mantine/core";
import useServices from "../../contexts/ServicesContext";
import useClients from './../../contexts/ClientsContext';

import {
  Rocket,
  Lightbulb,
  Palette,
  Settings,
  Shield,
  BarChart3,
  Globe,
  Wrench,
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
const ICON_OPTIONS = [
  { value: "rocket", icon: Rocket },
  { value: "lightbulb", icon: Lightbulb },
  { value: "palette", icon: Palette },
  { value: "settings", icon: Settings },
  { value: "shield", icon: Shield },
  { value: "chart", icon: BarChart3 },
  { value: "globe", icon: Globe },
  { value: "wrench", icon: Wrench },
  { value: "smartphone", icon: Smartphone },
  { value: "cloud", icon: Cloud },

  { value: "creditcard", icon: CreditCard },
  { value: "filetext", icon: FileText },
  { value: "image", icon: Image },
  { value: "layout", icon: Layout },
  { value: "store", icon: Store },
  { value: "car", icon: Car },
  { value: "share", icon: Share2 },
  { value: "monitor", icon: Monitor },
  { value: "tag", icon: Tag },
  { value: "megaphone", icon: Megaphone },

  { value: "sticker", icon: Sticker },
  { value: "signpost", icon: Signpost },
  { value: "scrolltext", icon: ScrollText },
  { value: "building", icon: Building2 },
  { value: "menu", icon: Menu },
  { value: "ticket", icon: Ticket },
  { value: "percent", icon: Percent },
  { value: "video", icon: Video },
  { value: "shoppingbag", icon: ShoppingBag },
  { value: "printer", icon: Printer },
];

export default function NewService() {
  const navigate = useNavigate();
  const { addService } = useServices();
  const { uploadToCloudinary } = useClients();
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({ name: "",nameAr: "", description: "",descriptionAr: "", icon: "" });

  const set = (key) => (value) =>
    setForm((f) => ({ ...f, [key]: value?.target ? value.target.value : value }));

  // ── Image ─────────────────────────────────────────────────────────────────
  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    try {
      setSaving(true);
      let image = null;
      if (imageFile) {
        setUploadingImage(true);
        image = await uploadToCloudinary(imageFile);
        setUploadingImage(false);
      }
      // userId is NOT sent — the server reads req.user.id from the session
      await addService({
        name: form.name.trim(),
        nameAr: form.nameAr.trim(),
        description: form.description.trim() || null,
        descriptionAr: form.descriptionAr.trim() || null,
        icon: form.icon || null,
        image,
      });
      navigate("/dashboard/services");
    } catch (err) {
      console.error(err);
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = saving || uploadingImage;
  const loadingLabel = uploadingImage ? "Uploading image..." : "Creating service...";

  // ── Icon preview ──────────────────────────────────────────────────────────
  const renderPreviewIcon = () => {
    if (imagePreview) {
      return <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-2xl object-cover shadow-md" />;
    }
    const IconPreview = ICON_OPTIONS.find((i) => i.value === form.icon)?.icon;
    return (
      <div>
        {IconPreview ? (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center">
            <IconPreview size={34} className="text-blue-600" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {form.name ? form.name.slice(0, 2).toUpperCase() : "S"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-8 font-sans relative overflow-hidden" style={{ background: "#f9fafb" }}>
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Page header */}
      <div className="relative z-10 mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-all shadow-sm"
        >
          ←
        </button>
        <div>
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">Services</p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">New Service</h1>
        </div>
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

        {/* ── Left: Preview card ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Avatar card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="ring-4 ring-white/80 rounded-2xl shadow-sm">
                {renderPreviewIcon()}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white text-sm transition-colors"
                  title="Upload image"
                >↑</button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white text-sm transition-colors"
                    title="Remove"
                  >✕</button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                style={{ position: "absolute", width: 0, height: 0, opacity: 0, overflow: "hidden", pointerEvents: "none" }}
              />
            </div>

            <div className="text-center">
              <p className="text-base font-semibold text-gray-800">{form.name || "New Service"}</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{form.description || "No description"}</p>
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full py-2 rounded-xl text-xs font-medium border border-dashed border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all"
            >
              {imagePreview ? "Change image" : "+ Upload image"}
            </button>
          </div>

          {/* Summary card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-5 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Preview</p>
            {[
              { label: "Name", value: form.name },
              { label: "Icon", value: form.icon },
              { label: "Description", value: form.description },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-xs text-gray-400 shrink-0">{label}</span>
                <span className={`text-xs font-medium truncate ${value ? "text-gray-700" : "text-gray-300"}`}>
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Form card ──────────────────────────────────────────── */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm overflow-hidden flex flex-col">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
            loaderProps={{
              children: (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-500 font-medium">{loadingLabel}</p>
                </div>
              ),
            }}
          />

          {/* Form header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">Service Info</p>
            <h2 className="text-base font-semibold text-gray-800">Fill in the details</h2>
          </div>

          {/* Fields */}
          <div className="px-6 py-5 flex-1 overflow-y-auto space-y-6">

            <TextInput
              label="Service name"
              placeholder="e.g. Web Development"
              value={form.name}
              onChange={set("name")}
              required
            />
            <TextInput
              label="Service name (Ar)"
              placeholder="الطباعة الرقمية"
              value={form.nameAr}
              onChange={set("nameAr")}
              required
              dir="rtl"
            />

            <Textarea
              label="Description"
              placeholder="Describe what this service includes, the value it provides, and who it's for..."
              value={form.description}
              onChange={set("description")}
              rows={5}
            />
            <Textarea
              label="Description (Ar)"
              placeholder="طباعة عالية الجودة على جميع الأوراق الورقية والاصطناعية"
              value={form.descriptionAr}
              onChange={set("descriptionAr")}
              rows={5}
              dir="rtl"
            />

            {/* Emoji icon picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>

              <div className="grid grid-cols-5 gap-2">
                {ICON_OPTIONS.map((item) => {
                  const IconComponent = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, icon: item.value }))}
                      className={`flex items-center justify-center h-12 rounded-xl border transition-all ${form.icon === item.value
                          ? "bg-blue-50 border-blue-300 text-blue-600"
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      <IconComponent size={20} />
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Select an icon for your service
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !form.name.trim()}
              className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? loadingLabel : "Create service"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}