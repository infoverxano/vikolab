import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  ImagePlus,
  Globe,
  AlignLeft,
  Tag,
  Images,
  ChevronRight,
  ChevronLeft,
  Briefcase,
} from "lucide-react";

import usePortfolios from "../../contexts/PortfoliosContext";

import { useLanguage } from "../../contexts/LanguageContext";
import useClients from './../../contexts/ClientsContext';
const STEPS = [
  "Basic Info",
  "Details",
  "Gallery",
];

// const CATEGORIES = [
//   {
//     en: "Web Design",
//     ar: "تصميم ويب",
//   },

//   {
//     en: "Mobile App",
//     ar: "تطبيق موبايل",
//   },

//   {
//     en: "Branding",
//     ar: "هوية بصرية",
//   },

//   {
//     en: "E-commerce",
//     ar: "تجارة إلكترونية",
//   },

//   {
//     en: "UI/UX",
//     ar: "واجهة مستخدم",
//   },

//   {
//     en: "Photography",
//     ar: "تصوير",
//   },

//   {
//     en: "Video",
//     ar: "فيديو",
//   },

//   {
//     en: "Other",
//     ar: "أخرى",
//   },
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

export default function NewPortfolio() {
  const navigate = useNavigate();

  const {
    addPortfolio
  } = usePortfolios();
  const { uploadToCloudinary } = useClients();

  const { lang, dir } =
    useLanguage();

  const coverRef = useRef(null);

  const galleryRef = useRef(null);

  const [step, setStep] =
    useState(0);

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingCover,
    setUploadingCover,
  ] = useState(false);

  const [
    uploadingGallery,
    setUploadingGallery,
  ] = useState(false);

  const [coverFile, setCoverFile] =
    useState(null);

  const [
    coverPreview,
    setCoverPreview,
  ] = useState(null);

  const [
    galleryFiles,
    setGalleryFiles,
  ] = useState([]);

  const [
    galleryPreviews,
    setGalleryPreviews,
  ] = useState([]);

  const [form, setForm] = useState({
    name: "",
    nameAr: "",

    description: "",
    descriptionAr: "",

    category: "",
    categoryAr: "",
  });

  const set = (key) => (value) =>
    setForm((f) => ({
      ...f,

      [key]:
        value?.target
          ? value.target.value
          : value,
    }));

  const setCategory = (en, ar) =>
    setForm((f) => ({
      ...f,

      category: en,

      categoryAr: ar,
    }));

  // ── COVER ───────────────────────────────
  const handleCoverPick = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverFile(file);

    setCoverPreview(
      URL.createObjectURL(file)
    );
  };

  const removeCover = () => {
    setCoverFile(null);

    setCoverPreview(null);

    if (coverRef.current) {
      coverRef.current.value = "";
    }
  };

  // ── GALLERY ─────────────────────────────
  const handleGalleryPick = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    setGalleryFiles((prev) => [
      ...prev,
      ...files,
    ]);

    setGalleryPreviews((prev) => [
      ...prev,

      ...files.map((f) =>
        URL.createObjectURL(f)
      ),
    ]);

    if (galleryRef.current) {
      galleryRef.current.value = "";
    }
  };

  const removeGalleryItem = (i) => {
    setGalleryFiles((prev) =>
      prev.filter(
        (_, idx) => idx !== i
      )
    );

    setGalleryPreviews((prev) =>
      prev.filter(
        (_, idx) => idx !== i
      )
    );
  };

  // ── SUBMIT ──────────────────────────────
  const handleSubmit = async () => {
    if (
      !form.name.trim() ||
      !form.nameAr.trim()
    ) {
      return;
    }

    try {
      setSaving(true);

      let image = null;

      let gallery = [];

      // upload cover
      if (coverFile) {
        setUploadingCover(true);
        image = await uploadToCloudinary(coverFile);
        setUploadingCover(false);
      }

      // upload gallery
      if (galleryFiles.length) {
        setUploadingGallery(true);
        gallery = await Promise.all(
          galleryFiles.map((f) => uploadToCloudinary(f))
        );
        setUploadingGallery(false);
      }

      // create portfolio
      await addPortfolio({
        name: form.name.trim(),

        nameAr:
          form.nameAr.trim(),

        description:
          form.description.trim() ||
          undefined,

        descriptionAr:
          form.descriptionAr.trim() ||
          undefined,

        category:
          form.category ||
          undefined,

        categoryAr:
          form.categoryAr ||
          undefined,

        image:
          image || undefined,

        gallery,
      });

      navigate(
        "/dashboard/portfolio"
      );
    } catch (err) {
      console.log(err);

      setUploadingCover(false);

      setUploadingGallery(false);
    } finally {
      setSaving(false);
    }
  };

  const isLoading =
    saving ||
    uploadingCover ||
    uploadingGallery;

  const loadingLabel =
    uploadingCover
      ? "Uploading cover..."
      : uploadingGallery
      ? "Uploading gallery..."
      : "Creating portfolio...";

  const canProceed = [
    form.name.trim() !== "" &&
      form.nameAr.trim() !== "",

    true,

    true,
  ][step];

  return (
    <div
      className="min-h-screen pb-12 relative font-sans"
      style={{
        background: "#f4f6f9",
      }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#64748b 1px, transparent 1px),
            linear-gradient(90deg, #64748b 1px, transparent 1px)
          `,

          backgroundSize:
            "32px 32px",
        }}
      />

      {/* CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-1">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8 pt-1">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Briefcase
                size={18}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.18em] leading-none mb-1">
                Portfolio
              </p>

              <h1 className="text-[22px] font-bold text-gray-900 leading-none tracking-tight">
                New Project
              </h1>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">

          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{
              blur: 2,
            }}
          />

          {/* TOP */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.15em] mb-1">
                  Step {step + 1} of{" "}
                  {STEPS.length}
                </p>

                <h2 className="text-base font-bold text-gray-800">
                  {STEPS[step]}
                </h2>
              </div>

              {/* PROGRESS */}
              <div className="flex items-center gap-1.5">
                {STEPS.map(
                  (_, i) => (
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
                  )
                )}
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">

            {/* STEP 0 */}
            {step === 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* EN */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Name (EN)
                    </label>

                    <TextInput
                      placeholder="Project Name"
                      value={form.name}
                      onChange={set(
                        "name"
                      )}
                    />
                  </div>

                  {/* AR */}
                  <div dir="rtl">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      الاسم
                    </label>

                    <TextInput
                      placeholder="اسم المشروع"
                      value={
                        form.nameAr
                      }
                      onChange={set(
                        "nameAr"
                      )}
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    Category
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(
                      (cat) => (
                        <button
                          key={cat.en}
                          type="button"
                          onClick={() =>
                            setCategory(
                              cat.en,
                              cat.ar
                            )
                          }
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            form.category ===
                            cat.en
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-500 border-gray-200"
                          }`}
                        >
                          {cat.en}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Description
                  </label>

                  <Textarea
                    placeholder="Project description..."
                    value={
                      form.description
                    }
                    onChange={set(
                      "description"
                    )}
                    rows={5}
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    الوصف
                  </label>

                  <Textarea
                    placeholder="وصف المشروع..."
                    value={
                      form.descriptionAr
                    }
                    onChange={set(
                      "descriptionAr"
                    )}
                    rows={5}
                  />
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                {/* COVER */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    Cover Image
                  </label>

                  <div
                    onClick={() =>
                      coverRef.current?.click()
                    }
                    className="relative group w-full h-40 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer"
                  >
                    {coverPreview ? (
                      <img
                        src={
                          coverPreview
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload
                          size={22}
                          className="text-gray-300 mx-auto mb-2"
                        />

                        <p className="text-xs text-gray-400">
                          Upload cover
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    ref={coverRef}
                    type="file"
                    accept="image/*"
                    onChange={
                      handleCoverPick
                    }
                    hidden
                  />
                </div>

                {/* GALLERY */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    Gallery
                  </label>

                  <div className="grid grid-cols-3 gap-2">

                    {galleryPreviews.map(
                      (src, i) => (
                        <div
                          key={i}
                          className="relative group aspect-square rounded-xl overflow-hidden"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeGalleryItem(
                                i
                              )
                            }
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-red-500 flex items-center justify-center"
                          >
                            <X
                              size={12}
                            />
                          </button>
                        </div>
                      )
                    )}

                    {/* ADD */}
                    <button
                      type="button"
                      onClick={() =>
                        galleryRef.current?.click()
                      }
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center"
                    >
                      <Plus
                        size={18}
                      />

                      <span className="text-[10px]">
                        Add
                      </span>
                    </button>
                  </div>

                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handleGalleryPick
                    }
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
                onClick={() =>
                  setStep(
                    (s) => s - 1
                  )
                }
                className="px-4 py-2 rounded-xl bg-gray-100 text-sm font-semibold"
              >
                Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() =>
                  setStep(
                    (s) => s + 1
                  )
                }
                disabled={!canProceed}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                onClick={
                  handleSubmit
                }
                disabled={
                  isLoading
                }
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold"
              >
                {isLoading
                  ? loadingLabel
                  : "Create Portfolio"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}