import { ExternalLink, Trash2, Pencil } from "lucide-react";
import { ServiceForm } from "./ServiceForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  onDelete?: () => void;
  onEdit?: (updatedService: Partial<Service>) => void;
}

export function ServiceCard({ service, onDelete, onEdit }: ServiceCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
      
      {/* Actions Container */}
      <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {onEdit && (
            <ServiceForm 
                initialData={service} 
                onSubmit={(data) => onEdit(data)}
                trigger={
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 shadow-sm cursor-pointer"
                        aria-label="Edit service"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                }
            />
        )}

        {/* Delete Button with AlertDialog */}
        {onDelete && (
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="cursor-pointer rounded-full bg-red-500 p-2 text-white shadow-sm hover:bg-red-600"
                aria-label="Delete service"
                >
                <Trash2 className="h-4 w-4" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the{" "}
                    <strong>{service.name}</strong> service from your dashboard.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                    }}
                    className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        )}
      </div>

      {/* Iframe Preview Container */}
      <div className="relative w-full shrink-0 overflow-hidden bg-gray-100 dark:bg-white">
        <div className="relative overflow-hidden pt-[56.25%]">
          <iframe
            src={service.url}
            className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-25 border-none"
            loading="lazy"
            title={`${service.name} preview`}
          />
        </div>
        {/* Overlay to prevent interactions with iframe */}
        <div className="absolute inset-0 z-10 bg-transparent"></div>
      </div>

      <div className="flex grow flex-col p-5">
        <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {service.name}
        </h3>
        <p className="mt-1 mb-4 truncate font-mono text-xs text-slate-500">
          {service.url}
        </p>

        {service.description && (
          <p className="mb-4 line-clamp-2 grow text-sm text-slate-600 dark:text-slate-300">
            {service.description}
          </p>
        )}

        {service.category && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {service.category}
            </span>
          </div>
        )}

        <div className="mt-auto">
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-indigo-600 hover:text-white dark:bg-slate-700 dark:text-white dark:hover:bg-indigo-600"
          >
            Visit
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
