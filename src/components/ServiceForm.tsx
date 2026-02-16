import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type { Service } from "@/data/services";

// Define Zod Schema
const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().optional(),
  url: z.string().url("Please enter a valid URL"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  onSubmit: (service: {
    name: string;
    description: string;
    url: string;
    category: string;
  }) => void;
  initialData?: Service;
  trigger?: React.ReactNode;
}

export function ServiceForm({ onSubmit, initialData, trigger }: ServiceFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      url: "",
    },
  });

  // Reset/Populate form when opening or initialData changes
  useEffect(() => {
    if (open) {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description || "",
                category: initialData.category || "",
                url: initialData.url,
            });
        } else {
            form.reset({
                name: "",
                description: "",
                category: "",
                url: "",
            });
        }
    }
  }, [initialData, open, form]);

  const handleSubmit = (data: ServiceFormValues) => {
    if (typeof onSubmit === 'function') {
        onSubmit({
            name: data.name,
            description: data.description || "",
            url: data.url,
            category: data.category || "Uncategorized",
        });
        setOpen(false);
        form.reset();
    } else {
        console.error("onSubmit is not a function", onSubmit);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
            <Button className="gap-2 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700">
            <Plus className="h-4 w-4" /> Add Service
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>{initialData ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
                {initialData ? "Update the service details below." : "Enter the details of the new service below."}
            </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="e.g. My Service"
                    {...form.register("name")}
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
            </div>
            
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    placeholder="Short description"
                    {...form.register("description")}
                />
            </div>
            
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    placeholder="e.g. Work, Personal, Dev"
                    {...form.register("category")}
                />
            </div>
            
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                    id="url"
                    placeholder="https://example.com"
                    {...form.register("url")}
                />
                {form.formState.errors.url && (
                    <p className="text-sm text-red-500">{form.formState.errors.url.message}</p>
                )}
            </div>

            <DialogFooter>
                <Button type="submit">Save Service</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
