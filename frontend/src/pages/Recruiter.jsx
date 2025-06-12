import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, Filter, Mail, User, Briefcase, Eye, EyeOff } from 'lucide-react';
import io from 'socket.io-client';

const Recruiter = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [socket, setSocket] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://interviewdashboard.onrender.com');
    setSocket(newSocket);

    // Fetch initial data
    fetchRequests();

    newSocket.on('newInterviewRequest', (newRequest) => {
      setRequests(prev => [newRequest, ...prev]);
      // Show notification effect
      showNotification('New interview request received!');
    });

    newSocket.on('requestStatusUpdated', (updatedRequest) => {
      setRequests(prev => 
        prev.map(req => 
          req._id === updatedRequest._id ? updatedRequest : req
        )
      );
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/interview-requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    // Simple notification - you could enhance this with a toast library
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handleAccept = async (id) => {
    setProcessingIds(prev => new Set(prev).add(id));
    
    try {
      const response = await fetch(`https://interviewdashboard.onrender.com/api/interview-requests/${id}/accept`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'pending') return request.status === 'pending';
    if (filter === 'accepted') return request.status === 'accepted';
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'accepted') {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          <span>Accepted</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Recruiter Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Real-time interview requests - no refresh needed!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{requests.length}</h3>
            <p className="text-gray-600">Total Requests</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {requests.filter(r => r.status === 'pending').length}
            </h3>
            <p className="text-gray-600">Pending</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {requests.filter(r => r.status === 'accepted').length}
            </h3>
            <p className="text-gray-600">Accepted</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Requests', icon: Eye },
                { key: 'pending', label: 'Pending', icon: Clock },
                { key: 'accepted', label: 'Accepted', icon: CheckCircle }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    filter === key
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="card">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <EyeOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No requests found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'No interview requests have been submitted yet.' 
                  : `No ${filter} requests at the moment.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Job Title</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Submitted</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr 
                      key={request._id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-2">
                        <div className="font-medium text-gray-800">{request.name}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-gray-600">{request.email}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-gray-800 font-medium">{request.jobTitle}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-gray-600 text-sm">{formatDate(request.createdAt)}</div>
                      </td>
                      <td className="py-4 px-2">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="py-4 px-2">
                        {request.status === 'pending' ? (
                          <button
                            onClick={() => handleAccept(request._id)}
                            disabled={processingIds.has(request._id)}
                            className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            {processingIds.has(request._id) ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                <span>Accept</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-green-600 font-medium text-sm">✓ Accepted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Real-time Status Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live updates enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;