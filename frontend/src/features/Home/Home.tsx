import { Navbar } from "./components/Navbar";
import { MovieRow } from "./components/MovieRow";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20">
        {/* Main Content Sections */}
        <div className="space-y-12 px-4 md:px-8">
          
          {/* Trending Now */}
          <section>
            <MovieRow title="Trending Now" />
          </section>

          {/* New Series */}
          <section>
            <MovieRow title="New Series" />
          </section>

          {/* Other Categories */}
          <section>
            <MovieRow title="Documentaries & Culture" />
          </section>

        </div>
      </main>
    </div>
  );
}
export default Home;