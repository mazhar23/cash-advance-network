import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loanDetailsSchema, LoanDetailsData } from "./types";

const LOAN_TYPES = [
  { value: "payday", label: "Payday Loan" },
  { value: "personal", label: "Personal Loan" },
  { value: "installment", label: "Installment Loan" },
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "emergency", label: "Emergency Loan" },
  { value: "bad-credit", label: "Bad Credit Loan" },
];

const LOAN_PURPOSES = [
  { value: "emergency", label: "Emergency Expenses" },
  { value: "medical", label: "Medical Bills" },
  { value: "car-repair", label: "Car Repair" },
  { value: "home-improvement", label: "Home Improvement" },
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "education", label: "Education" },
  { value: "vacation", label: "Vacation" },
  { value: "major-purchase", label: "Major Purchase" },
  { value: "other", label: "Other" },
];

interface LoanDetailsStepProps {
  data: Partial<LoanDetailsData>;
  onNext: (data: LoanDetailsData) => void;
  onBack: () => void;
}

const LoanDetailsStep = ({ data, onNext, onBack }: LoanDetailsStepProps) => {
  const form = useForm<LoanDetailsData>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: {
      loan_amount: data.loan_amount || 1000,
      loan_purpose: data.loan_purpose || "",
      loan_type: data.loan_type || "",
    },
  });

  const loanAmount = form.watch("loan_amount");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <FormField
          control={form.control}
          name="loan_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LOAN_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loan_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount</FormLabel>
              <div className="text-3xl font-bold text-primary mb-4">
                ${loanAmount.toLocaleString()}
              </div>
              <FormControl>
                <Slider
                  min={100}
                  max={50000}
                  step={100}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Select an amount between $100 and $50,000
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loan_purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Purpose</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LOAN_PURPOSES.map((purpose) => (
                    <SelectItem key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" size="lg">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoanDetailsStep;

