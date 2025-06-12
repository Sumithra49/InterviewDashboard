import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, Filter, Mail, User, Briefcase, Eye, EyeOff } from 'lucide-react';

const Recruiter = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    fetchRequests();

    // Polling every 15 seconds
    const intervalId = setInterval(fetchRequests, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://interviewdashboard-1.onrender.com/api/interview-requests');
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
      const response = await fetch(`https://interviewdashboard-1.onrender.com/api/interview-requests/${id}/accept`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      fetchRequests(); // Re-fetch after accept
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
      {/* ... keep the rest of your JSX for stats, filters, table as-is ... */}
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
