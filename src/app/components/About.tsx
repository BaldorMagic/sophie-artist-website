export default function About() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
        <img
          src="/artist.jpg"
          alt="Artist portrait"
          className="w-64 h-64 object-cover rounded-full shadow-md"
        />
        <div>
          <h2 className="text-3xl font-serif mb-4">About the Artist</h2>
          <p className="text-gray-700 leading-relaxed">
            Jane Smith is a landscape painter whose works explore the interplay 
            between blue and earthy tones. Inspired by nature’s vastness and serenity, 
            her paintings aim to evoke a deep sense of calm and connection.
          </p>
        </div>
      </div>
    );
  }
  