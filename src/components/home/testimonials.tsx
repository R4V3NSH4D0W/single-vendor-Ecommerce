import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Fashion Enthusiast",
    quote:
      "The quality of these products exceeded my expectations. The attention to detail and superior materials make them stand out from other brands I've tried.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
  },
  {
    name: "Sam Williams",
    role: "Design Professional",
    quote:
      "I've been a loyal customer for years. The minimalist aesthetic and durability of their products make them worth every penny.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
  },
  {
    name: "Taylor Chen",
    role: "Lifestyle Blogger",
    quote:
      "Their commitment to sustainability without compromising on style is why I keep coming back. These pieces seamlessly integrate into any wardrobe or home.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-lg mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground">
            Don&apos;t just take our word for it. See what our customers have
            experienced.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg border border-border flex flex-col"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={40}
                  width={40}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground italic flex-grow">
                &quot;{testimonial.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
