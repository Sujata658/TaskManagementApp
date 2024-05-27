import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import AuthFormField from "../AuthFormField";
import { Button } from "@/components/ui/button";

interface AuthFormProps<T extends ZodTypeAny> {
  schema: T;
  onSubmit: (values: z.infer<T>) => void;
  fields: {
    name: FieldPath<z.infer<T>>;
    label: string;
    placeholder: string;
    inputType?: string;
    description?: string;
  }[];
}

const AuthForm = <T extends ZodTypeAny>({ schema, onSubmit, fields }: AuthFormProps<T>) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as z.infer<T>),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <AuthFormField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            inputType={field.inputType}
            description={field.description}
            formControl={form.control}
          />
        ))}
        <div className="flex justify-center items-center">

        <Button type="submit" className="bg-primary rounded-lg hover:bg-red-500 text-lg">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
