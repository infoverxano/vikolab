import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Textarea,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";

import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  Briefcase,
  Tag,
  Pencil,
} from "lucide-react";

import usePortfolios from "../../contexts/PortfoliosContext";
import { useLanguage } from "../../contexts/LanguageContext";
import useClients from "../../contexts/ClientsContext";

const STEPS = ["Basic Info", "Details", "Gallery"];

// const CATEGORIES = [
//   { en: "Web Design",   ar: "تصميم ويب" },
//   { en: "Mobile App",   ar: "تطبيق موبايل" },
//   { en: "Branding",     ar: "هوية بصرية" },
//   { en: "E-commerce",   ar: "تجارة إلكترونية" },
//   { en: "UI/UX",        ar: "واجهة مستخدم" },
//   { en: "Photography",  ar: "تصوير" },
//   { en: "Video",        ar: "فيديو" },
//   { en: "Other",        ar: "أخرى" },
// ];


const CATEGORIES = [
  { en: "Business Card",      ar: "بطاقة عمل" },
  { en: "Flyer",              ar: "منشور" },
  { en: "Banner",             ar: "بانر" },
  { en: "Roll-Up",            ar: "رول أب" },
  { en: "Poster",             ar: "ملصق" },
  { en: "Catalogue",          ar: "كتالوج" },
  { en: "Brochure",           ar: "مطوية" },
  { en: "Logo",               ar: "شعار" },
  { en: "Brand Identity",     ar: "هوية بصرية" },
  { en: "Sticker",            ar: "ستيكر" },
  { en: "Label",              ar: "ملصق منتج" },
  { en: "Packaging",          ar: "تغليف منتج" },
  { en: "T-Shirt Print",      ar: "طباعة قميص" },
  { en: "Mug Print",          ar: "طباعة كوب" },
  { en: "Light Sign",         ar: "لوحة مضيئة" },
  { en: "Outdoor Sign",       ar: "لافتة خارجية" },
  { en: "Shop Facade",        ar: "واجهة محل" },
  { en: "Vehicle Wrap",       ar: "تغليف سيارة" },
  { en: "Wall Mural",         ar: "جدارية" },
  { en: "Exhibition Stand",   ar: "جناح معرض" },
  { en: "Social Media Post",  ar: "منشور سوشال ميديا" },
  { en: "Social Media Cover", ar: "غلاف سوشال ميديا" },
  { en: "Email Signature",    ar: "توقيع إيميل" },
  { en: "Presentation",       ar: "بريزنتيشن" },
  { en: "Invoice / Quote",    ar: "فاتورة / عرض سعر" },
  { en: "Stamp",              ar: "ختم" },
  { en: "Envelope",           ar: "ظرف" },
  { en: "Notebook",           ar: "دفتر" },
  { en: "Menu",               ar: "قائمة طعام" },
  { en: "Other",              ar: "أخرى" },
];

