import { useEffect, useState } from "react"
import { getComplaints } from "@/services/api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await getComplaints()
      setComplaints(data)
      setLoading(false)
    }

    fetchComplaints()
  }, [])


  const getStatusVariant = (status) => {
    switch (status) {
      case "Resolved":
        return "default" // green
      case "Pending":
        return "destructive" // red/orange
      case "In Progress":
        return "secondary" // gray
      default:
        return "outline"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {loading && (
          <p className="text-center text-gray-500 py-12">
            Loading complaints...
          </p>
        )}
        <Card className="shadow-2xl border-0 overflow-hidden p-4">
          {/* Gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              My Complaints
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Track the status of all your submitted complaints
            </CardDescription>
          </CardHeader>

          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No complaints found</p>
                <p className="text-sm text-gray-500 mt-2">
                  Submit your first complaint to get started!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Title</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((c, index) => (
                      <TableRow
                        key={c.id}
                        className={`
                          hover:bg-indigo-50/70 transition-colors duration-200
                          ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                        `}
                      >
                        <TableCell className="font-medium text-gray-900">
                          #{c.id.toString().padStart(4, "0")}
                        </TableCell>
                        <TableCell className="font-medium text-gray-800 max-w-xs">
                          <span className="line-clamp-2">{c.title}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={`
                              px-3 py-1 font-medium border-0
                              ${getStatusColor(c.status)}
                            `}
                          >
                            {c.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Footer info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Showing {complaints.length} complaint{complaints.length !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}