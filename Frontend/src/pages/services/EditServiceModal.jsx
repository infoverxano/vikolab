// // frontend/components/services/EditServiceModal.jsx
// import { useState, useRef, useEffect } from "react";
// import { Modal, TextInput, Textarea, LoadingOverlay } from "@mantine/core";
// import useServices from "../../contexts/ServicesContext";
// import useClients from './../../contexts/ClientsContext';
// const EMOJI_SUGGESTIONS = [
//   "🚀","💡","🎨","⚙️","🔒","📊","🌐","🛠️","📱","☁️",
//   "🤖","💻","🎯","📦","🔗","✨","🧩","⚡","🏗️","📡",
// ];

// export default function EditServiceModal({ service, opened, onClose }) {
//   const { updateService } = useServices();
//   const { uploadToCloudinary} = useClients();
//   const fileRef = useRef(null);

//   const [saving,         setSaving]         = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [imageFile,      setImageFile]      = useState(null);
//   const [imagePreview,   setImagePreview]   = useState(null);

//   const [form, setForm] = useState({ name: "", description: "", icon: "", image: "" });

//   // Sync form when the target service changes
//   useEffect(() => {
//     if (service) {
//       setForm({
//         name:        service.name        ?? "",
//         description: service.description ?? "",
//         icon:        service.icon        ?? "",
//         image:       service.image       ?? "",
//       });
//       setImagePreview(service.image ?? null);
//       setImageFile(null);
//     }
//   }, [service]);

//   const set = (key) => (value) =>
//     setForm((f) => ({ ...f, [key]: value?.target ? value.target.value : value }));

//   const handleImagePick = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     setForm((f) => ({ ...f, image: "" }));
//     if (fileRef.current) fileRef.current.value = "";
//   };

//   const handleSave = async () => {
//     if (!form.name.trim()) return;
//     try {
//       setSaving(true);
//       let image = form.image;
//       if (imageFile) {
//         setUploadingImage(true);
//         image = await uploadToCloudinary(imageFile);
//         setUploadingImage(false);
//       }
//       await updateService(service.id, {
//         name:        form.name.trim(),
//         description: form.description || null,
//         icon:        form.icon        || null,
//         image:       image            || null,
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setUploadingImage(false);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const isLoading    = saving || uploadingImage;
//   const loadingLabel = uploadingImage ? "Uploading image..." : "Saving changes...";

//   return (
//     <Modal
//       opened={opened}
//       onClose={onClose}
//       title={
//         <div>
//           <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">Services</p>
//           <h2 className="text-base font-semibold text-gray-800">Edit Service</h2>
//         </div>
//       }
//       centered
//       size="lg"
//       radius="xl"
//       overlayProps={{ blur: 3 }}
//       styles={{
//         content: { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" },
//         header:  { background: "transparent" },
//       }}
//     >
//       <div className="relative space-y-5 pb-2">
//         <LoadingOverlay
//           visible={isLoading}
//           zIndex={1000}
//           overlayProps={{ blur: 2 }}
//           loaderProps={{
//             children: (
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                 <p className="text-sm text-gray-500 font-medium">{loadingLabel}</p>
//               </div>
//             ),
//           }}
//         />

//         {/* Image + emoji row */}
//         <div className="flex gap-4 items-start">
//           {/* Image upload */}
//           <div className="flex-1">
//             <p className="text-xs font-medium text-gray-500 mb-2">Service Image</p>
//             <div
//               className="relative group w-full h-32 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer hover:border-blue-300 transition-all"
//               onClick={() => fileRef.current?.click()}
//             >
//               {imagePreview ? (
//                 <>
//                   <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
//                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                     <button
//                       type="button"
//                       onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
//                       className="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-medium text-gray-700 hover:bg-white transition-colors"
//                     >Change</button>
//                     <button
//                       type="button"
//                       onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
//                       className="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-medium text-red-500 hover:bg-white transition-colors"
//                     >Remove</button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center pointer-events-none">
//                   <p className="text-2xl mb-1">🖼️</p>
//                   <p className="text-xs text-gray-400">Click to upload image</p>
//                 </div>
//               )}
//             </div>
//             <input
//               ref={fileRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImagePick}
//               style={{ position: "absolute", width: 0, height: 0, opacity: 0, overflow: "hidden", pointerEvents: "none" }}
//             />
//           </div>

