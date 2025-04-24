
import React, { useState } from 'react';
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
  user: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
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
  const [newComment, setNewComment] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [commentAttachments, setCommentAttachments] = useState<File[]>([]);
  const [designFiles, setDesignFiles] = useState<File[]>([]);
  const [logTime, setLogTime] = useState({ hours: '', description: '' });
  
  // Mock data for the task details
  const taskDetails = {
    id: taskId || '1',
    title: 'Website Redesign for Acme Corp',
    description: 'Complete overhaul of the Acme Corp website with a modern design, responsive layout, and improved user experience. The website should reflect the company\'s new branding guidelines and include an updated product catalog.',
    type: 'website',
    status: 'inProgress' as const,
    priority: 'high' as const,
    createdAt: '2023-04-05T11:20:00Z',
    updatedAt: '2023-04-15T16:45:00Z',
    deadline: '2023-05-30T23:59:59Z',
    client: {
      id: '1',
      name: 'John Client',
      company: 'Acme Corporation',
      avatar: 'https://ui-avatars.com/api/?name=John+Client&background=0D8ABC&color=fff',
    },
    assignedTo: {
      id: '2',
      name: 'Jane Designer',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff',
      role: 'designer',
    },
    requirements: `
- Fully responsive design (mobile, tablet, desktop)
- Align with new brand guidelines (colors, typography)
- Improve site navigation and user flow
- Update product catalog with filtering options
- Optimize for speed and performance
- Ensure accessibility compliance
- Include integration with existing CRM
    `,
    attachments: [
      { id: 'a1', name: 'brand_guidelines.pdf', size: 2.4 * 1024 * 1024, type: 'application/pdf' },
      { id: 'a2', name: 'current_website_analysis.docx', size: 1.2 * 1024 * 1024, type: 'application/docx' },
      { id: 'a3', name: 'competitor_examples.zip', size: 5.7 * 1024 * 1024, type: 'application/zip' },
    ],
    timeLogs: [
      { id: 't1', date: '2023-04-10', hours: 2.5, description: 'Initial research and planning' },
      { id: 't2', date: '2023-04-11', hours: 4, description: 'Homepage wireframe design' },
      { id: 't3', date: '2023-04-14', hours: 3.5, description: 'Homepage high-fidelity design' },
    ]
  };
  
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
  
  // Mock comments
  const comments: Comment[] = [
    {
      id: 'c1',
      user: {
        id: '2',
        name: 'Jane Designer',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff',
        role: 'designer',
      },
      content: 'I\'ve uploaded the first draft of the homepage design. Please take a look and let me know your thoughts.',
      timestamp: '2023-04-10T14:25:00Z',
      isInternal: false,
    },
    {
      id: 'c2',
      user: {
        id: '1',
        name: 'John Client',
        avatar: 'https://ui-avatars.com/api/?name=John+Client&background=0D8ABC&color=fff',
        role: 'client',
      },
      content: 'Thanks for the initial design! I like the overall direction, but could we make the call-to-action buttons more prominent? Also, the logo seems a bit small on mobile view.',
      timestamp: '2023-04-11T10:15:00Z',
      isInternal: false,
    },
    {
      id: 'c3',
      user: {
        id: '2',
        name: 'Jane Designer',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff',
        role: 'designer',
      },
      content: 'Making note of the feedback. I\'ll increase the button prominence and logo size on mobile.',
      timestamp: '2023-04-11T11:05:00Z',
      isInternal: true,
    },
    {
      id: 'c4',
      user: {
        id: '3',
        name: 'Alex Admin',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Admin&background=111111&color=fff',
        role: 'admin',
      },
      content: 'Let\'s prioritize these changes. The client has an upcoming marketing campaign that will direct traffic to the site.',
      timestamp: '2023-04-12T09:30:00Z',
      isInternal: true,
    },
    {
      id: 'c5',
      user: {
        id: '2',
        name: 'Jane Designer',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff',
        role: 'designer',
      },
      content: 'I\'ve made those adjustments and uploaded a revised version of the homepage. The CTA buttons are now more prominent with a contrasting color, and I\'ve increased the logo size on mobile views.',
      timestamp: '2023-04-14T16:35:00Z',
      isInternal: false,
      attachments: [
        { name: 'cta_button_comparison.png', size: 540000 }
      ]
    },
  ];
  
  // Total hours logged
  const totalHours = taskDetails.timeLogs.reduce((sum, log) => sum + log.hours, 0);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commentText = isInternalComment ? newInternalNote : newComment;
    
    if (commentText.trim()) {
      // In a real app, you would send this to your API
      console.log('New comment:', commentText, 'isInternal:', isInternalComment, 'with attachments:', commentAttachments);
      
      toast({
        title: isInternalComment ? "Internal note added" : "Comment added",
        description: "Your message has been added to the thread.",
      });
      
      if (isInternalComment) {
        setNewInternalNote('');
      } else {
        setNewComment('');
      }
      setCommentAttachments([]);
    }
  };
  
  const handleDesignUpload = () => {
    if (designFiles.length > 0) {
      // In a real app, you would upload these files to your storage and create records
      console.log('Uploading design files:', designFiles);
      
      toast({
        title: "Designs uploaded",
        description: `${designFiles.length} file(s) uploaded successfully.`,
      });
      
      setDesignFiles([]);
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
            <h1 className="text-2xl font-bold tracking-tight">{taskDetails.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Task #{taskDetails.id}</span>
            <span className="px-2">•</span>
            <span>For {taskDetails.client.company}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getPriorityBadge(taskDetails.priority)}
          <StatusBadge 
            variant={getStatusVariant(taskDetails.status)}
            pulse={taskDetails.status === 'inProgress'}
            className="px-3 py-1"
          >
            {getStatusLabel(taskDetails.status)}
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
                <p className="text-sm text-muted-foreground">{taskDetails.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">
                    {taskDetails.requirements}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Client Attachments</h3>
                <div className="space-y-2">
                  {taskDetails.attachments.map(attachment => (
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
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleDesignUpload}
                    >
                      <Upload className="h-4 w-4 mr-2" /> Upload Files
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Uploaded Design Files</h3>
                
                {existingDesignFiles.length > 0 ? (
                  <div className="space-y-3">
                    {existingDesignFiles.map(file => (
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
              <CardTitle>Communication</CardTitle>
              <CardDescription>Project discussion thread</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Messages</TabsTrigger>
                  <TabsTrigger value="client">Client Messages</TabsTrigger>
                  <TabsTrigger value="internal">
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    Internal Notes
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
                              {comment.isInternal && (
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
                              {new Date(comment.timestamp).toLocaleString()}
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
                </TabsContent>
                
                <TabsContent value="client" className="mt-4 space-y-6">
                  {comments.filter(c => !c.isInternal).map(comment => (
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
                              {new Date(comment.timestamp).toLocaleString()}
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
                </TabsContent>
                
                <TabsContent value="internal" className="mt-4 space-y-6">
                  {comments.filter(c => c.isInternal).map(comment => (
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
                              {new Date(comment.timestamp).toLocaleString()}
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
                        <span className="text-sm font-medium">Internal Note (only visible to team members)</span>
                      </div>
                      
                      <Textarea
                        placeholder="Add an internal note..."
                        className="min-h-[100px]"
                        value={newInternalNote}
                        onChange={(e) => setNewInternalNote(e.target.value)}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={!newInternalNote.trim()}
                          onClick={() => setIsInternalComment(true)}
                        >
                          <Lock className="h-4 w-4 mr-2" /> Add Internal Note
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
                    placeholder="Write a message to the client..."
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
                        onClick={() => document.getElementById('fileInput')?.click()}
                      >
                        <Paperclip className="h-4 w-4 mr-2" /> Attach Files
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
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={!newComment.trim()}
                      onClick={() => setIsInternalComment(false)}
                    >
                      <Send className="h-4 w-4 mr-2" /> Send Message
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
                  variant={getStatusVariant(taskDetails.status)}
                  pulse={taskDetails.status === 'inProgress'}
                >
                  {getStatusLabel(taskDetails.status)}
                </StatusBadge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Priority</span>
                {getPriorityBadge(taskDetails.priority)}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Project Type</span>
                <span className="text-sm capitalize">{taskDetails.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(taskDetails.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{new Date(taskDetails.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm">{new Date(taskDetails.deadline).toLocaleDateString()}</span>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-sm text-muted-foreground">Client</span>
                <div className="flex items-center mt-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={taskDetails.client.avatar} alt={taskDetails.client.name} />
                    <AvatarFallback>{taskDetails.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{taskDetails.client.name}</p>
                    <p className="text-xs text-muted-foreground">{taskDetails.client.company}</p>
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
                
                <div className="space-y-2">
                  {taskDetails.timeLogs.map(log => (
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
