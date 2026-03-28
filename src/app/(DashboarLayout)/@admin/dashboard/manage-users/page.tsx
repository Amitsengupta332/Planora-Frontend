// "use client";

// import { useEffect, useState } from "react";
// import { deleteUser, getAllUsers, TMeta, TUser, updateUser } from "@/services/users";

// export default function ManageUsersPage() {
//   const [users, setUsers] = useState<TUser[]>([]);
//   const [meta, setMeta] = useState<TMeta | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [role, setRole] = useState<"ADMIN" | "USER" | "">("");
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllUsers({
//         page,
//         limit,
//         searchTerm: searchTerm || undefined,
//         role: role || undefined,
//       });

//       setUsers(res.data);
//       setMeta(res.meta);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, searchTerm, role]);

//   const handleSearch = () => {
//     setPage(1);
//     setSearchTerm(inputValue);
//   };

//   const handleRoleChange = async (id: string, nextRole: "ADMIN" | "USER") => {
//     try {
//       setActionLoadingId(id);
//       await updateUser(id, { role: nextRole });
//       await fetchUsers();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       setActionLoadingId(id);
//       await deleteUser(id);

//       if (users.length === 1 && page > 1) {
//         setPage((prev) => prev - 1);
//       } else {
//         await fetchUsers();
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   return (
//     <div className="space-y-6 p-4 md:p-6">
//       <div>
//         <h1 className="text-2xl font-bold">Manage Users</h1>
//         <p className="text-sm text-muted-foreground">
//           View, search, filter, update roles, and delete users.
//         </p>
//       </div>

//       <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 md:flex-row md:items-center">
//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="h-10 w-full rounded-md border px-3 outline-none"
//         />

//         <select
//           value={role}
//           onChange={(e) => {
//             setPage(1);
//             setRole(e.target.value as "ADMIN" | "USER" | "");
//           }}
//           className="h-10 rounded-md border px-3 outline-none"
//         >
//           <option value="">All Roles</option>
//           <option value="ADMIN">ADMIN</option>
//           <option value="USER">USER</option>
//         </select>

//         <button
//           onClick={handleSearch}
//           className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
//         >
//           Search
//         </button>
//       </div>

//       <div className="overflow-hidden rounded-xl border bg-background">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[700px] text-sm">
//             <thead className="bg-muted/50 text-left">
//               <tr>
//                 <th className="px-4 py-3 font-medium">Name</th>
//                 <th className="px-4 py-3 font-medium">Email</th>
//                 <th className="px-4 py-3 font-medium">Role</th>
//                 <th className="px-4 py-3 font-medium">Created</th>
//                 <th className="px-4 py-3 font-medium text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
//                     Loading users...
//                   </td>
//                 </tr>
//               ) : users.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
//                     No users found
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id} className="border-t">
//                     <td className="px-4 py-3 font-medium">{user.name}</td>
//                     <td className="px-4 py-3">{user.email}</td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`rounded-full px-2 py-1 text-xs font-medium ${
//                           user.role === "ADMIN"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           disabled={actionLoadingId === user.id}
//                           onClick={() =>
//                             handleRoleChange(
//                               user.id,
//                               user.role === "ADMIN" ? "USER" : "ADMIN"
//                             )
//                           }
//                           className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-50"
//                         >
//                           {actionLoadingId === user.id
//                             ? "Updating..."
//                             : user.role === "ADMIN"
//                             ? "Make User"
//                             : "Make Admin"}
//                         </button>

//                         <button
//                           disabled={actionLoadingId === user.id}
//                           onClick={() => handleDelete(user.id)}
//                           className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
//                         >
//                           {actionLoadingId === user.id ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col gap-3 border-t px-4 py-4 md:flex-row md:items-center md:justify-between">
//           <p className="text-sm text-muted-foreground">
//             Page {meta?.page || 1} of {meta?.totalPage || 1} | Total users: {meta?.total || 0}
//           </p>

//           <div className="flex gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((prev) => prev - 1)}
//               className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               disabled={meta ? page >= meta.totalPage : true}
//               onClick={() => setPage((prev) => prev + 1)}
//               className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  deleteUser,
  getAllUsers,
  TMeta,
  TUser,
  updateUser,
} from "@/services/users";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [meta, setMeta] = useState<TMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER" | "">("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers({
        page,
        limit,
        searchTerm: searchTerm || undefined,
        role: role || undefined,
      });

      setUsers(res.data);
      setMeta(res.meta);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, role]);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(inputValue);
  };

  const handleRoleChange = async (id: string, nextRole: "ADMIN" | "USER") => {
    try {
      setActionLoadingId(id);
      await updateUser(id, { role: nextRole });
      toast.success(`User role updated to ${nextRole}`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update user role"
      );
    } finally {
      setActionLoadingId(null);
    }
  };

 const handleDelete = (id: string) => {
  toast.warning("Are you sure you want to delete this user?", {
    action: {
      label: "Delete",
      onClick: async () => {
        try {
          setActionLoadingId(id);
          await deleteUser(id);
          toast.success("User deleted successfully");

          if (users.length === 1 && page > 1) {
            setPage((prev) => prev - 1);
          } else {
            await fetchUsers();
          }
        } catch (error) {
          console.error(error);
          toast.error(
            error instanceof Error ? error.message : "Failed to delete user"
          );
        } finally {
          setActionLoadingId(null);
        }
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">
          View, search, filter, update roles, and delete users.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-10 w-full rounded-md border px-3 outline-none"
        />

        <select
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value as "ADMIN" | "USER" | "");
          }}
          className="h-10 rounded-md border px-3 outline-none"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <button
          onClick={handleSearch}
          className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
        >
          Search
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          disabled={actionLoadingId === user.id}
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              user.role === "ADMIN" ? "USER" : "ADMIN"
                            )
                          }
                          className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-50"
                        >
                          {actionLoadingId === user.id
                            ? "Updating..."
                            : user.role === "ADMIN"
                              ? "Make User"
                              : "Make Admin"}
                        </button>

                        <button
                          disabled={actionLoadingId === user.id}
                          onClick={() => handleDelete(user.id)}
                          className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoadingId === user.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta?.page || 1} of {meta?.totalPage || 1} | Total users:{" "}
            {meta?.total || 0}
          </p>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={meta ? page >= meta.totalPage : true}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}