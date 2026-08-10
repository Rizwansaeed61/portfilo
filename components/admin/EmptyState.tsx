import React from "react";
import { Button } from "@/components/ui/Button";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-white border border-slate-200 shadow-2xs my-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700 mb-4">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 font-serif">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">{description}</p>

      {actionText && (actionHref || onAction) && (
        <Button
          href={actionHref}
          onClick={onAction}
          variant="primary"
          size="md"
          className="bg-teal-700 hover:bg-teal-800"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
