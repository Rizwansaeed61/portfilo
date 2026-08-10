"use server";

import { contactFormSchema, ContactFormData } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitContactForm(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  try {
    // Extract raw form data
    const rawData = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      website: formData.get("website")?.toString() || "",
      country: formData.get("country")?.toString() || "",
      requiredService: formData.get("requiredService")?.toString() || "",
      monthlyBudget: formData.get("monthlyBudget")?.toString() || "",
      mainGoal: formData.get("mainGoal")?.toString() || "",
      projectDetails: formData.get("projectDetails")?.toString() || "",
      preferredContact: formData.get("preferredContact")?.toString() || "",
      consent: formData.get("consent") === "on" || formData.get("consent") === "true",
      websiteUrlHoneypot: formData.get("websiteUrlHoneypot")?.toString() || "",
    };

    // Honeypot check for bots
    if (rawData.websiteUrlHoneypot && rawData.websiteUrlHoneypot.trim().length > 0) {
      // Silently reject bots without raising alarms
      return {
        success: true,
        message: "Thank you! Your inquiry has been submitted successfully.",
      };
    }

    // Rate Limiting Check (using email or generic IP fallback)
    const rateLimitCheck = checkRateLimit(rawData.email.toLowerCase(), 3, 60 * 1000);
    if (!rateLimitCheck.success) {
      return {
        success: false,
        error: `Too many submissions. Please wait ${rateLimitCheck.resetInSeconds} seconds before trying again.`,
      };
    }

    // Zod Validation
    const validationResult = contactFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      return {
        success: false,
        error: "Please correct the highlighted errors in the form.",
        fieldErrors: formattedErrors as Record<string, string[]>,
      };
    }

    const validData: ContactFormData = validationResult.data;

    // Check if email service environment keys exist
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "Hello@RizwanSaddique.site";

    if (resendApiKey) {
      // Example integration with Resend API when key is present
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Form <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: `New Lead Inquiry: ${validData.fullName} (${validData.requiredService})`,
          html: `
            <h2>New Inquiry Received from Portfolio Website</h2>
            <p><strong>Full Name:</strong> ${validData.fullName}</p>
            <p><strong>Work Email:</strong> ${validData.email}</p>
            <p><strong>Phone / WhatsApp:</strong> ${validData.phone}</p>
            <p><strong>Company:</strong> ${validData.company || "N/A"}</p>
            <p><strong>Website:</strong> ${validData.website || "N/A"}</p>
            <p><strong>Country:</strong> ${validData.country}</p>
            <p><strong>Required Service:</strong> ${validData.requiredService}</p>
            <p><strong>Monthly Budget:</strong> ${validData.monthlyBudget}</p>
            <p><strong>Primary Goal:</strong> ${validData.mainGoal}</p>
            <p><strong>Preferred Contact Method:</strong> ${validData.preferredContact}</p>
            <hr />
            <p><strong>Project Details:</strong></p>
            <p>${validData.projectDetails.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API Email Delivery Error:", errorText);
        return {
          success: false,
          error: "Failed to send notification email. Please try contacting via WhatsApp directly.",
        };
      }
    } else {
      // Development mode log when RESEND_API_KEY is not set
      console.log("=== INCOMING PORTFOLIO INQUIRY (Dev Mode) ===");
      console.log(validData);
      console.log("=============================================");
    }

    return {
      success: true,
      message: "Thank you for reaching out! Rizwan Saeed will review your project details and get back to you within 24 hours.",
    };
  } catch (err: unknown) {
    console.error("Contact Form Server Action Exception:", err);
    return {
      success: false,
      error: "An unexpected error occurred while submitting your message. Please try again or reach out on WhatsApp.",
    };
  }
}
