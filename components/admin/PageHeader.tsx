import React from "react";
import { Button } from "@/components/ui/Button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  actionIcon?: React.ElementType;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  actionText,
  actionHref,
  onAction,
  actionIcon: ActionIcon,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}

        {actionText && (actionHref || onAction) && (
          <Button
            href={actionHref}
            onClick={onAction}
            variant="primary"
            size="md"
            className="bg-teal-700 hover:bg-teal-800 text-white font-medium shadow-xs"
          >
            {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
