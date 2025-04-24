import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Search, 
  CalendarDays, 
  Clock, 
  PlusSquare, 
  Eye, 
  Filter, 
  Download, 
  SortAsc, 
  SortDesc,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RequestItem {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed' | 'revisions' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

const RequestHistory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data for request history
  const mockRequests: RequestItem[] = [
    { 
      id: '1', 
      title: 'Website Redesign', 
      type: 'website',
      status: 'completed', 
      createdAt: '2023-03-10T09:00:00Z',
      updatedAt: '2023-03-15T14:30:00Z',
      completedAt: '2023-03-15T14:30:00Z'
    },
    { 
      id: '2', 
      title: 'Logo Design for Startup', 
      type: 'logo',
      status: 'inProgress', 
      createdAt: '2023-04-05T11:20:00Z',
      updatedAt: '2023-04-07T16:45:00Z'
    },
    { 
      id: '3', 
      title: 'Marketing Brochure', 
      type: 'print',
      status: 'pending', 
      createdAt: '2023-04-12T08:15:00Z',
      updatedAt: '2023-04-12T08:15:00Z'
    },
    { 
      id: '4', 
      title: 'Social Media Template Pack', 
      type: 'social',
      status: 'revisions', 
      createdAt: '2023-03-25T10:30:00Z',
      updatedAt: '2023-04-02T13:20:00Z'
    },
    { 
      id: '5', 
      title: 'Conference Booth Design', 
      type: 'exhibition',
      status: 'cancelled', 
      createdAt: '2023-02-18T14:00:00Z',
      updatedAt: '2023-02-20T09:10:00Z'
    },
    { 
      id: '6', 
      title: 'Annual Report Design', 
      type: 'print',
      status: 'completed', 
      createdAt: '2023-01-05T16:45:00Z',
      updatedAt: '2023-01-22T11:30:00Z',
      completedAt: '2023-01-22T11:30:00Z'
    },
  ];

  // Filter and sort requests
  const filteredRequests = mockRequests
    .filter(request => 
      (statusFilter === 'all' || request.status === statusFilter) &&
      request.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'inProgress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'revisions': return 'Revisions';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'pending';
      case 'inProgress': return 'inProgress';
      case 'completed': return 'completed';
      case 'revisions': return 'warning';
      case 'cancelled': return 'cancelled';
      default: return 'default';
    }
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return mockRequests.length;
    return mockRequests.filter(req => req.status === status).length;
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Request History</h1>
        <p className="text-muted-foreground">View and manage all your design requests</p>
      </motion.div>

      <motion.div 
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortDirection}
              className="flex items-center"
            >
              {sortDirection === 'asc' ? (
                <><SortAsc className="mr-1 h-4 w-4" /> Oldest</>
              ) : (
                <><SortDesc className="mr-1 h-4 w-4" /> Newest</>
              )}
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <Filter className="mr-1 h-4 w-4" /> Filter
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="md:ml-4">
              <Link to="/dashboard/requests/new">
                <PlusSquare className="mr-2 h-4 w-4" /> New Request
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" onValueChange={setStatusFilter} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All <span className="px-2 py-0.5 text-xs rounded-full bg-muted">({getStatusCount('all')})</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending <span className="px-2 py-0.5 text-xs rounded-full bg-muted">({getStatusCount('pending')})</span>
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="flex items-center gap-2">
            In Progress <span className="px-2 py-0.5 text-xs rounded-full bg-muted">({getStatusCount('inProgress')})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed <span className="px-2 py-0.5 text-xs rounded-full bg-muted">({getStatusCount('completed')})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRequests.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredRequests.map(request => (
                <motion.div
                  key={request.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Link 
                              to={`/dashboard/requests/${request.id}`}
                              className="text-lg font-medium hover:text-wemakit-purple hover:underline transition-colors"
                            >
                              {request.title}
                            </Link>
                            <StatusBadge 
                              variant={getStatusVariant(request.status)}
                              pulse={request.status === 'inProgress'}
                              className="md:ml-2 w-fit"
                            >
                              {getStatusLabel(request.status)}
                            </StatusBadge>
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                            <div className="flex items-center">
                              <CalendarDays className="mr-1 h-3.5 w-3.5" />
                              Created: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              Updated: {new Date(request.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="capitalize bg-muted/50 px-2 py-0.5 rounded text-xs">
                              {request.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {request.status === 'completed' && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" className="h-8">
                                <Download className="mr-1 h-4 w-4" /> Download
                              </Button>
                            </motion.div>
                          )}
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="default" size="sm" className="h-8">
                              <Link to={`/dashboard/requests/${request.id}`}>
                                <Eye className="mr-1 h-4 w-4" /> View Details
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="rounded-full bg-muted p-3">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">No requests found matching your filters</p>
                      <Button asChild>
                        <Link to="/dashboard/requests/new">
                          <PlusSquare className="mr-2 h-4 w-4" /> Create New Request
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {/* Same structure as "all" tab */}
          {filteredRequests.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredRequests.map(request => (
                <motion.div
                  key={request.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4 md:p-6">
                      {/* Same content structure as in "all" tab */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Link 
                              to={`/dashboard/requests/${request.id}`}
                              className="text-lg font-medium hover:text-wemakit-purple hover:underline transition-colors"
                            >
                              {request.title}
                            </Link>
                            <StatusBadge 
                              variant={getStatusVariant(request.status)}
                              pulse={request.status === 'inProgress'}
                              className="md:ml-2 w-fit"
                            >
                              {getStatusLabel(request.status)}
                            </StatusBadge>
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                            <div className="flex items-center">
                              <CalendarDays className="mr-1 h-3.5 w-3.5" />
                              Created: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              Updated: {new Date(request.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="capitalize bg-muted/50 px-2 py-0.5 rounded text-xs">
                              {request.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {request.status === 'completed' && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" className="h-8">
                                <Download className="mr-1 h-4 w-4" /> Download
                              </Button>
                            </motion.div>
                          )}
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="default" size="sm" className="h-8">
                              <Link to={`/dashboard/requests/${request.id}`}>
                                <Eye className="mr-1 h-4 w-4" /> View Details
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="rounded-full bg-muted p-3">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">No pending requests found</p>
                      <Button asChild>
                        <Link to="/dashboard/requests/new">
                          <PlusSquare className="mr-2 h-4 w-4" /> Create New Request
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="inProgress" className="space-y-4">
          {/* Similar structure for in-progress requests */}
          {filteredRequests.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredRequests.map(request => (
                <motion.div
                  key={request.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Same content structure */}
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Link 
                              to={`/dashboard/requests/${request.id}`}
                              className="text-lg font-medium hover:text-wemakit-purple hover:underline transition-colors"
                            >
                              {request.title}
                            </Link>
                            <StatusBadge 
                              variant={getStatusVariant(request.status)}
                              pulse={request.status === 'inProgress'}
                              className="md:ml-2 w-fit"
                            >
                              {getStatusLabel(request.status)}
                            </StatusBadge>
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                            <div className="flex items-center">
                              <CalendarDays className="mr-1 h-3.5 w-3.5" />
                              Created: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              Updated: {new Date(request.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="capitalize bg-muted/50 px-2 py-0.5 rounded text-xs">
                              {request.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="default" size="sm" className="h-8">
                              <Link to={`/dashboard/requests/${request.id}`}>
                                <Eye className="mr-1 h-4 w-4" /> View Details
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="rounded-full bg-muted p-3">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">No in-progress requests found</p>
                      <Button asChild>
                        <Link to="/dashboard/requests/new">
                          <PlusSquare className="mr-2 h-4 w-4" /> Create New Request
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {/* Similar structure for completed requests */}
          {filteredRequests.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredRequests.map(request => (
                <motion.div
                  key={request.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Same content structure */}
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Link 
                              to={`/dashboard/requests/${request.id}`}
                              className="text-lg font-medium hover:text-wemakit-purple hover:underline transition-colors"
                            >
                              {request.title}
                            </Link>
                            <StatusBadge 
                              variant={getStatusVariant(request.status)}
                              className="md:ml-2 w-fit"
                            >
                              {getStatusLabel(request.status)}
                            </StatusBadge>
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                            <div className="flex items-center">
                              <CalendarDays className="mr-1 h-3.5 w-3.5" />
                              Created: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                            {request.completedAt && (
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3.5 w-3.5" />
                                Completed: {new Date(request.completedAt).toLocaleDateString()}
                              </div>
                            )}
                            <div className="capitalize bg-muted/50 px-2 py-0.5 rounded text-xs">
                              {request.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" className="h-8">
                              <Download className="mr-1 h-4 w-4" /> Download
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="default" size="sm" className="h-8">
                              <Link to={`/dashboard/requests/${request.id}`}>
                                <Eye className="mr-1 h-4 w-4" /> View Details
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="rounded-full bg-muted p-3">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">No completed requests found</p>
                      <Button asChild>
                        <Link to="/dashboard/requests/new">
                          <PlusSquare className="mr-2 h-4 w-4" /> Create New Request
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RequestHistory;
