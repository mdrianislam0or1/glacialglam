import  { useState, useEffect } from "react";

const Slider = () => {
  const slides = [
    {
      id: 1,
      imageUrl: "/1.png",
      heading: "Heading 1",
      description: "Description 1",
    },
    {
      id: 2,
      imageUrl: "/2.png",
      heading: "Heading 2",
      description: "Description 2",
    },
    {
      id: 3,
      imageUrl: "/1.png",
      heading: "Heading 3",
      description: "Description 3",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="w-full flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex items-center justify-center transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0 hidden"
              } ${index === currentSlide ? "" : "absolute top-0 left-0"}`}
            >
              <div className="text-center">
                <img src={slide.imageUrl} alt={`Slide ${slide.id}`} className="mx-auto mb-4 h-96" />
                <h2 className="text-xl font-bold">{slide.heading}</h2>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
