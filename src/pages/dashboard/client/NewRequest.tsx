import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { FileUploader } from '../../../components/ui/file-uploader';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from '../../../hooks/use-toast';

const steps = ["Project Details", "Requirements", "Attachments", "Review"];

const NewRequest: React.FC = () => {
  const { user } = useAuth();
  console.log("Supabase User ID:", user?.id); // ✅ This is the correct UID to use
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requestType: 'website',
    deadline: '',
    requirements: '',
    files: [] as File[],
  });
  const [uploading, setUploading] = useState(false);

  const handleFileSelected = (selectedFiles: File[]) => {
    setFormData(prev => ({ ...prev, files: selectedFiles }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(current => current + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(current => current - 1);
  };

  // ... (other imports remain the same)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
  
    try {
      console.log("========================");
      console.log("🟡 AUTH STATE USER:", user);
      console.log("🟢 Supabase Auth UID:", user.auth_uid);
  
      // ✅ Ambil client berdasarkan auth_uid
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('auth_uid', user.auth_uid) // ✅ FIXED di sini
        .maybeSingle();
  
      console.log("🔵 Client fetch result:", client);
  
      if (clientError || !client) {
        throw new Error('Client not found or unauthorized');
      }
  
      console.log("🔴 Client ID to insert into task:", client.id);
  
      // Upload files jika ada
      let uploadedUrls: string[] = [];
  
      if (formData.files.length > 0) {
        for (const file of formData.files) {
          const fileName = `${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('task-files')
            .upload(`client-uploads/${client.id}/${fileName}`, file);
  
          if (error) throw error;
  
          const publicUrl = supabase.storage
            .from('task-files')
            .getPublicUrl(data.path).data.publicUrl;
  
          if (publicUrl) uploadedUrls.push(publicUrl);
        }
      }
  
      // Insert task ke tabel `tasks`
      const { error: insertError } = await supabase.from('tasks').insert([
        {
          title: formData.title,
          description: formData.description,
          request_type: formData.requestType,
          deadline: formData.deadline || null,
          requirements: formData.requirements,
          files: uploadedUrls,
          client_id: client.id, // ✅ Cocok dengan policy
          status: 'unassigned',
        }
      ]);
  
      if (insertError) throw insertError;
  
      toast({ title: "Success", description: "Your task has been submitted!" });
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };
  
  
  
  console.log("Current Step:", currentStep);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className={`h-8 w-8 flex items-center justify-center rounded-full ${
              index <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>
            <div className="text-xs mt-1">{step}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && 'Fill in the project details.'}
              {currentStep === 1 && 'Specify project requirements.'}
              {currentStep === 2 && 'Upload any relevant files.'}
              {currentStep === 3 && 'Review all information before submitting.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
          {currentStep === 0 && (
  <>
    <Label>Project Title</Label>
    <Input 
      value={formData.title} 
      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} 
      required 
    />

    <Label>Project Description</Label>
    <Textarea 
      value={formData.description} 
      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} 
    />

    <Label>Category / Request Type</Label>
    <select
      className="w-full border rounded-md p-2 text-sm text-foreground bg-background"
      value={formData.requestType}
      onChange={(e) => setFormData(prev => ({ ...prev, requestType: e.target.value }))}
      required
    >
      <option value="website">Website</option>
      <option value="logo">Logo</option>
      <option value="branding">Branding</option>
      <option value="social-media">Social Media</option>
      <option value="packaging">Packaging</option>
      <option value="others">Others</option>
    </select>
  </>
)}


            {currentStep === 1 && (
              <>
                <Label>Project Requirements</Label>
                <Textarea value={formData.requirements} onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))} />
              </>
            )}

            {currentStep === 2 && (
              <>
                <Label>Attachments</Label>
                <FileUploader 
                  onFilesSelected={handleFileSelected} 
                  multiple
                  accept="image/*,.pdf,.zip"
                />
              </>
            )}

            {currentStep === 3 && (
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Requirements:</strong> {formData.requirements}</p>
                <p><strong>Attachments:</strong> {formData.files.map(file => file.name).join(', ') || 'None'}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" disabled={uploading}>
                Submit <Check className="h-4 w-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewRequest;