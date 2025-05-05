import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient';
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
  CheckCircle2, 
  AlertTriangle, 
  Plus,
  Eye,
  Lock,
  Upload,
  Clock1
} from 'lucide-react';

interface DesignFile {
  id: string;
  filename: string;
  filesize: number;
  type: string;
  uploadedAt: string;
  version: number;
  uploadedBy: {
    id: string;
    name: string;
  };
}

interface Comment {
  id: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
    company: string;
  };
  content: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: { name: string; size: number; }[];
}

interface TimeLog {
  id: string;
  date: string;
  hours: number;
  description: string;
}

const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { user } = useAuth();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [commentAttachments, setCommentAttachments] = useState<File[]>([]);
  const [designFiles, setDesignFiles] = useState<File[]>([]);
  const [logTime, setLogTime] = useState({ hours: '', description: '' });
  const [comments, setComments] = useState<Comment[]>([]);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      if (!taskId) {
        setError('Task ID not found');
        setLoading(false);
        return;
      }

      try {
        // Fetch task details with relations
        const { data: taskData, error: taskError } = await supabase
          .from('tasks')
          .select(`
            *,
            client:clients (
              id,
              name,
              company,
              avatar
            ),
            designer:designers (
              id,
              name,
              avatar
            ),
            project:projects (
              id,
              name
            )
          `)
          .eq('id', taskId)
          .single();

        if (taskError) {
          if (taskError.code === 'PGRST116') {
            setError('Task not found');
          } else {
            throw taskError;
          }
          setLoading(false);
          return;
        }

        if (!taskData) {
          setError('Task not found');
          setLoading(false);
          return;
        }

        setTask(taskData);

        // Fetch comments
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select(`
            *,
            client:client_id (
              id,
              name,
              avatar,
              company
            )
          `)
          .eq('task_id', taskId)
          .order('created_at', { ascending: false });

        if (commentsError) throw commentsError;
        setComments(commentsData || []);

      } catch (err: any) {
        console.error('Error fetching task:', err);
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);
  
  // Mock existing design files
  const existingDesignFiles: DesignFile[] = [
    {
      id: 'd1',
      filename: 'homepage_design_v1.png',
      filesize: 3.2 * 1024 * 1024,
      type: 'image/png',
      uploadedAt: '2023-04-10T14:20:00Z',
      version: 1,
      uploadedBy: {
        id: '2',
        name: 'Jane Designer',
      }
    },
    {
      id: 'd2',
      filename: 'product_page_v1.png',
      filesize: 2.8 * 1024 * 1024,
      type: 'image/png',
      uploadedAt: '2023-04-12T09:45:00Z',
      version: 1,
      uploadedBy: {
        id: '2',
        name: 'Jane Designer',
      }
    },
    {
      id: 'd3',
      filename: 'homepage_design_v2.png',
      filesize: 3.4 * 1024 * 1024,
      type: 'image/png',
      uploadedAt: '2023-04-14T16:30:00Z',
      version: 2,
      uploadedBy: {
        id: '2',
        name: 'Jane Designer',
      }
    },
  ];
  
  // Total hours logged
  const totalHours = Array.isArray(task?.timeLogs) ? task.timeLogs.reduce((sum: number, log: TimeLog) => sum + log.hours, 0) : 0;
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentText = isInternalComment ? newInternalNote : newComment;
    
    if (!commentText.trim()) return;

    setUploading(true);
    try {
      let uploadedUrls: string[] = [];

      // Upload attachments if any
      if (commentAttachments.length > 0) {
        for (const file of commentAttachments) {
          const fileName = `${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('task-files')
            .upload(`comments/${taskId}/${fileName}`, file);

          if (error) throw error;

          const publicUrl = supabase.storage
            .from('task-files')
            .getPublicUrl(data.path).data.publicUrl;

          if (publicUrl) uploadedUrls.push(publicUrl);
        }
      }

      // Insert comment
      const { data: comment, error: commentError } = await supabase
        .from('comments')
        .insert([
          {
            task_id: taskId,
            user_id: user.id,
            content: commentText,
            is_internal: isInternalComment,
            attachments: uploadedUrls
          }
        ])
        .select(`
          *,
          client:clients (
            id,
            name,
            avatar,
            company
          )
        `)
        .single();

      if (commentError) throw commentError;

      // Update comments list
      setComments(prev => [comment, ...prev]);

      // Clear form
      if (isInternalComment) {
        setNewInternalNote('');
      } else {
        setNewComment('');
      }
      setCommentAttachments([]);

      toast({
        title: isInternalComment ? "Internal note added" : "Comment added",
        description: "Your message has been added to the thread.",
      });

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDesignUpload = async () => {
    if (designFiles.length === 0) return;

    setUploading(true);
    try {
      let uploadedUrls: string[] = [];

      // Upload design files
      for (const file of designFiles) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('task-files')
          .upload(`designs/${taskId}/${fileName}`, file);

        if (error) throw error;

        const publicUrl = supabase.storage
          .from('task-files')
          .getPublicUrl(data.path).data.publicUrl;

        if (publicUrl) uploadedUrls.push(publicUrl);
      }

      // Update task with new design files
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          design_files: [...(task.design_files || []), ...uploadedUrls]
        })
        .eq('id', taskId);

      if (updateError) throw updateError;

      // Refresh task data
      const { data: updatedTask, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (fetchError) throw fetchError;
      setTask(updatedTask);
      setDesignFiles([]);

      toast({
        title: "Design files uploaded",
        description: `${designFiles.length} files uploaded successfully.`,
      });

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleAddTimeLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (logTime.hours && logTime.description) {
      // In a real app, you would send this to your API
      console.log('Adding time log:', logTime);
      
      toast({
        title: "Time logged",
        description: `${logTime.hours} hours added to the project.`,
      });
      
      setLogTime({ hours: '', description: '' });
    }
  };
  
  const handleCommentAttachments = (files: File[]) => {
    setCommentAttachments(prev => [...prev, ...files]);
  };
  
  const handleDesignFiles = (files: File[]) => {
    setDesignFiles(prev => [...prev, ...files]);
  };
  
  const removeCommentAttachment = (index: number) => {
    setCommentAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeDesignFile = (index: number) => {
    setDesignFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <StatusBadge variant="highPriority">High Priority</StatusBadge>;
      case 'medium':
        return <StatusBadge variant="mediumPriority">Medium Priority</StatusBadge>;
      case 'low':
        return <StatusBadge variant="lowPriority">Low Priority</StatusBadge>;
      default:
        return null;
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
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }
  if (error || !task) {
    return <div className="flex justify-center items-center min-h-[60vh] text-destructive">{error || 'Task not found'}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link 
              to="/dashboard/designer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Task #{task.id}</span>
            <span className="px-2">•</span>
            <span>For {(task.client?.company || '-')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getPriorityBadge(task.priority)}
          <StatusBadge 
            variant={getStatusVariant(task.status)}
            pulse={task.status === 'inProgress'}
            className="px-3 py-1"
          >
            {getStatusLabel(task.status)}
          </StatusBadge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Task details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Project information and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">
                    {task.requirements}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Client Attachments</h3>
                <div className="space-y-2">
                  {task.attachments?.map((attachment: any) => (
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
              <CardDescription>Upload and manage design deliverables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 border border-dashed rounded-lg">
                <FileUploader
                  onFilesSelected={handleDesignFiles}
                  maxSize={50 * 1024 * 1024}
                  accept="image/*,.jpg,.jpeg,.png,.gif,.svg,.pdf,.zip,.psd,.ai"
                  maxFiles={10}
                  className="mb-4"
                  disabled={uploading}
                />
                
                {designFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium">Selected Files ({designFiles.length})</h4>
                    <div className="space-y-2">
                      {designFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border rounded-md p-2 bg-muted/20"
                        >
                          <div className="flex items-center">
                            <FileType className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {file.name}
                              <span className="text-muted-foreground ml-1 text-xs">
                                ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDesignFile(index)}
                            disabled={uploading}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleDesignUpload}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" /> Upload Files
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Uploaded Design Files</h3>
                
                {task.design_files?.length > 0 ? (
                  <div className="space-y-3">
                    {task.design_files.map((file: any) => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between border rounded-md p-3 bg-muted/20"
                      >
                        <div className="flex items-center">
                          <FileType className="h-5 w-5 mr-3 text-wemakit-purple" />
                          <div>
                            <p className="text-sm font-medium">{file.file_name}</p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <p className="text-xs text-muted-foreground">
                                {(file.file_size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                              <Badge variant="outline" className="text-xs">Version {file.version}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(file.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Eye className="h-4 w-4 mr-2" /> Preview
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <DownloadCloud className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No design files uploaded yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Upload files using the form above</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Komunikasi</CardTitle>
              <CardDescription>Thread diskusi proyek</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">Semua Pesan</TabsTrigger>
                  <TabsTrigger value="client">Pesan Klien</TabsTrigger>
                  <TabsTrigger value="internal">
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    Internal Note (visible to team members only)
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4 space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium flex items-center">
                              {comment.user.name}
                              <Badge 
                                variant="outline" 
                                className="ml-2 text-[10px] capitalize h-5"
                              >
                                {comment.user.role}
                              </Badge>
                              {comment.is_internal && (
                                <Badge 
                                  variant="secondary" 
                                  className="ml-2 text-[10px] h-5 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                >
                                  <Lock className="h-3 w-3 mr-1" />
                                  Internal Only
                                </Badge>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">
                          {comment.content}
                        </p>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2 flex items-center">
                              <Paperclip className="h-3 w-3 mr-1" /> 
                              Lampiran
                            </p>
                            <div className="space-y-1">
                              {comment.attachments.map((attachment, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center justify-between border rounded-md p-2 bg-muted/20"
                                >
                                  <div className="flex items-center">
                                    <FileType className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                    <span className="text-xs">{attachment}</span>
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
                </TabsContent>
                
                <TabsContent value="client" className="mt-4 space-y-6">
                  {comments.filter(c => !c.is_internal).map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium flex items-center">
                              {comment.user.name}
                              <Badge 
                                variant="outline" 
                                className="ml-2 text-[10px] capitalize h-5"
                              >
                                {comment.user.role}
                              </Badge>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">
                          {comment.content}
                        </p>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2 flex items-center">
                              <Paperclip className="h-3 w-3 mr-1" /> 
                              Lampiran
                            </p>
                            <div className="space-y-1">
                              {comment.attachments.map((attachment, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center justify-between border rounded-md p-2 bg-muted/20"
                                >
                                  <div className="flex items-center">
                                    <FileType className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                    <span className="text-xs">{attachment}</span>
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
                </TabsContent>
                
                <TabsContent value="internal" className="mt-4 space-y-6">
                  {comments.filter(c => c.is_internal).map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium flex items-center">
                              {comment.user.name}
                              <Badge 
                                variant="outline" 
                                className="ml-2 text-[10px] capitalize h-5"
                              >
                                {comment.user.role}
                              </Badge>
                              <Badge 
                                variant="secondary" 
                                className="ml-2 text-[10px] h-5 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              >
                                <Lock className="h-3 w-3 mr-1" />
                                Internal Only
                              </Badge>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />
                  
                  <form onSubmit={handleCommentSubmit}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-md">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm font-medium">Add an internal note...</span>
                      </div>
                      
                      <Textarea
                        placeholder="Add an internal note..."
                        className="min-h-[100px]"
                        value={newInternalNote}
                        onChange={(e) => setNewInternalNote(e.target.value)}
                        disabled={uploading}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={!newInternalNote.trim() || uploading}
                          onClick={() => setIsInternalComment(true)}
                        >
                          {uploading ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" /> Add Internal Note
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
              
              <Separator className="mb-6" />
              
              <form onSubmit={handleCommentSubmit}>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Tulis pesan untuk klien..."
                    className="min-h-[100px]"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={uploading}
                  />
                  
                  {commentAttachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Paperclip className="h-3 w-3 mr-1" /> 
                        Lampiran ({commentAttachments.length})
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
                              disabled={uploading}
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
                        onClick={() => document.getElementById('fileInput')?.click()}
                        disabled={uploading}
                      >
                        <Paperclip className="h-4 w-4 mr-2" /> Attach File
                      </Button>
                      <input
                        id="fileInput"
                        type="file"
                        className="sr-only"
                        accept="image/*,.jpg,.jpeg,.png,.gif,.pdf,.zip"
                        multiple
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            handleCommentAttachments(Array.from(e.target.files));
                          }
                        }}
                        disabled={uploading}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={!newComment.trim() || uploading}
                      onClick={() => setIsInternalComment(false)}
                    >
                      {uploading ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Status and time tracking */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge 
                  variant={getStatusVariant(task.status)}
                  pulse={task.status === 'inProgress'}
                >
                  {getStatusLabel(task.status)}
                </StatusBadge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Priority</span>
                {getPriorityBadge(task.priority)}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Project Type</span>
                <span className="text-sm capitalize">{task.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{new Date(task.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm">{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-sm text-muted-foreground">Client</span>
                <div className="flex items-center mt-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={task.client?.avatar || undefined} alt={task.client?.name || '-'} />
                    <AvatarFallback>{task.client?.name?.charAt(0) || '-'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{task.client?.name || '-'}</p>
                    <p className="text-xs text-muted-foreground">{(task.client?.company || '-')}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Time Logged</span>
                  <span className="text-sm font-medium">{totalHours} hours</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-wemakit-purple h-2 rounded-full" 
                    style={{ width: `${Math.min((totalHours / 40) * 100, 100)}%` }} 
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  Estimated: 40 hours
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Time Tracking</CardTitle>
              <CardDescription>Log time spent on this task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddTimeLog} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-1">
                    <label htmlFor="hours" className="text-sm font-medium">Hours</label>
                    <input
                      id="hours"
                      type="number"
                      min="0.25"
                      step="0.25"
                      placeholder="0.00"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={logTime.hours}
                      onChange={(e) => setLogTime({ ...logTime, hours: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <input
                      id="description"
                      type="text"
                      placeholder="What did you work on?"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={logTime.description}
                      onChange={(e) => setLogTime({ ...logTime, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Time Entry
                </Button>
              </form>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recent Time Entries</h3>
                
                {Array.isArray(task?.timeLogs) && task.timeLogs.length > 0 ? (
                  <div className="space-y-2">
                    {task.timeLogs.map((log: TimeLog) => (
                      <div 
                        key={log.id}
                        className="flex justify-between p-3 bg-muted/20 rounded-md border"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock1 className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm font-medium">{log.hours} hours</span>
                          </div>
                          <p className="text-xs text-muted-foreground ml-5 mt-1">
                            {log.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center">No time log yet</div>
                )}
                
                <Button variant="outline" className="w-full text-sm" asChild>
                  <Link to="/dashboard/time-tracking">
                    View All Time Entries
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start font-normal"
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                Mark as Complete
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start font-normal"
              >
                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                Request Client Feedback
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start font-normal text-destructive hover:text-destructive"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Request Help
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
