import { StarIcon } from '@heroicons/react/24/outline';
import Carousel from './Carousel';

const ReviewCard = ({ review }) => (
  <div className="flex-none w-[300px] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm font-medium text-gray-600">{review.reviewerName}</span>
    </div>
    <p className="text-gray-600 line-clamp-3">{review.comment}</p>
    <p className="text-sm text-gray-500 mt-2">
      {new Date(review.date).toLocaleDateString()}
    </p>
  </div>
);

const ReviewCarousel = ({ reviews }) => (
  <Carousel
    items={reviews}
    renderItem={(review, index) => <ReviewCard key={index} review={review} />}
    itemsPerView={3}
    title="Reseñas de clientes"
  />
);

export default ReviewCarousel;