import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { documentsSchema, DocumentsData } from "./types";
import { useCallback, useState } from "react";

interface DocumentsStepProps {
  data: Partial<DocumentsData>;
  onSubmit: (data: DocumentsData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

interface FileUploadProps {
  label: string;
  description: string;
  accept: string;
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  error?: string;
}

const FileUpload = ({ label, description, accept, value, onChange, error }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      {value ? (
        <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {(value.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            error && "border-destructive"
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drag and drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPG, PNG, or WebP (max 10MB)
          </p>
        </div>
      )}
      
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

const DocumentsStep = ({ data, onSubmit, onBack, isSubmitting }: DocumentsStepProps) => {
  const form = useForm<DocumentsData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      id_document: data.id_document,
      income_document: data.income_document,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-foreground mb-2">Document Requirements</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>ID Document:</strong> Driver's license, passport, or state ID</li>
            <li>• <strong>Income Verification:</strong> Recent pay stub, bank statement, or tax return</li>
            <li>• Files must be clear and all information visible</li>
          </ul>
        </div>

        <FormField
          control={form.control}
          name="id_document"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="ID Document"
                  description="Upload a valid government-issued ID (driver's license, passport, or state ID)"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="income_document"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Income Verification"
                  description="Upload a recent pay stub, bank statement, or tax return"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" size="lg" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DocumentsStep;

