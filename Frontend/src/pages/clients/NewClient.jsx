// pages/NewClient.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Select, Textarea, TextInput, LoadingOverlay } from "@mantine/core";



import useClients from './../../contexts/ClientsContext';
import ClientAvatar from './ClientAvatar';



const STEPS = ["Personal", "Contact", "Details"];

export default function NewClient() {
  const navigate = useNavigate();
  const { addClient ,uploadToCloudinary} = useClients();
  const fileRef = useRef(null);

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    first_name: "", last_name: "",
    email: "",     phone: "",
    company: "",   address: "",
    city: "",      country: "",
    website: "",   status: "active",
    notes: "",     image: "",
  });

  const set = (key) => (value) =>
    setForm((f) => ({
      ...f,
      [key]: value?.target ? value.target.value : value,
    }));

  // ── Image ────────────────────────────────────────────────────────────────
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

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      setSaving(true);
      let image = null;
      if (imageFile) {
        setUploadingImage(true);
        image = await uploadToCloudinary(imageFile);
        setUploadingImage(false);
      }
      await addClient({
        name:    `${form.first_name} ${form.last_name}`.trim(),
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email:   form.email,
        phone:   form.phone,
        company: form.company,
        address: form.address,
        city:    form.city,
        country: form.country,
        website: form.website,
        status:  form.status,
        notes:   form.notes,
        image,
      });
      navigate("/dashboard/clients");
    } catch (err) {
      console.error(err);
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = saving || uploadingImage;
  const loadingLabel = uploadingImage ? "Uploading image..." : "Creating client...";

  // ── Step content ─────────────────────────────────────────────────────────
  const steps = [
    // Step 0 — Personal
    <div className="space-y-4">
      <Group grow>
        <TextInput
          label="First name" placeholder="John"
          value={form.first_name} onChange={set("first_name")}
        />
        <TextInput
          label="Last name" placeholder="Doe"
          value={form.last_name} onChange={set("last_name")}
        />
      </Group>
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
      <Textarea
        label="Notes" placeholder="Any notes about this client..."
        value={form.notes} onChange={set("notes")} rows={3}
      />
    </div>,

    // Step 1 — Contact
    <div className="space-y-4">
      <TextInput
        label="Email" placeholder="john@email.com"
        value={form.email} onChange={set("email")}
      />
      <TextInput
        label="Phone" placeholder="+1 234 567 890"
        value={form.phone} onChange={set("phone")}
      />
      <TextInput
        label="Company" placeholder="Acme Inc."
        value={form.company} onChange={set("company")}
      />
      <TextInput
        label="Website" placeholder="https://..."
        value={form.website} onChange={set("website")}
      />
    </div>,

    // Step 2 — Details
    <div className="space-y-4">
      <TextInput
        label="Address" placeholder="123 Main St"
        value={form.address} onChange={set("address")}
      />
      <Group grow>
        <TextInput
          label="City" placeholder="New York"
          value={form.city} onChange={set("city")}
        />
        <TextInput
          label="Country" placeholder="USA"
          value={form.country} onChange={set("country")}
        />
      </Group>
    </div>,
  ];

  return (
    <div
      className="min-h-screen pb-2 font-sans relative overflow-hidden"
      style={{ background: "#f9fafb" }}
    >
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
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">
            Clients
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            New Client
          </h1>
        </div>
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

        {/* ── Left: Profile card ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Avatar card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 flex flex-col items-center gap-4">
            {/* Avatar + upload */}
            <div className="relative group">
              <div className="ring-4 ring-white/80 rounded-full shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <ClientAvatar
                    firstName={form.first_name ?? ""}
                    lastName={form.last_name ?? ""}
                    size={96}
                  />
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white text-sm transition-colors"
                  title="Upload photo"
                >
                  ↑
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white text-sm transition-colors"
                    title="Remove"
                  >
                    ✕
                  </button>
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

            {/* Name preview */}
            <div className="text-center">
              <p className="text-base font-semibold text-gray-800">
                {form.first_name || form.last_name
                  ? `${form.first_name} ${form.last_name}`.trim()
                  : "New Client"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {form.company || "No company"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full py-2 rounded-xl text-xs font-medium border border-dashed border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all"
            >
              {imagePreview ? "Change photo" : "+ Upload photo"}
            </button>
          </div>

          {/* Summary card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-5 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Summary
            </p>
            {[
              { label: "Email",   value: form.email   },
              { label: "Phone",   value: form.phone   },
              { label: "City",    value: form.city    },
              { label: "Country", value: form.country },
              { label: "Address", value: form.address },
              { label: "Company", value: form.company },
              { label: "Website", value: form.website },
              { label: "Notes", value: form.notes },
              { label: "Status",  value: form.status  },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{label}</span>
                <span className={`text-xs font-medium ${value ? "text-gray-700" : "text-gray-300"}`}>
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Form card ───────────────────────────────────────────── */}
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

          {/* Step header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-0.5">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h2 className="text-base font-semibold text-gray-800">
                  {STEPS[step]} Info
                </h2>
              </div>
              {/* Step pills */}
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step
                        ? "w-6 bg-blue-500"
                        : i < step
                        ? "w-3 bg-blue-200"
                        : "w-3 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step tabs */}
            <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1">
              {STEPS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setStep(i)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    i === step
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Step fields */}
          <div className="px-6 py-5 flex-1 overflow-y-auto">
            {steps[step]}
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                disabled={isLoading}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
              >
                ← Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? loadingLabel : "Create client"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}