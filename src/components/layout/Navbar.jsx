import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { FileText, PlusCircle, LayoutDashboard, AlertTriangle } from "lucide-react"

export function Navbar() {
  const location = useLocation()

  const links = [
    { name: "Submit Complaint", path: "/user/add", icon: PlusCircle },
    { name: "My Complaints", path: "/user/my-complaints", icon: FileText },
    { name: "Admin Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "All Complaints", path: "/admin/complaints", icon: AlertTriangle },
  ]

const isActive = (path) => location.pathname === path;
  return (
<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="flex items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          CMS
        </div>
        <span className="ml-3 text-sm font-medium text-gray-500 hidden sm:block">
          Complaint Management System
        </span>
        </a>
      </div>

      {/* Desktop Navigation - Fixed for single line */}
      <div className="hidden md:flex items-center space-x-6">
        {links.map((link) => {
          const Icon = link.icon
          const active = isActive(link.path)
          return (
            <Link key={link.path} to={link.path}>
              <Button
                variant={active ? "default" : "ghost"}
                className={`
                  flex items-center justify-center
                  px-5 py-3
                  whitespace-nowrap
                  min-w-[160px]
                  text-sm font-medium
                  ${active
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-2.5 flex-shrink-0" />
                <span className="truncate">{link.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Mobile Menu (chhota rakha hai, optional improve kar sakte hain baad mein) */}
      <div className="flex md:hidden flex-col space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.path} to={link.path} className="w-full">
              <Button
                variant={isActive(link.path) ? "default" : "outline"}
                size="sm"
                className={
                  isActive(link.path)
                    ? "bg-indigo-600 hover:bg-indigo-700 w-full"
                    : "w-full justify-start"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {link.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  </div>
</nav>
  )
}