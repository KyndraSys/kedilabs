import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Users, 
  Mail, 
  Calendar, 
  Download, 
  Search, 
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Phone,
  Building2,
  Clock,
  Hash,
  Globe,
  CheckCircle,
  AlertTriangle,
  Trash2,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedSubmissions, setSelectedSubmissions] = useState(new Set());
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    byType: {},
    recentActivity: []
  });

  // Hardcoded admin password hash (in production, this should be in environment variables)
  const ADMIN_PASSWORD_HASH = '7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730'; // sha256 of 'KediLabsAdmin2024!'

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedPassword = await hashPassword(password);
    
    if (hashedPassword === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      setPassword('');
      loadSubmissions();
    } else {
      alert('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': 'Bearer admin-token' // In production, use proper JWT
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
        calculateStats(data.submissions || []);
      } else {
        // For demo purposes, load mock data
        const mockData = generateMockSubmissions();
        setSubmissions(mockData);
        calculateStats(mockData);
      }
    } catch (error) {
      console.error('Failed to load submissions:', error);
      // Load mock data as fallback
      const mockData = generateMockSubmissions();
      setSubmissions(mockData);
      calculateStats(mockData);
    }
    setLoading(false);
  };

  const generateMockSubmissions = () => {
    const types = ['general', 'volunteer', 'events', 'donor'];
    const names = ['John Doe', 'Jane Smith', 'David Wilson', 'Sarah Johnson', 'Michael Brown'];
    const orgs = ['Tech University', 'Local NGO', 'Innovation Hub', 'Community Center', ''];
    
    return Array.from({ length: 15 }, (_, i) => ({
      id: `sub_${Date.now()}_${i}`,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      stakeholderType: types[Math.floor(Math.random() * types.length)],
      name: names[Math.floor(Math.random() * names.length)],
      email: `user${i}@example.com`,
      phone: `+254${Math.floor(Math.random() * 900000000) + 100000000}`,
      organization: orgs[Math.floor(Math.random() * orgs.length)],
      subject: `Inquiry ${i + 1} - STEM Education Partnership`,
      message: `This is a sample inquiry message for submission ${i + 1}. The user is interested in learning more about our programs and how they can get involved.`,
      interests: i % 2 === 0 ? 'STEM Education' : '',
      availability: i % 3 === 0 ? 'Part-time' : '',
      fundingAmount: i % 4 === 0 ? '$10,000 - $25,000' : '',
      ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }));
  };

  const calculateStats = (data) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const thisMonthCount = data.filter(sub => {
      const subDate = new Date(sub.timestamp);
      return subDate.getMonth() === thisMonth && subDate.getFullYear() === thisYear;
    }).length;

    const byType = data.reduce((acc, sub) => {
      acc[sub.stakeholderType] = (acc[sub.stakeholderType] || 0) + 1;
      return acc;
    }, {});

    const recentActivity = data
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

    setStats({
      total: data.length,
      thisMonth: thisMonthCount,
      byType,
      recentActivity
    });
  };

  const filteredSubmissions = submissions
    .filter(sub => {
      const matchesSearch = searchTerm === '' || 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.organization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || sub.stakeholderType === filterType;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const toggleSelected = (id) => {
    const newSelected = new Set(selectedSubmissions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubmissions(newSelected);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Type', 'Name', 'Email', 'Phone', 'Organization', 'Subject', 'Message'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(sub => [
        sub.id,
        sub.timestamp,
        sub.stakeholderType,
        sub.name,
        sub.email,
        sub.phone || '',
        sub.organization || '',
        `"${sub.subject}"`,
        `"${sub.message.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kedi-labs-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStakeholderLabel = (type) => {
    const labels = {
      general: 'General Inquiry',
      volunteer: 'Volunteer',
      events: 'Events',
      donor: 'Donor/Investor'
    };
    return labels[type] || type;
  };

  const getStakeholderColor = (type) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      volunteer: 'bg-green-100 text-green-800',
      events: 'bg-purple-100 text-purple-800',
      donor: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              🔒 Secure admin access for Kedi Labs team only
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Kedi Labs Admin</h1>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.byType.volunteer || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.byType.donor || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">All Types</option>
                <option value="general">General</option>
                <option value="volunteer">Volunteers</option>
                <option value="events">Events</option>
                <option value="donor">Donors</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="timestamp-desc">Newest First</option>
                <option value="timestamp-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="stakeholderType-asc">Type A-Z</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={loadSubmissions}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          {selectedSubmissions.size > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-blue-800 font-medium">
                {selectedSubmissions.size} submission(s) selected
              </span>
              <button className="text-red-600 hover:text-red-800 flex items-center">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Contact Submissions ({filteredSubmissions.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No submissions found matching your criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedSubmissions.has(submission.id)}
                        onChange={() => toggleSelected(submission.id)}
                        className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {submission.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStakeholderColor(submission.stakeholderType)}`}>
                            {getStakeholderLabel(submission.stakeholderType)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <a href={`mailto:${submission.email}`} className="hover:text-teal-600 truncate">
                              {submission.email}
                            </a>
                          </div>
                          
                          {submission.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              <a href={`tel:${submission.phone}`} className="hover:text-teal-600">
                                {submission.phone}
                              </a>
                            </div>
                          )}
                          
                          {submission.organization && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="truncate">{submission.organization}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{new Date(submission.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="font-medium text-gray-900 mb-1">{submission.subject}</p>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {submission.message}
                          </p>
                        </div>

                        {expandedItems.has(submission.id) && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Submission ID</p>
                                <p className="text-sm text-gray-600 font-mono">{submission.id}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">IP Address</p>
                                <p className="text-sm text-gray-600 font-mono">{submission.ip_address}</p>
                              </div>
                            </div>

                            {submission.interests && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Interests</p>
                                <p className="text-sm text-gray-600">{submission.interests}</p>
                              </div>
                            )}

                            {submission.availability && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Availability</p>
                                <p className="text-sm text-gray-600">{submission.availability}</p>
                              </div>
                            )}

                            {submission.experience && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Experience</p>
                                <p className="text-sm text-gray-600">{submission.experience}</p>
                              </div>
                            )}

                            {submission.fundingAmount && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Funding Amount</p>
                                <p className="text-sm text-gray-600">{submission.fundingAmount}</p>
                              </div>
                            )}

                            {submission.investmentType && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Investment Type</p>
                                <p className="text-sm text-gray-600">{submission.investmentType}</p>
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Full Message</p>
                              <p className="text-sm text-gray-600 whitespace-pre-wrap">{submission.message}</p>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <a
                                href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                Reply
                              </a>
                              {submission.phone && (
                                <a
                                  href={`tel:${submission.phone}`}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleExpanded(submission.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        {expandedItems.has(submission.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      <div className="relative">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions by Type</h3>
            <div className="space-y-3">
              {Object.entries(stats.byType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-600">{getStakeholderLabel(type)}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {stats.recentActivity.slice(0, 5).map((submission) => (
                <div key={submission.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{submission.name}</p>
                    <p className="text-xs text-gray-500">{submission.subject}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(submission.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;