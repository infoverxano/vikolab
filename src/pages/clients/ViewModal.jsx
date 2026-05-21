
import ClientAvatar from './ClientAvatar';
export default function ViewModal({ client, onClose, onEdit, onDelete }) {
  if (!client) return null;

  const fields = [
    { label: "Email", value: client.email },
    { label: "Address", value: client.address },
    { label: "City", value: client.city },
    { label: "Country", value: client.country },
    { label: "Company", value: client.company },
    { label: "Website", value: client.website },
    { label: "Phone", value: client.phone },
    { label: "Status", value: client.status },
  ];

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="h-20 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="m-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="px-6 pb-0 -mt-10 flex items-end gap-4">
          <div className="ring-4 ring-white rounded-full">
            <ClientAvatar
              firstName={client.first_name ?? ""}
              lastName={client.last_name ?? ""}
              avatarUrl={client.image}
              size={72}
            />
          </div>
          <div className="pb-2">
            <p className="text-lg font-semibold text-gray-800 leading-tight">
              {client.first_name ?? ""} {client.last_name ?? ""}
            </p>
            <p className="text-sm text-gray-400">
              {client.city ?? ""}, {client.country ?? ""}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-4 border-t border-gray-100 shrink-0" />

        {/* Fields */}
        <div className="px-6 py-4 space-y-3 overflow-y-auto flex-1">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-700">
                {value || "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Action buttons */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            Edit
          </button>
          <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all">
            Message
          </button>
          <button
            onClick={onDelete}
            className="py-2 px-4 rounded-xl text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}