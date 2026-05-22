import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import useClients from "./../../contexts/ClientsContext";
import { Avatar,Drawer, Button, TextInput, Stack, Group, Text, Divider, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const stats = [
  { label: "Total Projects", value: "12.9K", badge: "+2", note: "this week" },
  { label: "Active Tasks", value: "34.9K", badge: "+8", note: "due today" },
  { label: "Team Members", value: "8K", badge: "+2", note: "2 online" },
];
// Generates a consistent color from a name string
function stringToColor(str = "") {
  const colors = [
    { bg: "#E6F1FB", text: "#0C447C" }, // blue
    { bg: "#E1F5EE", text: "#085041" }, // teal
    { bg: "#EEEDFE", text: "#3C3489" }, // purple
    { bg: "#FAECE7", text: "#712B13" }, // coral
    { bg: "#FBEAF0", text: "#72243E" }, // pink
    { bg: "#EAF3DE", text: "#27500A" }, // green
    { bg: "#FAEEDA", text: "#633806" }, // amber
  ];
  const index = [...str].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[index];
}
function ClientAvatar({ firstName = "", lastName = "", avatarUrl }) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
  const { bg, text } = stringToColor(firstName + lastName);

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #f0f0f0",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: bg,
        color: text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: 13,
        flexShrink: 0,
        letterSpacing: "0.03em",
      }}
    >
      {initials}
    </div>
  );
}



// ── View mode ───────────────────────────────────────────────────────────────
function ViewDrawer({ client, onEdit, onDelete }) {
  const fields = [
    { label: "First name", value: client.first_name },
    { label: "Last name",  value: client.last_name  },
    { label: "Email",      value: client.email      },
    { label: "Address",    value: client.address    },
    { label: "City",       value: client.city       },
    { label: "Country",    value: client.country    },
  ];

  return (
    <Stack gap="lg">
      {/* Avatar + name hero */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingBottom: 8 }}>
        <ClientAvatar firstName={client.first_name} lastName={client.last_name} avatarUrl={client.avatar_url} size={72} />
        <div style={{ textAlign: "center" }}>
          <Text fw={600} size="lg">{client.first_name} {client.last_name}</Text>
          <Text size="sm" c="dimmed">{client.email}</Text>
        </div>
      </div>

      <Divider />

      {/* Fields */}
      <Stack gap="xs">
        {fields.map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f0f0f0" }}>
            <Text size="sm" c="dimmed">{label}</Text>
            <Text size="sm" fw={500}>{value || "—"}</Text>
          </div>
        ))}
      </Stack>

      {/* Actions */}
      <Group grow mt="md">
        <Button variant="light" color="blue" onClick={onEdit}>Edit</Button>
        <Button variant="light" color="red" onClick={onDelete}>Delete</Button>
      </Group>
    </Stack>
  );
}


// ── Edit mode ────────────────────────────────────────────────────────────────
function EditDrawer({ client, onSave, onCancel }) {
  const [form, setForm] = useState({ ...client });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Stack gap="md">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <ClientAvatar firstName={form.first_name} lastName={form.last_name} size={48} />
        <div>
          <Text fw={500}>{form.first_name} {form.last_name}</Text>
          <Text size="xs" c="dimmed">Editing client</Text>
        </div>
      </div>

      <Divider />

      <Group grow>
        <TextInput label="First name" value={form.first_name} onChange={set("first_name")} />
        <TextInput label="Last name"  value={form.last_name}  onChange={set("last_name")}  />
      </Group>
      <TextInput label="Email"   value={form.email}   onChange={set("email")}   />
      <TextInput label="Address" value={form.address} onChange={set("address")} />
      <Group grow>
        <TextInput label="City"    value={form.city}    onChange={set("city")}    />
        <TextInput label="Country" value={form.country} onChange={set("country")} />
      </Group>

      <Group grow mt="md">
        <Button variant="default" onClick={onCancel}>Cancel</Button>
        <Button color="blue" onClick={() => onSave(form)}>Save changes</Button>
      </Group>
    </Stack>
  );
}

// ── Delete confirm ───────────────────────────────────────────────────────────
function DeleteDrawer({ client, onConfirm, onCancel }) {
  return (
    <Stack gap="lg" align="center" style={{ textAlign: "center", paddingTop: 16 }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#FCEBEB", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 24,
      }}>
        🗑
      </div>
      <div>
        <Text fw={600} size="lg">Delete client?</Text>
        <Text size="sm" c="dimmed" mt={4}>
          This will permanently remove{" "}
          <Text span fw={500} c="dark">{client.first_name} {client.last_name}</Text>{" "}
          from your client list. This action cannot be undone.
        </Text>
      </div>

      <Group grow style={{ width: "100%" }} mt="md">
        <Button variant="default" onClick={onCancel}>Cancel</Button>
        <Button color="red" onClick={() => onConfirm(client)}>Yes, delete</Button>
      </Group>
    </Stack>
  );
}



