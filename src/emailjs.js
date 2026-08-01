import emailjs from "@emailjs/browser";

// TODO: replace with YOUR EmailJS account's values.
// Get these from emailjs.com after creating an account, an email service, and a template.
export const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
export const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
export const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

emailjs.init(EMAILJS_PUBLIC_KEY);

export default emailjs;