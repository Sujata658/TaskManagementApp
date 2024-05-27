import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "react-router-dom"
import { z } from "zod"


const formSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  })
})

const CreateTaskForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <>
    <Form {...form}>

      <FormField control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>

    </Form>
    
    </>
  )
}

export default CreateTaskForm