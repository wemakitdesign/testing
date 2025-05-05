import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

interface AssignDesignerModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  availableDesigners: { id: string; name: string }[];
}

const AssignDesignerModal: React.FC<AssignDesignerModalProps> = ({ open, onClose, projectId, availableDesigners }) => {
  const [selectedDesigner, setSelectedDesigner] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('inProgress');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedDesigner) {
      toast({ title: 'Error', description: 'Please select a designer.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('tasks').update({
        designer_id: selectedDesigner,
        status: selectedStatus,
      }).eq('id', projectId);

      if (error) throw error;

      toast({ title: 'Success', description: 'Designer assigned successfully.' });
      onClose();
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Designer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Designer</label>
            <Select value={selectedDesigner} onValueChange={setSelectedDesigner}>
              <SelectTrigger>
                <SelectValue placeholder="Choose designer" />
              </SelectTrigger>
              <SelectContent>
                {availableDesigners.map((designer) => (
                  <SelectItem key={designer.id} value={designer.id}>{designer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Select Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="revisions">Revisions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="onHold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDesignerModal;
