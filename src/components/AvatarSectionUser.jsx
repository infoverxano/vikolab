import ClientAvatar from "../pages/clients/ClientAvatar";

// ── Avatar area — shows preview or initials fallback ────────────────────────
export default function AvatarSectionUser({imagePreview,form,fileRef,handleRemoveImage,handleImagePick}) {
    return(<>
  <div className="px-6 pb-0 -mt-10 flex items-end gap-4">
    <div className="relative group">
      <div className="ring-4 ring-white rounded-full">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="preview"
            className="w-[72px] h-[72px] rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <ClientAvatar
            firstName={form.first_name ?? ""}
            lastName={form.last_name ?? ""}
            size={72}
          />
        )}
      </div>

      {/* Overlay buttons */}
      <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white text-xs transition-colors"
          title="Upload photo"
        >
          ↑
        </button>
        {imagePreview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white text-xs transition-colors"
            title="Remove photo"
          >
            ✕
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleImagePick}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
    </div>

    <div className="pb-2">
      <p className="text-lg font-semibold text-gray-800 leading-tight">
        {form.first_name || form.last_name
          ? `${form.first_name} ${form.last_name}`.trim()
          : "New client"}
      </p>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="text-xs text-blue-500 hover:text-blue-700 transition-colors mt-0.5"
      >
        {imagePreview ? "Change photo" : "Upload photo"}
      </button>
    </div>
  </div>
  </>);
};
