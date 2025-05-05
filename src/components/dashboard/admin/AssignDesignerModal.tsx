import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { toast } from '../../../hooks/use-toast';

interface Designer {
  id: string;
  name: string;
  capacity: number;
  active_projects: number;
}

interface AssignDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  onSuccess: () => void;
}

const AssignDesignerModal: React.FC<AssignDesignerModalProps> = ({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  onSuccess
}) => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [selectedDesignerId, setSelectedDesignerId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDesigners();
    }
  }, [isOpen]);

  const fetchDesigners = async () => {
    try {
      const { data, error } = await supabase
        .from('designers')
        .select('*')
        .eq('active', true)
        .order('active_projects', { ascending: true });

      if (error) throw error;
      setDesigners(data || []);
    } catch (error) {
      console.error('Error fetching designers:', error);
      toast({
        title: "Error",
        description: "Failed to load designers",
        variant: "destructive"
      });
    }
  };

  const handleAssign = async () => {
    if (!selectedDesignerId) {
      toast({
        title: "Error",
        description: "Please select a designer",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Update task with designer assignment
      const { error: taskError } = await supabase
        .from('tasks')
        .update({
          designer_id: selectedDesignerId,
          status: 'pending'
        })
        .eq('id', taskId);

      if (taskError) {
        toast({
          title: "Error",
          description: taskError.message || "Failed to assign designer",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Update designer's active projects count
      const { error: designerError } = await supabase.rpc(
        'increment_designer_active_projects',
        { designer_id: selectedDesignerId }
      );

      if (designerError) {
        toast({
          title: "Error",
          description: designerError.message || "Failed to update designer's active projects",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success",
        description: "Designer assigned successfully"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign designer",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Designer to Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Task</Label>
            <p className="text-sm text-muted-foreground">{taskTitle}</p>
          </div>

          <div className="space-y-2">
            <Label>Select Designer</Label>
            <Select
              value={selectedDesignerId}
              onValueChange={setSelectedDesignerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a designer" />
              </SelectTrigger>
              <SelectContent>
                {designers.map((designer) => (
                  <SelectItem key={designer.id} value={designer.id}>
                    {designer.name} (Capacity: {designer.capacity}%, Active Projects: {designer.active_projects})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign Designer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDesignerModal; 