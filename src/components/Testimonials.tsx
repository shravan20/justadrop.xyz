
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Just A Drop made it so easy for our organization to find volunteers. We posted our needs and had responses within hours!",
    author: "Sarah Johnson",
    role: "Program Director, Youth Empowerment Alliance",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    quote: "I've always wanted to volunteer but didn't know where to start. This platform helped me find opportunities that match my skills and availability.",
    author: "Michael Chen",
    role: "Software Developer & Volunteer",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "The response to our donation drive was incredible. We met our goals in half the time we expected thanks to the visibility Just A Drop provided.",
    author: "Amara Okafor",
    role: "Fundraising Manager, Clean Water Initiative",
    image: "https://i.pravatar.cc/150?img=25"
  },
  {
    quote: "As someone with limited time, I appreciate being able to help remotely. Found a perfect opportunity to mentor youth online that fits my schedule.",
    author: "David Rivera",
    role: "Teacher & Weekend Volunteer",
    image: "https://i.pravatar.cc/150?img=53"
  },
  {
    quote: "Our animal shelter has seen a 40% increase in volunteer applications since joining. The platform is intuitive and the support team is amazing!",
    author: "Emma Wilson",
    role: "Director, Paws & Hearts Rescue",
    image: "https://i.pravatar.cc/150?img=23"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from organizations and volunteers who have connected through our platform.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-1">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col p-6">
                        <div className="mb-4 text-4xl text-drop-500">"</div>
                        <p className="text-foreground mb-6 flex-grow">
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <p className="font-semibold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
