import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const Recruiter = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    fetchRequests();
    const intervalId = setInterval(fetchRequests, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://interviewdashboard-4.onrender.com/api/interview-requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      const response = await fetch(`https://interviewdashboard-4.onrender.com/api/interview-requests/${id}/accept`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      fetchRequests();
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
      <h1 className="text-2xl font-bold mb-6 text-center">Interview Requests</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {['all', 'pending', 'accepted'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md border ${
              filter === type
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Job Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Requested At</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredRequests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(req.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(req.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => handleAccept(req._id)}
                      disabled={processingIds.has(req._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm disabled:opacity-50"
                    >
                      {processingIds.has(req._id) ? 'Processing...' : 'Accept'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4 text-gray-400 text-sm">
                  No interview requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Auto-refresh status */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Auto-refresh every 15s</span>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
