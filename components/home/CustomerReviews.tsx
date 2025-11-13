import React from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  date?: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 dark:text-white">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">
                    {review.name}
                  </h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
