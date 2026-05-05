import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employmentSchema, EmploymentData } from "./types";

const EMPLOYMENT_STATUSES = [
  { value: "employed", label: "Employed Full-Time" },
  { value: "part-time", label: "Employed Part-Time" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
];

const PAY_FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "semi-monthly", label: "Semi-Monthly" },
  { value: "monthly", label: "Monthly" },
];

interface EmploymentStepProps {
  data: Partial<EmploymentData>;
  onNext: (data: EmploymentData) => void;
  onBack: () => void;
}

const EmploymentStep = ({ data, onNext, onBack }: EmploymentStepProps) => {
  const form = useForm<EmploymentData>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      monthly_income: data.monthly_income || 0,
      pay_frequency: data.pay_frequency || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthly_income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Income ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3000"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pay_frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pay Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAY_FREQUENCIES.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default EmploymentStep;
