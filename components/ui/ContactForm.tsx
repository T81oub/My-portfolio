"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend, FiLoader, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
}

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formState, setFormState] = useState<FormState>({ status: "idle", message: null });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading", message: null });

    if (!WEB3FORMS_ACCESS_KEY) {
      setFormState({ status: "error", message: "Form submission is currently unavailable. Missing configuration." });
      return;
    }
    if (!name || !email || !subject || !message) {
      setFormState({ status: "error", message: "Please fill in all required fields." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormState({ status: "error", message: "Please enter a valid email address." });
      return;
    }
    if (honeypot) {
      setFormState({ status: "error", message: "Spam detected." });
      return;
    }

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", `New Contact from Portfolio: ${subject}`);
    formData.append("message", message);
    formData.append("botcheck", honeypot);
    formData.append("from_name", "My Portfolio Website");
    formData.append("replyto", email);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();

      if (data.success) {
        setFormState({ status: "success", message: data.message || "Your message has been sent successfully!" });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setHoneypot("");
      } else {
        console.error("Web3Forms submission error:", data);
        setFormState({ status: "error", message: data.message || "An error occurred. Please try again." });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setFormState({ status: "error", message: "Could not connect to the server. Please try again later." });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      noValidate
    >
      {!WEB3FORMS_ACCESS_KEY && (
        <div className="alert alert-warning d-flex align-items-center gap-2 py-2 small" role="alert">
          <FiAlertTriangle className="flex-shrink-0" />
          The contact form is not configured yet. Add a Web3Forms access key to enable it.
        </div>
      )}

      <div className="row g-3">
        <motion.div className="col-sm-6" variants={fieldVariants} custom={0}>
          <label htmlFor="name" className="form-label small text-muted-soft">
            Full name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control form-control-glass"
            placeholder="Your name"
          />
        </motion.div>

        <motion.div className="col-sm-6" variants={fieldVariants} custom={1}>
          <label htmlFor="email" className="form-label small text-muted-soft">
            Email address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-glass"
            placeholder="you@example.com"
          />
        </motion.div>

        <motion.div className="col-12" variants={fieldVariants} custom={2}>
          <label htmlFor="subject" className="form-label small text-muted-soft">
            Subject <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="form-control form-control-glass"
            placeholder="Let's work together"
          />
        </motion.div>

        <motion.div className="col-12" variants={fieldVariants} custom={3}>
          <label htmlFor="message" className="form-label small text-muted-soft">
            Message <span className="text-danger">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control form-control-glass"
            placeholder="Your message..."
          />
        </motion.div>

        {/* Honeypot field, hidden from humans */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="honeypot">Do not fill this if you are human</label>
          <input
            type="text"
            id="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <motion.div className="col-12" variants={fieldVariants} custom={4}>
          <button
            type="submit"
            disabled={formState.status === "loading" || !WEB3FORMS_ACCESS_KEY}
            className="btn btn-gradient w-100 py-2 rounded-3 d-inline-flex align-items-center justify-content-center gap-2"
          >
            {formState.status === "loading" ? <FiLoader className="spinner-border border-0" /> : <FiSend />}
            Send message
          </button>
        </motion.div>
      </div>

      {formState.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`alert mt-3 mb-0 d-flex align-items-center gap-2 small ${
            formState.status === "success" ? "alert-success" : "alert-danger"
          }`}
          role="status"
        >
          {formState.status === "success" ? <FiCheckCircle /> : <FiAlertTriangle />}
          {formState.message}
        </motion.div>
      )}
    </motion.form>
  );
}
