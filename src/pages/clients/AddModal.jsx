import { useState, useRef } from 'react';
import ClientAvatar from './ClientAvatar';
import { Group, Select, Textarea, TextInput, LoadingOverlay } from '@mantine/core';
import useClients from '../../contexts/ClientsContext';
import AvatarSectionUser from '../../components/AvatarSectionUser';

export default function AddModal({ onClose }) {
  const { addClient ,uploadToCloudinary} = useClients(); // make sure addClient calls POST /clients
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // local blob URL
  const [imageFile, setImageFile] = useState(null);       // raw File object

  const [form, setForm] = useState({
    first_name: "", last_name: "",
    email: "", phone: "", company: "",
    address: "", city: "", country: "",
    website: "", notes: "", status: "active",
    avatar_url: "",
  });

  const set = (key) => (value) =>
    setForm((f) => ({
      ...f,
      [key]: value?.target ? value.target.value : value,
    }));

  // ── Image picker ────────────────────────────────────────────────────────────
  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // instant preview
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, avatar_url: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      setSaving(true);

      // 1. Upload image to Cloudinary if picked
      let image = null;
      if (imageFile) {
        setUploadingImage(true);
        image = await uploadToCloudinary(imageFile); // returns secure_url string
        setUploadingImage(false);
      }

      // 2. POST to backend
      await addClient({
        name:    `${form.first_name} ${form.last_name}`.trim(),
        first_name: form.first_name,
        last_name: form.last_name,
        email:   form.email,
        phone:   form.phone,
        company: form.company,
        notes:   form.notes,
        address: form.address,
        city: form.city,
        country: form.country,
        website: form.website,
        status: form.status,
        image,   // ← just image
      });

      onClose();
    } catch (error) {
      console.error(error);
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = saving || uploadingImage;
  const loadingLabel = uploadingImage ? "Uploading image..." : "Saving...";



  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{ children: (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500 font-medium">{loadingLabel}</p>
            </div>
          )}}
        />

        {/* Header banner */}
        <div className="h-20 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="m-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Avatar */}
        <AvatarSectionUser imagePreview={imagePreview} form={form} fileRef={fileRef} handleRemoveImage={handleRemoveImage} handleImagePick={handleImagePick}/>

        {/* Divider */}
        <div className="mx-6 mt-4 border-t border-gray-100 shrink-0" />

        {/* Scrollable fields */}
        <div className="px-6 py-4 space-y-3 overflow-y-auto flex-1">
          <Group grow>
            <TextInput label="First name" value={form.first_name ?? ""} onChange={set("first_name")} placeholder="John" />
            <TextInput label="Last name"  value={form.last_name ?? ""}  onChange={set("last_name")}  placeholder="Doe"  />
          </Group>
          <Group grow>
            <TextInput label="Email"   value={form.email ?? ""}   onChange={set("email")}   placeholder="john@email.com" />
            <TextInput label="Phone"   value={form.phone}   onChange={set("phone")}   placeholder="+1 234 567 890" />
          </Group>
          <TextInput label="Company" value={form.company ?? ""} onChange={set("company")} placeholder="Acme Inc." />
          <TextInput label="Address" value={form.address ?? ""} onChange={set("address")} placeholder="123 Main St" />
          <Group grow>
            <TextInput label="City"    value={form.city ?? ""}    onChange={set("city")}    placeholder="New York" />
            <TextInput label="Country" value={form.country ?? ""} onChange={set("country")} placeholder="USA" />
          </Group>
          <Group grow>
            <TextInput label="Website" value={form.website ?? ""} onChange={set("website")} placeholder="https://..." />
            <Select
              label="Status"
              value={form.status}
              onChange={set("status")}
              data={[
                { value: "active",   label: "Active"   },
                { value: "lead",     label: "Lead"     },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </Group>
          <Textarea
            label="Notes"
            value={form.notes ?? ""}
            onChange={set("notes")}
            placeholder="Any additional notes..."
            rows={3}
          />
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100 shrink-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 shrink-0">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? loadingLabel : "Create client"}
          </button>
          <button
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}