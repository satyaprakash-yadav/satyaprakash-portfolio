import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export const Testimonials = () => {
    const testimonials = [
        {
            quote:
                "I bring over 2.8 years of Python experience, including 18 months in industry, with 1 year in Django, 1 year in FastAPI, and strong skills in DRF, middleware, and database management.",
            name: "Ashish Soni",
            liveUrl: "https://portfolio-app-lemon-delta.vercel.app/",
            githubUrl: "https://github.com/ashish-102",
            linkedinUrl: "https://www.linkedin.com/in/ashish102",
            designation: "Software Developer at Facts Online private ltd",
            src: "/ashish.jpg",
        },
        {
            quote:
                "It’s not about breaking in; it’s about understanding how it was built.",
            name: "Rahul Thakur",
            liveUrl: "https://sarsolutionz.netlify.app/",
            githubUrl: "https://github.com/Rahul-Thakur7",
            linkedinUrl: "https://www.linkedin.com/in/rahul-thakur7/",
            designation: "Security Analyst at QRC Assurance And Solutions",
            src: "/rahul.jpg",
        },
        {
            quote:
                "Product Developer with over 2 years of experience in full-stack development. Proficient in React Native for cross-platform mobile app development.",
            name: "Tejas Satpute",
            liveUrl: "#",
            githubUrl: "#",
            linkedinUrl: "https://www.linkedin.com/in/tejas-satpute-92489723a/",
            designation: "Product Developer at MEETCS Pvt. Ltd.",
            src: "/tejas.jpeg",
        },
    ];

    return (
        <section className="mt-32">
            <span className="block text-center text-sm text-muted-foreground font-medium">
                Meet Our Team
            </span>
            <h2 className="text-center text-2xl font-semibold pt-1">
                The People Behind Our Success
            </h2>
            <AnimatedTestimonials testimonials={testimonials} />
        </section>
    );
}
