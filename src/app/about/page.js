import Header from '@/components/Header'; // Assuming your Header is in the components folder
import Image from 'next/image';

// Sample data for key features
const features = [
  {
    name: 'Algorithm-Driven Mixes',
    description: 'Our proprietary algorithm analyzes tempo, key, and genre compatibility to create flawless mashups between you and your friends.',
    icon: '✨', // Replaced with a Unicode icon (sparkles)
  },
  {
    name: 'Find Your Music Soulmate',
    description: 'We identify and score the musical overlap between any two users, revealing your true taste compatibility score.',
    icon: '❤️', // Replaced with a Unicode icon (heart)
  },
  {
    name: 'Group Session Insights',
    description: 'See detailed breakdowns of group listening habits and discover common ground for the next party playlist.',
    icon: '👥', // Replaced with a Unicode icon (people)
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 1. Navigation Bar */}
      

      {/* 2. Main Content Area */}
      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* About Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 sm:text-6xl">
            About Spotify Taste Mixer
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-400">
            Bridging the gap between music lovers. We go beyond simple shared playlists to truly understand and visualize your combined musical taste.
          </p>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold mb-4 text-teal-400">Our Vision: Harmonizing Your Worlds</h2>
            <p className="text-gray-300 text-lg mb-4">
              The idea started with a simple question: "What happens when two people with different tastes try to make one perfect playlist?"
              Traditional tools fall short, mixing songs randomly. Taste Mixer uses the richness of the Spotify API to analyze acoustic features—danceability, energy, valence—to provide meaningful, shareable data.
            </p>
            <p className="text-gray-300 text-lg">
              We aim to be the definitive tool for understanding musical compatibility, whether you're planning a road trip, a wedding, or just a quiet evening.
            </p>
          </div>
          {/* Placeholder for an image or graphic */}
          <div className="md:order-1 h-80 rounded-lg overflow-hidden relative shadow-2xl">
            {/* Replace with your own project image or remove if not needed */}
            <Image
              src="/images/music-visualization.jpg" 
              alt="Music visualization graphic"
              layout="fill"
              objectFit="cover"
              className="opacity-70"
            />
          </div>
        </section>

        {/* Key Features Section */}
        <section className="pt-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-teal-400 transition duration-300">
                {/* ICON CHANGE: Using Unicode icon instead of Heroicon */}
                <div className="text-4xl mb-4" role="img" aria-label={feature.name}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
      </main>
      
      {/* Footer (Simple placeholder) */}
      <footer className="py-6 border-t border-gray-800 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Spotify Taste Mixer. Not affiliated with Spotify.
      </footer>
    </div>
  );
}