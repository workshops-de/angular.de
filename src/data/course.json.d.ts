declare module '*/data/course.json' {
  interface Review {
    reviewRating: {
      ratingValue: number;
    };
    reviewBody: string;
    author: {
      name: string;
    };
    datePublished: string;
  }

  interface AggregateRating {
    ratingValue: number;
    reviewCount: number;
  }

  interface CourseData {
    review: Review[];
    aggregateRating: AggregateRating;
  }

  const courseData: CourseData;
  export default courseData;
}

