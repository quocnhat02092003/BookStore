"use client";

import { MoreHorizontal, User, Ban, Check, Trash } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { getAllUser_Admin } from "@/service/AdminService";
import { UserType } from "@/type/ResponseType/UserType";
import { Spinner } from "../ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

export function UsersTable() {
  const renderStatus = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-500">Active</Badge>
    ) : (
      <Badge className="bg-red-500">Banned</Badge>
    );
  };

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [usersData, setUsersData] = React.useState<UserType>();
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.title = "Users Dashboard - BookStore Management";
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const response = await getAllUser_Admin();
        setUsersData(response);
        localStorage.setItem(
          "usersDataLength",
          JSON.stringify(response.data.length)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Users:", error);
      }
    };
    fetchUsersData();
  }, []);

  return (
    <div className="border rounded-md">
      {!loading && usersData?.data !== undefined ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usersData?.data &&
              usersData?.data.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.id}</TableCell>

                  <TableCell>{u.fullName}</TableCell>

                  <TableCell>{u.email}</TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {u.role == "1" ? "User" : "Admin"}
                    </Badge>
                  </TableCell>

                  <TableCell>{renderStatus(u.status)}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            setSelectedUser(u.id);
                            setOpenDialog(true);
                          }}
                        >
                          <User size={16} /> View Details
                        </DropdownMenuItem>
                        {u.status === "Active" ? (
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-500"
                            onClick={() =>
                              toast.warning("Ban this user, sure?", {
                                action: {
                                  label: "Yes, Ban",
                                  onClick: () => {
                                    toast.success("User banned successfully.");
                                  },
                                },
                              })
                            }
                          >
                            <Ban size={16} /> Ban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-green-600"
                            onClick={() =>
                              toast.warning("Unban this user, sure?", {
                                action: {
                                  label: "Yes, Unban",
                                  onClick: () => {
                                    toast.success(
                                      "User unbanned successfully."
                                    );
                                  },
                                },
                              })
                            }
                          >
                            <Check size={16} /> Unban User
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            toast.warning("Delete this user, sure?", {
                              action: {
                                label: "Yes, Delete",
                                onClick: () => {
                                  toast.success("User deleted successfully.");
                                },
                              },
                            })
                          }
                        >
                          <Trash size={16} />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center w-full h-48">
          You are not admin. Please get out quiclkly.
        </div>
      )}
      {/* No data Available */}
      {!loading && usersData?.data.length === 0 && (
        <div className="flex justify-center items-center w-full h-48">
          No users available.
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-48">
          <Spinner />
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {selectedUser && usersData?.data.find((u) => u.id === selectedUser) && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                User information and actions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-3">
                <Label htmlFor="id">User ID</Label>
                <Input id="id" defaultValue={selectedUser} readOnly />
                <Label htmlFor="Fullname">Fullname</Label>
                <Input
                  id="Fullname"
                  defaultValue={
                    usersData?.data.find((u) => u.id === selectedUser)
                      ?.fullName || ""
                  }
                  readOnly
                />
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="Email"
                  defaultValue={
                    usersData?.data.find((u) => u.id === selectedUser)?.email ||
                    ""
                  }
                  readOnly
                />
                <Label htmlFor="Role">Role</Label>
                <Input
                  id="Role"
                  defaultValue={
                    usersData?.data
                      .find((u) => u.id === selectedUser)
                      ?.role.toString() == "1"
                      ? "User"
                      : "Admin"
                  }
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
