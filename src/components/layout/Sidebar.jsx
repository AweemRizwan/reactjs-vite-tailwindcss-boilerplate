import { Button } from "@/components/ui/button"

export default function Sidebar({ role, setPage }) {
  const links = role === "admin"
    ? ["Dashboard", "All Complaints"]
    : ["Add Complaint", "My Complaints"]

  return (
    <div className="w-56 bg-slate-100 p-4 min-h-screen">
      {links.map((link) => (
        <Button
          key={link}
          className="w-full mb-2"
          onClick={() => setPage(link)}
        >
          {link}
        </Button>
      ))}
    </div>
  )
}
