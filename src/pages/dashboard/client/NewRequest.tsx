
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { FileUploader } from '../../../components/ui/file-uploader';
import { StatusBadge } from '../../../components/ui/status-badge';
import { toast } from '../../../hooks/use-toast';
import { ChevronLeft, ChevronRight, FileType, Check, MessageSquarePlus } from 'lucide-react';

const steps = [
  { id: 'details', name: 'Project Details' },
  { id: 'requirements', name: 'Requirements' },
  { id: 'attachments', name: 'Attachments' },
  { id: 'review', name: 'Review' },
];

const requestTypeDescriptions: Record<string, string> = {
  website: "UI/UX untuk website, landing page, atau web apps.",
  logo: "Pembuatan logo professional sesuai brand.",
  branding: "Paket branding lengkap (logo, warna, guidelines).",
  print: "Desain materi cetak seperti brosur, poster, atau banner.",
  other: "Proyek desain custom di luar kategori lain.",
};

const NewRequest = () => {
  const { user } = useAuth();
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

  const firstName = user?.name?.split(" ")[0] || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (files: File[]) => {
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep === 0 && !formData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a project title",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleMessageDesigner = () => {
    window.location.href = '/dashboard/messages';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi submit
    console.log('Submitting request:', formData);

    toast({
      title: "Request submitted!",
      description: "Tim desain kami akan segera memproses permintaan Anda.",
    });

    navigate('/dashboard');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Intro & Message Designer CTA */}
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl bg-gradient-to-br from-wemakit-purple/80 via-wemakit-purple/30 to-blue-100/70 shadow p-6 mb-4 ring-2 ring-wemakit-purple/15">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-wemakit-purple">
            Hi, {firstName} 👋
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Siap memulai project baru? Ceritakan kebutuhan desainmu pada tim <b>WeMakIt</b> di form berikut, bisa juga konsultasi langsung ke designer kami!
          </p>
        </div>
        <Button
          onClick={handleMessageDesigner}
          variant="outline"
          className="gap-2 border-wemakit-purple text-wemakit-purple bg-white hover:bg-wemakit-purple/5 shadow-md transition"
          title="Tanya langsung desain atau progress ke designer"
        >
          <MessageSquarePlus className="text-wemakit-purple" />
          <span className="font-medium">Message Designer</span>
        </Button>
      </div>
      
      {/* Stepper dengan badge & progress */}
      <div className="flex justify-between relative mb-8">
        <div className="absolute top-1/2 h-0.5 w-full bg-gradient-to-r from-wemakit-purple/30 to-wemakit-purple/10 -z-10 -translate-y-1/2"></div>
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center flex-1 min-w-0">
            <div 
              className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors text-base font-bold shadow-sm ring-2 ring-offset-2
                ${
                  index < currentStep
                    ? 'bg-wemakit-purple text-white border-wemakit-purple'
                    : index === currentStep
                    ? 'bg-white border-wemakit-purple text-wemakit-purple shadow-md'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`block mt-2 text-xs font-semibold max-w-[72px] text-center transition-all
                ${
                  index === currentStep
                    ? 'text-wemakit-purple drop-shadow'
                    : index < currentStep
                    ? 'text-wemakit-purple/80'
                    : 'text-gray-400'
                }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8 shadow-xl border border-wemakit-purple/25">
          {currentStep === 0 && (
            <>
              <CardHeader>
                <CardTitle>
                  <span className="inline-block mr-2">📝</span> Project Details
                </CardTitle>
                <CardDescription>
                  <span className="font-medium text-wemakit-purple">Beri nama dan deskripsikan idemu</span>, semakin detail judul & deskripsi akan mempermudah designer memahami brief Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Project Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Contoh: Website Produk, Logo Baru"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Ceritakan gambaran umum proyek desain Anda..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestType">Request Type</Label>
                    <select
                      id="requestType"
                      name="requestType"
                      className="flex h-10 w-full rounded-lg border border-input bg-violet-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wemakit-purple focus-visible:ring-offset-2"
                      value={formData.requestType}
                      onChange={handleInputChange}
                    >
                      <option value="website">Website Design</option>
                      <option value="logo">Logo Design</option>
                      <option value="branding">Branding Package</option>
                      <option value="print">Print Materials</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="text-xs text-wemakit-purple/80 mt-1 italic bg-gradient-to-l from-transparent to-wemakit-purple/10 rounded px-2 py-1">
                      {requestTypeDescriptions[formData.requestType]}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Preferred Deadline</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      className="rounded-lg border-violet-200"
                      value={formData.deadline}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Opsional. Jika urgent, silakan konsultasi ke designer langsung!</p>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>
                  <span className="inline-block mr-2">🔎</span> Project Requirements
                </CardTitle>
                <CardDescription>
                  <span className="font-medium text-wemakit-purple">Detilkan kebutuhan & preferensi desain</span> sejelas mungkin agar hasil lebih maksimal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements & Specifications</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="List kebutuhan, referensi, atau style yang diinginkan..."
                    rows={8}
                    value={formData.requirements}
                    onChange={handleInputChange}
                  />
                  <div className="text-xs text-blue-900/70 bg-blue-200/30 rounded px-2 py-1">
                    Tips: Bisa tuliskan warna favorit, font yang diinginkan, link inspirasi, dsb.
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>
                  <span className="inline-block mr-2">📎</span> Attachments & References
                </CardTitle>
                <CardDescription>
                  Upload file referensi, contoh desain favorit, atau dokumen pendukung lain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFilesSelected={handleFileUpload}
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB
                  accept="image/*,.jpg,.jpeg,.png,.gif,.pdf,.zip"
                />
                {formData.files.length > 0 && (
                  <div className="mt-5">
                    <Label>Uploaded Files ({formData.files.length})</Label>
                    <div className="mt-1 space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-md p-2 bg-wemakit-purple/5 border-wemakit-purple/10">
                          <div className="flex items-center">
                            <FileType className="h-4 w-4 mr-2 text-wemakit-purple/80" />
                            <span className="text-sm font-medium">{file.name} <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span></span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-7 text-xs text-destructive/80 hover:bg-destructive/10"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>
                  <span className="inline-block mr-2">✅</span> Review Your Request
                </CardTitle>
                <CardDescription>
                  Pastikan semua data berikut benar sebelum mengirim permintaan ke tim desain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Project Title:</span>
                    <span>{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Request Type:</span>
                    <span className="capitalize">{formData.requestType}</span>
                  </div>
                  {formData.deadline && (
                    <div className="flex justify-between">
                      <span className="font-medium">Deadline:</span>
                      <span>{new Date(formData.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Description:</span>
                  <p className="text-sm bg-muted/30 p-3 rounded-md">
                    {formData.description || "Tidak ada deskripsi"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Requirements:</span>
                  <p className="text-sm bg-muted/30 p-3 rounded-md whitespace-pre-wrap">
                    {formData.requirements || "Tidak ada requirements"}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium">Attachments ({formData.files.length}):</span>
                  {formData.files.length > 0 ? (
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {formData.files.map((file, index) => (
                        <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm mt-1 text-muted-foreground">No files attached</p>
                  )}
                </div>
                
                <div className="pt-4 border-t">
                  <StatusBadge variant="info" className="w-full justify-center py-2">
                    Request Anda akan kami review, Anda akan dihubungi setelah designer ditugaskan. <br />
                    <span className="italic">Jika ingin mempercepat/melacak progres, klik Message Designer di atas.</span>
                  </StatusBadge>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">
                Submit Request <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewRequest;
