"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BooksTable } from "@/components/admin/BookTable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BooksPage() {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <Button onClick={() => setOpenDialog(!openDialog)}>
          <Plus className="mr-2 h-4 w-4" /> Add Book
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Books List</CardTitle>
        </CardHeader>
        <CardContent>
          <BooksTable />
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>
              Add a new book to the collection.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-3">
              <Label htmlFor="id">Book ID</Label>
              <Input id="id" />
              <Label htmlFor="Title">Title</Label>
              <Input id="Title" />
              <Label htmlFor="Author">Author</Label>
              <Input id="Author" />
              <Label htmlFor="Category">Category</Label>
              <Input id="Category" />
              <Label htmlFor="Price">Price</Label>
              <Input id="Price" />
              <Label htmlFor="Stock">Stock</Label>
              <Input id="Stock" />
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
      </Dialog>
    </div>
  );
}
