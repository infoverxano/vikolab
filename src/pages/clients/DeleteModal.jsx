import ClientAvatar from "./ClientAvatar";
import useClients from './../../contexts/ClientsContext';

export default function DeleteModal({ client, onClose, onConfirm }) {
  const {deleteClient}=useClients();
  if (!client) return null;
  const handleSubmit = async () => {

    await deleteClient(client.id);

    onClose()
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner — red tint for danger */}
        <div className="h-20 bg-gradient-to-r from-red-50 to-rose-50  flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="m-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Avatar overlap */}
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
              {client.first_name} {client.last_name}
            </p>
            <p className="text-sm text-red-400">This action cannot be undone</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-4 border-t border-gray-100 shrink-0" />

        {/* Warning message */}
        <div className="px-6 py-4 space-y-3 overflow-y-auto flex-1">
          <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
            <span className="text-red-400 text-lg leading-none">⚠</span>
            <p className="text-sm text-red-600">
              You are about to permanently delete{" "}
              <span className="font-semibold">
                {client.first_name ?? ""} {client.last_name ?? ""}
              </span>
              . All their data including address, contact info, and history will
              be removed.
            </p>
          </div>

          {/* Summary fields — read-only, dimmed */}
          {[
            { label: "Email", value: client.email ?? "" },
            { label: "City", value: client.city ?? "" },
            { label: "Country", value: client.country ?? "" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between opacity-50"
            >
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm text-gray-500">{value || "—"}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all"
          >
            Yes, delete
          </button>
          <button
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