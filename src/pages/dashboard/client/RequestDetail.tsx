import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import { Textarea } from '../../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { FileUploader } from '../../../components/ui/file-uploader';
import { toast } from '../../../hooks/use-toast';
import { 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  MessageSquare, 
  Paperclip, 
  FileType, 
  DownloadCloud, 
  Send, 
  ThumbsUp, 
  AlertCircle, 
  FileEdit 
} from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface DesignFile {
  id: string;
  filename: string;
  filesize: number;
  type: string;
  uploadedAt: string;
  version: number;
}

interface Comment {
  id: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
    company?: string;
  };
  content: string;
  timestamp: string;
  attachments?: { name: string; size: number; }[];
}

interface Activity {
  id: string;
  type: 'status_change' | 'comment' | 'upload' | 'assignment';
  description: string;
  timestamp: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const RequestDetail = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const { user } = useAuth();
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const [designFiles, setDesignFiles] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentAttachments, setCommentAttachments] = useState<File[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch request details
      const { data: req, error: reqError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', requestId)
        .single();
      setRequestDetails(req);
      // Fetch design files (if any)
      setDesignFiles(req?.design_files || []);
      // Fetch comments
      const { data: comm, error: commError } = await supabase
        .from('comments')
        .select('*, client:client_id (id, name, avatar, company)')
        .eq('task_id', requestId)
        .order('created_at', { ascending: false });
      setComments(comm || []);
      // Fetch activity log (optional, or leave empty)
      setActivityLog([]);
      setLoading(false);
    };
    if (requestId) fetchData();
  }, [requestId]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, you would send this to your API
      console.log('New comment:', newComment, 'with attachments:', commentAttachments);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the thread.",
      });
      
      setNewComment('');
      setCommentAttachments([]);
    }
  };
  
  const handleCommentAttachments = (files: File[]) => {
    setCommentAttachments(prev => [...prev, ...files]);
  };
  
  const removeCommentAttachment = (index: number) => {
    setCommentAttachments(prev => prev.filter((_, i) => i !== index));
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
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'status_change': return <AlertCircle className="h-4 w-4" />;
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      case 'upload': return <FileType className="h-4 w-4" />;
      case 'assignment': return <FileEdit className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link 
              to="/dashboard/requests/history"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{requestDetails?.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Request #{requestDetails?.id}</span>
            <span className="px-2">•</span>
            <span>Created {new Date(requestDetails?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusBadge 
            variant={getStatusVariant(requestDetails?.status)}
            pulse={requestDetails?.status === 'inProgress'}
            className="px-3 py-1"
          >
            {getStatusLabel(requestDetails?.status)}
          </StatusBadge>
          
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Request details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Information about your design request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{requestDetails?.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">
                    {requestDetails?.requirements}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Your Attachments</h3>
                <div className="space-y-2">
                  {requestDetails?.attachments.map((attachment: any) => (
                    <div 
                      key={attachment.id}
                      className="flex items-center justify-between border rounded-md p-3 bg-muted/20"
                    >
                      <div className="flex items-center">
                        <FileType className="h-4 w-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(attachment.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Design Files</CardTitle>
              <CardDescription>Latest designs from your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designFiles.length > 0 ? (
                  designFiles.map((file: any) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between border rounded-md p-3 bg-muted/20"
                    >
                      <div className="flex items-center">
                        <FileType className="h-5 w-5 mr-3 text-wemakit-purple" />
                        <div>
                          <p className="text-sm font-medium">{file.filename}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <p className="text-xs text-muted-foreground">
                              {(file.filesize / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <Badge variant="outline" className="text-xs">Version {file.version}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(file.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <DownloadCloud className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-2">No design files have been uploaded yet</p>
                    <p className="text-sm text-muted-foreground">Files will appear here when your designer uploads them</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>Communicate about your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mb-6">
                {comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.client.avatar} alt={comment.client.name} />
                      <AvatarFallback>{comment.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {comment.client.name}
                            <Badge 
                              variant="outline" 
                              className="ml-2 text-[10px] capitalize h-5"
                            >
                              {comment.client.company}
                            </Badge>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-sm">
                        {comment.content}
                      </p>
                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-muted-foreground mb-2 flex items-center">
                            <Paperclip className="h-3 w-3 mr-1" /> 
                            Attachments
                          </p>
                          <div className="space-y-1">
                            {comment.attachments.map((attachment, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between border rounded-md p-2 bg-muted/20"
                              >
                                <div className="flex items-center">
                                  <FileType className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                  <span className="text-xs">{attachment.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <DownloadCloud className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-6" />
              
              <form onSubmit={handleCommentSubmit}>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write a comment..."
                    className="min-h-[100px]"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  
                  {commentAttachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Paperclip className="h-3 w-3 mr-1" /> 
                        Attachments ({commentAttachments.length})
                      </p>
                      <div className="space-y-1">
                        {commentAttachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border rounded-md p-2 bg-muted/20"
                          >
                            <div className="flex items-center">
                              <FileType className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                              <span className="text-xs">
                                {file.name}
                                <span className="text-muted-foreground ml-1">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => removeCommentAttachment(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => document.getElementById('comment-file-input')?.click()}
                      >
                        <Paperclip className="h-4 w-4 mr-2" /> Attach Files
                      </Button>
                      <input
                        id="comment-file-input"
                        type="file"
                        className="sr-only"
                        accept="image/*,.jpg,.jpeg,.png,.gif,.pdf,.zip"
                        multiple
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            handleCommentAttachments(Array.from(e.target.files));
                          }
                        }}
                      />
                    </div>
                    
                    <Button type="submit" disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" /> Send
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Status and activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge 
                  variant={getStatusVariant(requestDetails?.status)}
                  pulse={requestDetails?.status === 'inProgress'}
                >
                  {getStatusLabel(requestDetails?.status)}
                </StatusBadge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Request Type</span>
                <span className="text-sm capitalize">{requestDetails?.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(requestDetails?.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{new Date(requestDetails?.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm">{new Date(requestDetails?.deadline).toLocaleDateString()}</span>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-sm text-muted-foreground">Assigned Designer</span>
                <div className="flex items-center mt-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={requestDetails?.assignedTo.avatar} alt={requestDetails?.assignedTo.name} />
                    <AvatarFallback>{requestDetails?.assignedTo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{requestDetails?.assignedTo.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{requestDetails?.assignedTo.role}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message Designer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-muted"></div>
                
                {activityLog.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3 relative">
                    <div className="rounded-full p-1.5 bg-muted mt-0.5 z-10">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center gap-2">
                        {activity.user && (
                          <div className="flex items-center">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{activity.user.name}</span>
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
