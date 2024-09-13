import React from "react";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strSource: string;
  strYoutube: string;
  strTags: string;
}

interface MealDetailsProps {
  meal: Meal | null;
  showSelectedMeal: boolean;
  setShowSelectedMeal: (state: boolean) => void;
}

const MealDetailsSidebar: React.FC<MealDetailsProps> = ({
  meal,
  showSelectedMeal,
  setShowSelectedMeal,
}) => {
  if (!meal || showSelectedMeal == false) return null;

  const tags = meal.strTags ? meal.strTags.split(",") : [];

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    } else {
      return null;
    }
  };

  const youtubeEmbedUrl = getYoutubeEmbedUrl(meal.strYoutube);

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 lg:w-1/4 h-full bg-white shadow-lg p-6 overflow-y-auto">
      <button
        onClick={() => setShowSelectedMeal(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">{meal.strMeal}</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full mb-6 rounded-lg shadow-sm"
      />

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          <strong>Category:</strong> {meal.strCategory}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Area:</strong> {meal.strArea}
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mb-6">
          <strong className="text-lg text-gray-800">Tags:</strong>
          <div className="flex flex-wrap mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {meal.strSource && (
        <div className="mb-6">
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-lg"
          >
            View Full Recipe
          </a>
        </div>
      )}

      {youtubeEmbedUrl && (
        <div className="mb-6">
          <strong className="text-lg text-gray-800">Video Tutorial:</strong>
          <div className="mt-4">
            <iframe
              className="w-full h-64 rounded-lg shadow-sm"
              src={youtubeEmbedUrl}
              frameBorder="0"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        </div>
      )}

      <div className="mb-6 border p-3 rounded-lg">
        <strong className="text-lg text-gray-800">Instructions:</strong>
        <p className="mt-2 text-gray-700 whitespace-pre-line leading-relaxed">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default MealDetailsSidebar;
