import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, MessageSquare, Send, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_0tz9fru";
const EMAILJS_TEMPLATE_ID = "template_b90a212";
const EMAILJS_PUBLIC_KEY = "KRsxH4cZ_5RJ2EMJB";

// Form validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit phone number" })
    .optional()
    .or(z.literal("")),
  subject: z.string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const HelpCenter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Not provided",
        subject: data.subject,
        message: data.message,
        to_email: "sanjayvansu1973@gmail.com"
      };
      
      // Send email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      if (response.status === 200) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        reset();
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How fast is your delivery?",
      answer: "We guarantee delivery within 10 minutes of order confirmation for all areas we serve."
    },
    {
      question: "What are your service hours?",
      answer: "We operate 7 days a week from 6:00 AM to 9:00 PM."
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to Kamla Nagar, Balkeshwar, Adarsh Nagar, and Karmyogi."
    },
    {
      question: "Are your products really chemical-free?",
      answer: "Yes! All our products are 100% homemade with natural ingredients. No preservatives or chemicals."
    },
    {
      question: "What is the minimum order value?",
      answer: "There's no minimum order value. You can order as little as one cup of tea!"
    },
    {
      question: "Do you charge for delivery?",
      answer: "No, delivery is absolutely FREE for all orders."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help Center - Dream Snack | Customer Support & FAQs</title>
        <meta name="description" content="Get help with your Dream Snack orders. Find answers to common questions about delivery, payments, menu items, and account management. 24/7 customer support available." />
        <meta name="keywords" content="help center, customer support, FAQ, delivery help, payment issues, order tracking, food delivery support" />
        <link rel="canonical" href="https://dreamsnack.com/help" />
        <meta property="og:title" content="Help Center - Dream Snack | Customer Support" />
        <meta property="og:description" content="Get help with your Dream Snack orders. 24/7 customer support available." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Send us your questions, feedback, or concerns and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  {...register("subject")}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information & FAQs */}
          <div className="space-y-6">
            {/* Service Hours */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Service Hours</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">We're Open</p>
                    <p className="text-muted-foreground">6:00 AM - 9:00 PM (7 Days)</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* FAQs */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;