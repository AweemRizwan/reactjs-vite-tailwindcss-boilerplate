import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/user/admin/Dashboard"
import Complaints from "./pages/user/admin/Complaints"
import AddComplaint from "./pages/user/AddComplaint"
import MyComplaints from "./pages/user/MyComplaints"
import { Navbar } from "./layout/Navbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  FileText,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react"

function HomePage() {
  const cards = [
    {
      title: "Submit New Complaint",
      description: "Report an issue or concern quickly and easily",
      icon: PlusCircle,
      color: "from-indigo-500 to-purple-600",
      hoverShadow: "hover:shadow-indigo-400/40",
      path: "/user/add",
    },
    {
      title: "My Complaints",
      description: "View and track the status of your submitted complaints",
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
      hoverShadow: "hover:shadow-blue-400/40",
      path: "/user/my-complaints",
    },
    {
      title: "Admin Dashboard",
      description: "View and manage all complaints (Admin access only)",
      icon: LayoutDashboard,
      color: "from-purple-500 to-pink-600",
      hoverShadow: "hover:shadow-purple-400/40",
      path: "/admin/dashboard",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mt-16 px-6">
      {cards.map((card) => (
        <Link to={card.path} key={card.title} className="block h-full">
          <Card
            className={`
              h-full relative overflow-hidden border-0 p-4 rounded-2xl shadow-xl
              hover:shadow-2xl hover:-translate-y-4 transition-all duration-500
              bg-white/80 backdrop-blur-sm ${card.hoverShadow}
            `}
          >
            {/* Gradient top bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${card.color}`} />

            <CardHeader className="pt-10 pb-8 px-8">
              <div className="flex items-start justify-between gap-8">
                {/* Left Side: Title + Description - Properly Left Aligned */}
                <div className="flex-1 text-left">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {card.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
              <div className="border-t border-gray-800"></div>
            <CardContent className="px-8 pb-10">
              {/* Button with perfect center alignment of text + icon */}
              <Button
                variant="ghost"
                size="lg"
                className="w-full justify-center group text-lg font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded-xl py-7"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50/20">
      <Navbar role={null} setRole={() => {}} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            Complaint Management System
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto">
            Efficiently submit, track, and resolve complaints with our streamlined platform.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/user/add" element={<AddComplaint />} />
          <Route path="/user/my-complaints" element={<MyComplaints />} />

          <Route
            path="/"
            element={
              <div className="text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What would you like to do?
                </h2>
                <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
                  Choose one of the options below to begin managing complaints effectively.
                </p>
                <HomePage />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}