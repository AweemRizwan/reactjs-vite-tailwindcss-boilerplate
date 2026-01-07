import { useEffect, useState } from "react"
import { getComplaints, updateComplaintStatus } from "@/services/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function Complaints() {
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


  const handleResolve = async (id) => {
  await updateComplaintStatus(id, "Resolved")

  setComplaints((prev) =>
    prev.map((c) =>
      c.id === id ? { ...c, status: "Resolved" } : c
    )
  )
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-2xl border-0 overflow-hidden p-4">
          {/* Gradient top accent */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <CardHeader className="pb-8 pt-10">
            <CardTitle className="text-3xl font-bold text-gray-900">
              All Complaints
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Manage and resolve user-submitted complaints
            </CardDescription>
          </CardHeader>

          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No complaints yet
                </h3>
                <p className="text-gray-500">
                  All clear! Users haven't submitted any complaints.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">Complaint ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Title</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((c, index) => (
                      <TableRow
                        key={c.id}
                        className={`
                          hover:bg-indigo-50/60 transition-all duration-200
                          ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                        `}
                      >
                        <TableCell className="font-medium text-gray-900">
                          #{c.id.toString().padStart(4, "0")}
                        </TableCell>
                        <TableCell className="font-medium text-gray-800 max-w-md">
                          <span className="line-clamp-2">{c.title}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`px-4 py-1.5 font-medium border ${getStatusBadgeClass(c.status)}`}
                          >
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {c.status !== "Resolved" ? (
                            <Button
                              onClick={() => handleResolve(c.id)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Resolve
                            </Button>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle2 className="w-4 h-4 mr-1.5" />
                              Resolved
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Summary Footer */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-gray-600">Pending: {complaints.filter(c => c.status === "Pending").length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-gray-600">In Progress: {complaints.filter(c => c.status === "In Progress").length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Resolved: {complaints.filter(c => c.status === "Resolved").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}