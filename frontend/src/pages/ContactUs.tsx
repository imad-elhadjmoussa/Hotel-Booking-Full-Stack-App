import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

import { useAppContext } from "../contexts/AppContext";


export default function ContactUs() {
    const { showToast } = useAppContext()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });


    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setLoading(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,

                import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            )
            .then(
                () => {
                    showToast({
                        type: "success",
                        message: "Message sent successfully!"
                    });
                    setFormData({ name: "", email: "", message: "" });
                },
                () => {
                    showToast({
                        type: "error",
                        message: "Failed to send message. Please try again."
                    });
                }
            )
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mt-20 min-h-[calc(100vh-4rem)]">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
                <p className="text-muted-foreground mt-2">
                    Have questions or need help with your booking? Reach out to us.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <Card className="p-6">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg">Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-0">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <span>imadelhadjmoussa20@gamil.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <span>+213 559510507</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <span>Algeria, Algeria</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Form */}
                <Card className="p-6">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg">Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Textarea
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full rounded-xl"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