//           {/* Emoji picker */}
//           <div className="w-40">
//             <p className="text-xs font-medium text-gray-500 mb-2">Icon (emoji)</p>
//             <TextInput
//               placeholder="🚀"
//               value={form.icon}
//               onChange={set("icon")}
//               styles={{ input: { fontSize: "1.4rem", textAlign: "center", height: "48px" } }}
//             />
//             <div className="flex flex-wrap gap-1 mt-2">
//               {EMOJI_SUGGESTIONS.map((em) => (
//                 <button
//                   key={em}
//                   type="button"
//                   onClick={() => setForm((f) => ({ ...f, icon: em }))}
//                   className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all hover:bg-blue-50 ${
//                     form.icon === em ? "bg-blue-100 ring-1 ring-blue-300" : "bg-gray-100"
//                   }`}
//                 >
//                   {em}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <TextInput
//           label="Service name"
//           placeholder="e.g. Web Development"
//           value={form.name}
//           onChange={set("name")}
//           required
//         />

//         <Textarea
//           label="Description"
//           placeholder="Describe what this service includes..."
//           value={form.description}
//           onChange={set("description")}
//           rows={4}
//         />

//         {/* Actions */}
//         <div className="flex gap-3 pt-2">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isLoading}
//             className="px-5 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={isLoading || !form.name.trim()}
//             className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? loadingLabel : "Save changes"}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// frontend/components/services/EditServiceModal.jsx
import { useState, useRef, useEffect } from "react";
import useServices from "../../contexts/ServicesContext";
import useClients from './../../contexts/ClientsContext';
import AvatarSectionUser from "../../components/AvatarSectionUser";
import {
  Group,
  Select,
  Textarea,
  TextInput,
  LoadingOverlay,
  Box,
} from "@mantine/core";


import {
  ImagePlus, Loader2, Trash2, X,
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

export default function EditServiceModal({ service, opened, onClose }) {
  const { updateService } = useServices();
  const { uploadToCloudinary } = useClients();
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({ name: "", description: "", icon: "", image: "" });

  // Sync form when the target service changes
  useEffect(() => {
    if (service) {
      setForm({
        name: service.name ?? "",
        nameAr: service.nameAr ?? "",
        descriptionAr: service.descriptionAr ?? "",
        description: service.description ?? "",
        icon: service.icon ?? "",
        image: service.image ?? "",
      });
      setImagePreview(service.image ?? null);
      setImageFile(null);
    }
  }, [service]);

  const set = (key) => (value) =>
    setForm((f) => ({ ...f, [key]: value?.target ? value.target.value : value }));

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, image: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      setSaving(true);
      let image = form.image;
      if (imageFile) {
        setUploadingImage(true);
        image = await uploadToCloudinary(imageFile);
        setUploadingImage(false);
      }
      await updateService(service.id, {
        name: form.name.trim(),
        nameAr: form.nameAr.trim(),
        description: form.description || null,
        descriptionAr: form.descriptionAr.trim() || null,
        icon: form.icon || null,
        image: image || null,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = saving || uploadingImage;
  const loadingLabel = uploadingImage ? "Uploading image..." : "Saving changes...";

  if (!opened) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 3 }}
          loaderProps={{
            children: (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-blue-500" size={30} />
                <p className="text-sm font-medium text-gray-500">
                  {loadingLabel}
                </p>
              </div>
            ),
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0" >
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold">
              Services
            </p>
            <h2 className="text-lg font-semibold text-gray-800">
              Edit Service
            </h2>
          </div>

          <button
            onClick={onClose}
            className="m-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Upload + Icon */}
          {/* Upload */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Service Image
            </p>

            <div
              onClick={() => fileRef.current?.click()}
              className="relative h-40 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden cursor-pointer hover:border-blue-400 transition-all group"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <ImagePlus size={34} />
                  <p className="text-sm mt-2">
                    Click to upload image
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImagePick}
              hidden
            />
          </div>
          {/* Emoji picker */}
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

          {/* Name */}
          <TextInput
            label="Service Name"
            placeholder="Web Development"
            value={form.name}
            onChange={set("name")}
            size="md"
            required
          />

          <TextInput
            label="Service name (Ar)"
            placeholder="الطباعة الرقمية"
            value={form.nameAr}
            onChange={set("nameAr")}
            required
            styles={{
              input: {
                direction: "rtl",
                textAlign: "right",
                fontFamily: "Cairo, sans-serif",
              },
            }}
          />




          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Describe your service..."
            value={form.description}
            onChange={set("description")}
            minRows={4}
          />

          <Textarea
            label="Description (Ar)"
            placeholder="وصف الخدمة باللغة العربية"
            value={form.descriptionAr}
            onChange={set("descriptionAr")}
            minRows={4}
            styles={{
              input: {
                direction: "rtl",
                textAlign: "right",
                fontFamily: "Cairo, sans-serif",
              },
            }}
          />

          {/* Actions */}
          <Group justify="flex-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading || !form.name.trim()}
              className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </Group>
        </div>
      </Box>
    </div>
  );
}