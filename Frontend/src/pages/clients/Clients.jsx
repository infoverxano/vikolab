import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import useClients from "./../../contexts/ClientsContext";
import ClientAvatar from './ClientAvatar';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import {
  Avatar,
  Drawer,
  Button,
  TextInput,
  Stack,
  Group,
  Text,
  Divider,
  Badge,
} from "@mantine/core";
import AddModal from "./AddModal";
const stats = [
  {
    label: "Total Projects",
    value: "12.9K",
    badge: "+2",
    note: "this week",
    icon: "◈",
    color: "from-blue-500/10 to-blue-600/5 border-blue-200/40",
    iconColor: "text-blue-500 bg-blue-500/10",
    badgeColor: "text-blue-600 bg-blue-500/10",
  },
  {
    label: "Active Tasks",
    value: "34.9K",
    badge: "+8",
    note: "due today",
    icon: "◎",
    color: "from-violet-500/10 to-violet-600/5 border-violet-200/40",
    iconColor: "text-violet-500 bg-violet-500/10",
    badgeColor: "text-violet-600 bg-violet-500/10",
  },
  {
    label: "Team Members",
    value: "8K",
    badge: "+2",
    note: "2 online",
    icon: "⬡",
    color: "from-emerald-500/10 to-emerald-600/5 border-emerald-200/40",
    iconColor: "text-emerald-500 bg-emerald-500/10",
    badgeColor: "text-emerald-600 bg-emerald-500/10",
  },
];

export default function Clients() {
  const { clients } = useClients();
  const [data, setData] = useState(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "view" | "edit" | "delete"

  const openModal = (client, mode) => {
    setSelectedClient(client);
    setModalMode(mode);
  };
  const closeModal = () => {
    setSelectedClient(null);
    setModalMode(null);
  };


  const columns = useMemo(
    () => [
      {
        id: "avatar",
        header: "",
        size: 56,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <ClientAvatar
            firstName={row.original.first_name ?? ""}
            lastName={row.original.last_name  ?? ""}
            avatarUrl={row.original.image}
          />
        ),
      },

      {
        accessorKey: "first_name",
        header: "First Name",
        size: 120,
        minSize: 80,
      },
      { accessorKey: "last_name", header: "Last Name", size: 120, minSize: 80 },
      { accessorKey: "email", header: "Email", size: 200, minSize: 140 },
      { accessorKey: "address", header: "Address", size: 180, minSize: 120 },
      { accessorKey: "city", header: "City", size: 120, minSize: 80 },
      { accessorKey: "country", header: "Country", size: 120, minSize: 80 },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    mantinePaperProps: {
      // remove border/shadow — the parent card handles that
      style: { border: "none", boxShadow: "none", borderRadius: 0 },
    },
    mantineTableContainerProps: {
      style: { overflowX: "auto", width: "100%" },
    },
    mantineTableProps: {
      style: { tableLayout: "auto", width: "100%" },
      highlightOnHover: true,
    },
    mantineTableHeadProps: {
      style: { background: "#fafafa" },
    },
    mantineTableHeadCellProps: {
      style: {
        padding: "10px 16px",
        fontSize: 12,
        fontWeight: 500,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "0.5px solid #f3f4f6",
      },
    },
    mantineTableBodyCellProps: {
      style: {
        verticalAlign: "middle",
        padding: "12px 16px",
        borderBottom: "0.5px solid #f9fafb",
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => openModal(row.original, "view"),
      style: { cursor: "pointer" },
    }),
  });
  useEffect(() => {
    setData(clients);
  }, [clients]);
  return (
    <div className="min-h-screen bg-gray-50/60 p-1 sm:p-1 font-sans">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            Clients
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your clients and their information
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`
        relative overflow-hidden
        rounded-2xl border p-5
        bg-gradient-to-br ${s.color}
        backdrop-blur-md
        hover:scale-[1.02] hover:shadow-lg
        transition-all duration-300
      `}
          >
            {/* Glow orb */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            {/* Top row — icon + badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.iconColor} backdrop-blur-sm`}
              >
                {s.icon}
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeColor}`}
              >
                ↑ {s.badge}
                <span className="font-normal opacity-60 ml-0.5">{s.note}</span>
              </span>
            </div>

            {/* Value */}
            <p className="text-[28px] font-bold text-gray-900 leading-none mb-1">
              {s.value}
            </p>

            {/* Label */}
            <p className="text-xs font-medium text-gray-500 tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Table toolbar */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">All clients</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {data.length} records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setModalMode("create")} className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
              <span className="text-base leading-none">+</span> Add Client
            </button>
          </div>
        </div>

        <MantineReactTable table={table} />
      </div>

      {/* Modals */}
      {modalMode === "view" && (
        <ViewModal
          client={selectedClient}
          onClose={closeModal}
          onEdit={() => setModalMode("edit")}
          onDelete={() => setModalMode("delete")}
        />
      )}
      {modalMode === "edit" && (
        <EditModal
          client={selectedClient}
          onClose={closeModal}
        />
      )}
      {modalMode === "delete" && (
        <DeleteModal
          client={selectedClient}
          onClose={closeModal}
        />
      )}
      {modalMode === "create" && (
        <AddModal
          client={selectedClient}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
