import { useState } from 'react'
import { createComplaint } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AlertCircle, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AddComplaint() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    if (!title || !category || !priority || !description) {
      alert('Please fill all fields')
      return
    }

    const newComplaint = {
      title,
      category,
      priority,
      description,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    await createComplaint(newComplaint)

    // reset form
    setTitle('')
    setCategory('')
    setPriority('')
    setDescription('')

    alert('Complaint submitted successfully')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Gradient top accent */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <CardHeader className="space-y-4 pb-8 pt-10">
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Submit a New Complaint
            </CardTitle>
            <CardDescription className="text-center text-lg text-gray-600 max-w-lg mx-auto">
              Please provide clear details about your issue. Our team will
              review it promptly and keep you updated.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-7 p-8 pb-10">
            {/* Complaint Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-base font-medium text-gray-700"
              >
                Complaint Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Delay in service delivery"
                className="h-12 text-base rounded-lg pl-4"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-base font-medium text-gray-700"
              >
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className="h-12 rounded-lg pl-4 text-left"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-2xl rounded-lg min-w-[200px] py-2">
                  <SelectItem value="service">Service Issue</SelectItem>
                  <SelectItem value="billing">Billing & Payment</SelectItem>
                  <SelectItem value="technical">Technical Problem</SelectItem>
                  <SelectItem value="staff">Staff Behavior</SelectItem>
                  <SelectItem value="facility">
                    Facility / Maintenance
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Level */}
            <div className="space-y-2">
              <Label
                htmlFor="priority"
                className="text-base font-medium text-gray-700"
              >
                Priority Level
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger
                  id="priority"
                  className="h-12 rounded-lg pl-4 text-left"
                >
                  <SelectValue placeholder="How urgent is this?" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-2xl rounded-lg min-w-[200px] py-2">
                  <SelectItem value="low">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                      High
                    </div>
                  </SelectItem>
                  <SelectItem value="critical">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                      Critical
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-base font-medium text-gray-700"
              >
                Detailed Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue in detail. Include relevant dates, names, locations, and any steps you've already taken to resolve it."
                className="min-h-52 resize-none text-base rounded-lg p-4"
              />
            </div>

            {/* Submit Button with Badge */}
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Send className="h-5 w-5" />
              <span>Submit Complaint</span>
            </Button>

            {/* Helper Text */}
            <p className="text-center text-sm text-gray-500 pt-2">
              You will receive a tracking ID and confirmation once submitted.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
