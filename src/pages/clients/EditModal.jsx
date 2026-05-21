import { useRef, useState } from "react";
import ClientAvatar from "./ClientAvatar";
import {
  Group,
  Select,
  Textarea,
  TextInput,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import useClients from "../../contexts/ClientsContext";
import AvatarSectionUser from "../../components/AvatarSectionUser";

export default function EditModal({ client, onClose }) {
  if (!client) return null;
  const fileRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(client.image ?? null); // ← start with existing image

  const [form, setForm] = useState({ ...client });

  const set = (key) => (value) =>
    setForm((f) => ({
      ...f,
      [key]: value?.target ? value.target.value : value,
    }));

  const { updateClients, uploadToCloudinary } = useClients();

  // ── Image handlers ───────────────────────────────────────────────────────
  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // instant local preview
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, image: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      // 1. Upload new image if user picked one
      let image = form.image; // keep existing image by default
      if (imageFile) {
        setUploadingImage(true);
        image = await uploadToCloudinary(imageFile);
        setUploadingImage(false);
      } else if (imagePreview === null) {
        image = null; // user removed the image
      }

      // 2. Send to backend
      await updateClients(client.id, {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        address: form.address,
        city: form.city,
        country: form.country,
        website: form.website,
        notes: form.notes,
        status: form.status,
        image,
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
        {/* <LoadingOverlay
          visible={saving}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        /> */}

        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{
            children: (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">
                  {loadingLabel}
                </p>
              </div>
            ),
          }}
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

        {/* Avatar section */}
        <AvatarSectionUser
          imagePreview={imagePreview}
          form={form}
          fileRef={fileRef}
          handleRemoveImage={handleRemoveImage}
          handleImagePick={handleImagePick}
        />

        {/* Divider */}
        <div className="mx-6 mt-4 border-t border-gray-100 shrink-0" />

        {/* Fields */}
        <div className="px-6 py-4 space-y-3 overflow-y-auto flex-1">
          <Group grow>
            <TextInput
              label="First name"
              value={form.first_name ?? ""}
              onChange={set("first_name")}
            />
            <TextInput
              label="Last name"
              value={form.last_name ?? ""}
              onChange={set("last_name")}
            />
          </Group>
          <Group grow>
            <TextInput
              label="Email"
              value={form.email ?? ""}
              onChange={set("email")}
            />
            <TextInput
              label="Phone"
              value={form.phone ?? ""}
              onChange={set("phone")}
            />
          </Group>
          <TextInput
            label="Company"
            value={form.company ?? ""}
            onChange={set("company")}
          />
          <TextInput
            label="Address"
            value={form.address ?? ""}
            onChange={set("address")}
          />
          <Group grow>
            <TextInput
              label="City"
              value={form.city ?? ""}
              onChange={set("city")}
            />
            <TextInput
              label="Country"
              value={form.country ?? ""}
              onChange={set("country")}
            />
          </Group>
          <Group grow>
            <TextInput
              label="Website"
              value={form.website ?? ""}
              onChange={set("website")}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={set("status")}
              data={[
                { value: "active", label: "Active" },
                { value: "lead", label: "Lead" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </Group>
          <Textarea
            label="Notes"
            value={form.notes ?? ""}
            onChange={set("notes")}
            rows={3}
          />
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            {isLoading ? loadingLabel : "Save changes"}
          </button>
          <button
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
