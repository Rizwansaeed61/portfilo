import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid work email address."),
  phone: z.string().min(6, "Please enter a valid phone or WhatsApp number."),
  company: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  country: z.string().min(2, "Please enter your country."),
  requiredService: z.enum([
    "Meta Ads",
    "Google Ads",
    "Shopify Development",
    "WordPress Development",
    "SEO",
    "Landing Page",
    "Lead Generation",
    "Website / Ads Audit",
    "Other"
  ], {
    errorMap: () => ({ message: "Please select a required service." }),
  }),
  monthlyBudget: z.enum([
    "Under $1,500 / month",
    "$1,500 - $3,000 / month",
    "$3,000 - $5,000 / month",
    "$5,000 - $10,000 / month",
    "$10,000+ / month",
    "One-time project"
  ], {
    errorMap: () => ({ message: "Please select your estimated monthly budget." }),
  }),
  mainGoal: z.string().min(3, "Please select or enter your primary business goal."),
  projectDetails: z.string().min(10, "Project details must be at least 10 characters long."),
  preferredContact: z.enum(["Email", "WhatsApp", "Phone Call"], {
    errorMap: () => ({ message: "Please select a preferred contact method." }),
  }),
  consent: z.boolean().refine((val) => val === true, "You must consent to being contacted regarding your inquiry."),
  // Honeypot field for bot detection
  websiteUrlHoneypot: z.string().max(0, "Bot detected.").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
