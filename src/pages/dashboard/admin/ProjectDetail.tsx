import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { DownloadCloud, User, Calendar, Flag, ClipboardList, Clock, Paperclip } from 'lucide-react';
import AssignDesignerModal from '@/components/dashboard/admin/AssignDesignerModal';
import { toast } from '@/hooks/use-toast';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', projectId)
        .single();
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
      setTask(data);
      setLoading(false);
    };
    fetchTask();
  }, [projectId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }
  if (!task) {
    return <div className="flex justify-center items-center min-h-[60vh] text-destructive">Task not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-wemakit-purple" />
            {task.title}
          </CardTitle>
          <CardDescription>Project details and management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <StatusBadge variant={task.status === 'unassigned' ? 'warning' : task.status}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</StatusBadge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Flag className="h-4 w-4" /> {task.priority}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-4 w-4" /> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><User className="h-4 w-4" /> Client: {task.client_id}</span>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold mb-1">Description</h4>
            <p className="text-muted-foreground whitespace-pre-line">{task.description}</p>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold mb-1">Requirements</h4>
            <p className="text-muted-foreground whitespace-pre-line">{task.requirements}</p>
          </div>
          {task.files && task.files.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Paperclip className="h-4 w-4" /> Attachments</h4>
              <div className="space-y-2">
                {task.files.map((url: string, idx: number) => (
                  <div key={idx} className="flex items-center justify-between border rounded-md p-2 bg-muted/20">
                    <span className="truncate text-sm">{url.split('/').pop()}</span>
                    <Button asChild variant="ghost" size="sm">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <DownloadCloud className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {task.status === 'unassigned' && (
            <div className="mt-6">
              <Button size="lg" className="w-full" onClick={() => setShowAssignModal(true)}>
                Assign Designer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <AssignDesignerModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        taskId={task.id}
        taskTitle={task.title}
        onSuccess={() => {
          setShowAssignModal(false);
          toast({ title: 'Designer assigned!', description: 'Task updated successfully.' });
          navigate(0); // reload page
        }}
      />
    </div>
  );
};

export default ProjectDetail; 