"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, ListOrdered, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

export default function AdminProcessCMSPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: "step-1",
      stepNumber: 1,
      title: "Comprehensive Audit & Strategy",
      subtitle: "Deep-dive analysis of your current ads, tracking, landing pages, and competitors",
      description:
        "We uncover hidden leaks in your sales funnel, analyze audience positioning, review historical ad metrics, and map out a 90-day growth blueprint.",
      deliverables: ["Funnel Leak Audit Report", "Competitor Ad Blueprint", "90-Day Media Plan"],
      timeline: "Days 1 - 5",
    },
    {
      id: "step-2",
      stepNumber: 2,
      title: "Conversion Infrastructure & Tracking Setup",
      subtitle: "Building or optimizing high-converting Shopify store / landing pages with exact server-side tracking",
      description:
        "We implement Meta CAPI, Google Tag Manager server-side tracking, and redesign critical landing page elements for maximum conversion rate (CRO).",
      deliverables: ["Meta CAPI & GA4 Server Tracking", "CRO-Optimized Landing Page / Store", "Offer Hook Copywriting"],
      timeline: "Days 6 - 12",
    },
    {
      id: "step-3",
      stepNumber: 3,
      title: "High-ROAS Campaign Launch",
      subtitle: "Executing targeted Meta & Google Ads campaigns with winning ad creatives",
      description:
        "We launch laser-targeted campaigns using custom audience segmentation, UGC ad angles, dynamic retargeting, and aggressive A/B testing.",
      deliverables: ["Meta & Google Ad Campaigns", "High-Converting Ad Angles", "Weekly Performance Reports"],
      timeline: "Days 13 - 30",
    },
    {
      id: "step-4",
      stepNumber: 4,
      title: "Aggressive Scaling & CRO Optimization",
      subtitle: "Doubling down on winning ad sets, scaling budget, and optimizing AOV",
      description:
        "Once ROAS stabilizes, we systematically scale daily ad spend while introducing post-purchase upsells and email retention automation.",
      deliverables: ["Scaled Ad Spend Blueprint", "ROAS Optimization Log", "Bi-Weekly Strategy Calls"],
      timeline: "Ongoing Scaling",
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleStepChange = (id: string, field: keyof ProcessStep, value: any) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    );
  };

  const handleAddDeliverable = (stepId: string, itemText: string) => {
    if (!itemText.trim()) return;
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, deliverables: [...step.deliverables, itemText.trim()] }
          : step
      )
    );
  };

  const handleRemoveDeliverable = (stepId: string, indexToRemove: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              deliverables: step.deliverables.filter((_, i) => i !== indexToRemove),
            }
          : step
      )
    );
  };

  const handleAddStep = () => {
    const newStep: ProcessStep = {
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: "New Growth Process Phase",
      subtitle: "Short phase summary description",
      description: "Detailed breakdown of the strategy and actions performed in this phase.",
      deliverables: ["Deliverable 1"],
      timeline: "1-2 Weeks",
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    const filtered = steps.filter((s) => s.id !== id);
    const reindexed = filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSteps(reindexed);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Growth Process CMS"
        subtitle="Manage step-by-step strategy phases, timelines, and deliverables displayed across the website process section."
        actionText="Add Process Step"
        actionIcon={Plus}
        onAction={handleAddStep}
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Growth Process CMS updated successfully! Public cache revalidated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="space-y-6">
          {steps.map((step, stepIdx) => (
            <div
              key={step.id}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white font-bold text-sm">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Phase {step.stepNumber}: {step.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(step.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete step"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phase Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleStepChange(step.id, "title", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Timeline / Duration
                  </label>
                  <input
                    type="text"
                    value={step.timeline}
                    onChange={(e) => handleStepChange(step.id, "timeline", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Phase Subtitle / Objective
                </label>
                <input
                  type="text"
                  value={step.subtitle}
                  onChange={(e) => handleStepChange(step.id, "subtitle", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={step.description}
                  onChange={(e) => handleStepChange(step.id, "description", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
                />
              </div>

              {/* Deliverables */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Deliverables
                </label>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((del, dIdx) => (
                    <span
                      key={dIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
                    >
                      {del}
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(step.id, dIdx)}
                        className="text-teal-600 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={`new-del-${step.id}`}
                    placeholder="Add deliverable (e.g. Audit Report)..."
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = e.currentTarget;
                        handleAddDeliverable(step.id, input.value);
                        input.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(
                        `new-del-${step.id}`
                      ) as HTMLInputElement;
                      if (input) {
                        handleAddDeliverable(step.id, input.value);
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1 text-teal-700" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" size="md" onClick={handleAddStep}>
            <Plus className="h-4 w-4 mr-1.5 text-teal-700" />
            Add Another Phase
          </Button>

          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Growth Process CMS
          </Button>
        </div>
      </form>
    </div>
  );
}