function ClientModal({ client, onClose }) {
  if (!client) return null;

  const fields = [
    { label: "Email",   value: client.email   },
    { label: "Address", value: client.address },
    { label: "City",    value: client.city    },
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="h-20 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-end">
          <button
            onClick={onClose}
            className=" top-3 right-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="px-6 pb-0 -mt-10 flex items-end gap-4">
          <div className="ring-4 ring-white rounded-full">
            <ClientAvatar
              firstName={client.first_name}
              lastName={client.last_name}
              avatarUrl={client.avatar_url}
              size={72}
            />
          </div>
          <div className="pb-2">
            <p className="text-lg font-semibold text-gray-800 leading-tight">
              {client.first_name} {client.last_name}
            </p>
            <p className="text-sm text-gray-400">{client.city}, {client.country}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-4 border-t border-gray-100" />

        {/* Fields */}
        <div className="px-6 py-4 space-y-3">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-700">{value || "—"}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Action buttons */}
        <div className="px-6 py-4 flex gap-3">
          <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all">
            Edit
          </button>
          <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all">
            Message
          </button>
          <button className="py-2 px-4 rounded-xl text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 active:scale-95 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const { clients } = useClients();
  const [data] = useState(clients);
  // const [selectedClient, setSelectedClient] = useState(null);

  const [selectedClient, setSelectedClient] = useState(null);
  const [drawerMode, setDrawerMode] = useState("view"); // "view" | "edit" | "delete"
  const [opened, { open, close }] = useDisclosure(false);

  const openDrawer = (client, mode = "view") => {
    setSelectedClient(client);
    setDrawerMode(mode);
    open();
  };

  const handleSave = (updated) => {
    setData((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedClient(updated);
    setDrawerMode("view");
  };

  const handleDelete = (client) => {
    setData((prev) => prev.filter((c) => c.id !== client.id));
    close();
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
            firstName={row.original.first_name}
            lastName={row.original.last_name}
            avatarUrl={row.original.avatar_url} // optional — remove if not in your data
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
  // const table = useMantineReactTable({
  //   columns,
  //   data,
  //   mantinePaperProps: {
  //     className: "!rounded-2xl !bg-card !border !shadow-none",
  //   },

  //   mantineTableBodyCellProps: {
  //     className: "text-muted-foreground",
  //   },
  // });
  const table = useMantineReactTable({
    columns,
    data,
    mantinePaperProps: {
      className: "!rounded-2xl !bg-card !border !shadow-none",
    },
    mantineTableContainerProps: {
      style: { overflowX: "auto", width: "100%" },
    },
    mantineTableProps: {
      style: { tableLayout: "auto", width: "100%" },
      highlightOnHover: true,
    },
    mantineTableBodyCellProps: {
      style: { verticalAlign: "middle", padding: "10px 16px" },
    },
    mantineTableHeadCellProps: {
      style: { padding: "10px 16px" },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => openDrawer(row.original, "view"),
      style: { cursor: "pointer" },
    }),
  });
  useEffect(() => {
    console.log(clients);
  }, [clients]);
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your personal information and permissions
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {s.badge}
              </span>
              <p className="text-xs text-gray-400 mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <MantineReactTable table={table} />
      </div>
      {/* Modal */}
      {/* Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="md"
        padding="xl"
        title={
          drawerMode === "view"   ? "Client details" :
          drawerMode === "edit"   ? "Edit client"    :
                                    "Delete client"
        }
        styles={{
          title: { fontWeight: 600, fontSize: 16 },
          header: { borderBottom: "0.5px solid #f0f0f0", paddingBottom: 12 },
        }}
      >
        {selectedClient && drawerMode === "view" && (
          <ViewDrawer
            client={selectedClient}
            onEdit={() => setDrawerMode("edit")}
            onDelete={() => setDrawerMode("delete")}
          />
        )}
        {selectedClient && drawerMode === "edit" && (
          <EditDrawer
            client={selectedClient}
            onSave={handleSave}
            onCancel={() => setDrawerMode("view")}
          />
        )}
        {selectedClient && drawerMode === "delete" && (
          <DeleteDrawer
            client={selectedClient}
            onConfirm={handleDelete}
            onCancel={() => setDrawerMode("view")}
          />
        )}
      </Drawer>
    </div>
  );
}
