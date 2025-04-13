import { useState } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
// import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  review: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }),
});

interface ReviewFormProps {
  productId: number | string;
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // if (rating === 0) {
    //   toast({
    //     title: "Rating required",
    //     description: "Please select a rating before submitting your review.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // Here you would normally submit the review to your backend
    console.log("Review submitted:", {
      productId,
      rating,
      review: values.review,
    });

    // toast({
    //   title: "Review submitted",
    //   description: "Thank you for your feedback!",
    // });

    // Reset form
    form.reset();
    setRating(0);

    // Callback for parent component
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  return (
    <div className="border border-border rounded-md p-6 mt-6">
      <h3 className="font-semibold mb-4">Write a Review</h3>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-2xl"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                } cursor-pointer`}
              />
            </button>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with this product..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit Review</Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
