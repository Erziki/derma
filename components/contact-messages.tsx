"use client"

import { useState, useEffect } from "react"
import { Trash2, Mail, Phone, User, MessageSquare, Clock, Eye, Reply, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { contactAPI } from "@/lib/api"

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: string
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const data = await contactAPI.getMessages()
      if (data && Array.isArray(data)) {
        setMessages(data)
      }
    } catch (error) {
      console.error("[v0] Error loading contact messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    
    try {
      await contactAPI.deleteMessage(id)
      await fetchMessages()
    } catch (error) {
      console.error("[v0] Error deleting message:", error)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      await contactAPI.updateMessageStatus(id, status)
      await fetchMessages()
    } catch (error) {
      console.error("[v0] Error updating message status:", error)
    }
  }

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.phone.includes(searchTerm) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || msg.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-700"
      case "read":
        return "bg-yellow-100 text-yellow-700"
      case "replied":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Contact Messages</h3>
        <p className="text-gray-600">Loading messages...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Contact Messages</h3>
          <p className="text-gray-600 text-sm mt-1">
            Total messages: <span className="font-semibold">{stats.total}</span> | 
            Unread: <span className="font-semibold text-blue-600">{stats.unread}</span> | 
            Read: <span className="font-semibold text-yellow-600">{stats.read}</span> | 
            Replied: <span className="font-semibold text-green-600">{stats.replied}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
        >
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {filteredMessages.length === 0 ? (
        <Card className="border-0 bg-gray-50">
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No contact messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredMessages.map((msg) => (
            <Card key={msg.id} className="border-0 hover:shadow-lg transition">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="w-5 h-5 text-teal-600" />
                        {msg.name}
                      </CardTitle>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(msg.status)}`}
                      >
                        {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {msg.status === "unread" && (
                      <Button
                        onClick={() => updateStatus(msg.id, "read")}
                        size="sm"
                        variant="outline"
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                      >
                        <Eye size={16} className="mr-1" />
                        Mark Read
                      </Button>
                    )}
                    {msg.status === "read" && (
                      <Button
                        onClick={() => updateStatus(msg.id, "replied")}
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Mark Replied
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteMessage(msg.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-600 mt-1" />
                  <span className="text-sm text-gray-700">{msg.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-600 mt-1" />
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg flex-1">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}