export default function EditPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { portfolios, fetchPortfolios, updatePortfolio } = usePortfolios();
  const { uploadToCloudinary } = useClients();
  const { lang } = useLanguage();

  const coverRef   = useRef(null);
  const galleryRef = useRef(null);

  const [step,    setStep]    = useState(0);
  const [saving,  setSaving]  = useState(false);
  const [uploadingCover,   setUploadingCover]   = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [ready,   setReady]   = useState(false); // portfolio loaded

  // ── form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "", nameAr: "",
    description: "", descriptionAr: "",
    category: "", categoryAr: "",
  });

  // cover – may be an existing URL or a new File
  const [coverFile,    setCoverFile]    = useState(null);   // new File | null
  const [coverPreview, setCoverPreview] = useState(null);   // url string
  const [existingCover, setExistingCover] = useState(null); // original url

  // gallery – mix of existing URLs + new Files
  const [galleryItems, setGalleryItems] = useState([]);
  // Each item: { type: "existing", url } | { type: "new", file, preview }

  // ── load portfolio ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!portfolios.length) fetchPortfolios();
  }, []);

  useEffect(() => {
    const p = portfolios.find((p) => p.id === id);
    if (!p) return;

    setForm({
      name:          p.name          || "",
      nameAr:        p.nameAr        || "",
      description:   p.description   || "",
      descriptionAr: p.descriptionAr || "",
      category:      p.category      || "",
      categoryAr:    p.categoryAr    || "",
    });

    if (p.image) {
      setExistingCover(p.image);
      setCoverPreview(p.image);
    }

    if (p.gallery?.length) {
      setGalleryItems(
        p.gallery.map((url) => ({ type: "existing", url }))
      );
    }

    setReady(true);
  }, [portfolios, id]);

  // ── helpers ───────────────────────────────────────────────────────────────
  const set = (key) => (value) =>
    setForm((f) => ({
      ...f,
      [key]: value?.target ? value.target.value : value,
    }));

  const setCategory = (en, ar) =>
    setForm((f) => ({ ...f, category: en, categoryAr: ar }));

  // ── cover ─────────────────────────────────────────────────────────────────
  const handleCoverPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCover(null);
    if (coverRef.current) coverRef.current.value = "";
  };

  // ── gallery ───────────────────────────────────────────────────────────────
  const handleGalleryPick = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryItems((prev) => [
      ...prev,
      ...files.map((f) => ({
        type:    "new",
        file:    f,
        preview: URL.createObjectURL(f),
      })),
    ]);
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const removeGalleryItem = (i) =>
    setGalleryItems((prev) => prev.filter((_, idx) => idx !== i));

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.nameAr.trim()) return;

    try {
      setSaving(true);

      // ── cover ──
      let image = existingCover ?? null; // keep existing unless changed/removed
      if (coverFile) {
        setUploadingCover(true);
        image = await uploadToCloudinary(coverFile);
        setUploadingCover(false);
      } else if (!coverPreview) {
        image = null; // explicitly removed
      }

      // ── gallery ──
      setUploadingGallery(true);
      const gallery = await Promise.all(
        galleryItems.map((item) =>
          item.type === "existing"
            ? item.url
            : uploadToCloudinary(item.file)
        )
      );
      setUploadingGallery(false);

      await updatePortfolio(id, {
        name:          form.name.trim(),
        nameAr:        form.nameAr.trim(),
        description:   form.description.trim()   || null,
        descriptionAr: form.descriptionAr.trim() || null,
        category:      form.category  || null,
        categoryAr:    form.categoryAr || null,
        image,
        gallery,
      });

      navigate(`/dashboard/portfolio/${id}`);
    } catch (err) {
      console.error(err);
      setUploadingCover(false);
      setUploadingGallery(false);
    } finally {
      setSaving(false);
    }
  };

  // ── derived ───────────────────────────────────────────────────────────────
  const isLoading = saving || uploadingCover || uploadingGallery;

  const loadingLabel = uploadingCover
    ? "Uploading cover…"
    : uploadingGallery
    ? "Uploading gallery…"
    : "Saving changes…";

  const canProceed = [
    form.name.trim() !== "" && form.nameAr.trim() !== "",
    true,
    true,
  ][step];

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen pb-12 relative font-sans"
      style={{ background: "#f4f6f9" }}
    >
      {/* grid bg */}
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
        <div className="flex items-center gap-3 mb-8 pt-1">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Pencil size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.18em] leading-none mb-1">
                Portfolio
              </p>
              <h1 className="text-[22px] font-bold text-gray-900 leading-none tracking-tight">
                Edit Project
              </h1>
            </div>
          </div>
        </div>

        {/* ── CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
          <LoadingOverlay
            visible={isLoading || !ready}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
          />

          {/* TOP — step indicator */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.15em] mb-1">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h2 className="text-base font-bold text-gray-800">
                  {STEPS[step]}
                </h2>
              </div>

              {/* progress dots */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === step
                        ? "w-6 h-2 bg-blue-600"
                        : i < step
                        ? "w-2 h-2 bg-blue-200"
                        : "w-2 h-2 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">

            {/* ── STEP 0 — Basic Info ── */}
            {step === 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Name (EN)
                    </label>
                    <TextInput
                      placeholder="Project Name"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>

                  <div dir="rtl">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      الاسم
                    </label>
                    <TextInput
                      placeholder="اسم المشروع"
                      value={form.nameAr}
                      onChange={set("nameAr")}
                    />
                  </div>
                </div>

                {/* category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.en}
                        type="button"
                        onClick={() => setCategory(cat.en, cat.ar)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          form.category === cat.en
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {cat.en}
                      </button>
                    ))}
                    {/* clear category */}
                    {form.category && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            category: "",
                            categoryAr: "",
                          }))
                        }
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-100 text-red-400 hover:bg-red-50 transition-all flex items-center gap-1"
                      >
                        <X size={10} /> Clear
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 1 — Details ── */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Description
                  </label>
                  <Textarea
                    placeholder="Project description…"
                    value={form.description}
                    onChange={set("description")}
                    rows={5}
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    الوصف
                  </label>
                  <Textarea
                    placeholder="وصف المشروع…"
                    value={form.descriptionAr}
                    onChange={set("descriptionAr")}
                    rows={5}
                  />
                </div>
              </>
            )}

            {/* ── STEP 2 — Gallery ── */}
            {step === 2 && (
              <>
                {/* COVER */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    Cover Image
                  </label>

                  <div
                    onClick={() => coverRef.current?.click()}
                    className="relative group w-full h-44 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer hover:border-blue-300 transition-colors"
                  >
                    {coverPreview ? (
                      <>
                        <img
                          src={coverPreview}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {/* overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <Upload
                            size={22}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload size={22} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-400">Upload cover</p>
                      </div>
                    )}
                  </div>

                  {/* remove cover button */}
                  {coverPreview && (
                    <button
                      type="button"
                      onClick={removeCover}
                      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-600 transition"
                    >
                      <X size={11} /> Remove cover
                    </button>
                  )}

                  <input
                    ref={coverRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPick}
                    hidden
                  />
                </div>

                {/* GALLERY */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-500">
                      Gallery
                    </label>
                    {galleryItems.length > 0 && (
                      <span className="text-[10px] text-gray-400">
                        {galleryItems.length} image{galleryItems.length !== 1 ? "s" : ""}
                        {" · "}
                        {galleryItems.filter((i) => i.type === "new").length} new
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {galleryItems.map((item, i) => (
                      <div
                        key={i}
                        className="relative group aspect-square rounded-xl overflow-hidden"
                      >
                        <img
                          src={
                            item.type === "existing"
                              ? item.url
                              : item.preview
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        {/* new badge */}
                        {item.type === "new" && (
                          <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-blue-600 text-[9px] font-bold text-white">
                            NEW
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeGalleryItem(i)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white text-red-500 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}

                    {/* add button */}
                    <button
                      type="button"
                      onClick={() => galleryRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 flex flex-col items-center justify-center gap-1 transition-colors text-gray-400 hover:text-blue-500"
                    >
                      <Plus size={18} />
                      <span className="text-[10px] font-semibold">Add</span>
                    </button>
                  </div>

                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryPick}
                    hidden
                  />
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition"
              >
                Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? loadingLabel : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}