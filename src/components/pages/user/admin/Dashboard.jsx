import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
} from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Complaints",
      value: 24,
      icon: FileText,
      color: "text-indigo-600",
      bgGradient: "from-indigo-500 to-purple-600",
      badgeVariant: "default",
    },
    {
      title: "Pending",
      value: 10,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgGradient: "from-orange-400 to-red-500",
      badgeVariant: "destructive",
    },
    {
      title: "Resolved",
      value: 14,
      icon: CheckCircle2,
      color: "text-green-600",
      bgGradient: "from-green-500 to-emerald-600",
      badgeVariant: "default",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Overview of your complaint management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 p-4"
            >
              {/* Gradient Top Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${stat.bgGradient}`}
              />

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-5xl font-extrabold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <Badge
                  variant={stat.badgeVariant}
                  className={`mt-3 ${
                    stat.title === "Resolved"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : stat.title === "Pending"
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                      : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  } border-0`}
                >
                  {stat.title === "Total Complaints" ? "All time" : stat.title}
                </Badge>
              </CardContent>

              {/* Subtle overlay effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-white/30" />
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Data updated as of today • Refresh to see latest stats
        </div>
      </div>
    </div>
  )
}