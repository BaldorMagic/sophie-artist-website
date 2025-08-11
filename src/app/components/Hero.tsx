export default function Hero() {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-800 mb-4">
            Landscapes in Blue & Earth
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Capturing the spirit of nature through color and texture
          </p>
          <a
            href="#gallery"
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            View Gallery
          </a>
        </div>
      </section>
    );
  }
  