import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AdminNavbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Admin</span>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="admin avatar" />
        </Avatar>
      </div>
    </header>
  );
}
