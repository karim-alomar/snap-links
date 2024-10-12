import { LinkShortenerForm, ShortenedLinkTable } from "@/components";

const Home = () => {
  return (
    <div className="mt-10">
      <LinkShortenerForm />
      <ShortenedLinkTable />
    </div>
  );
};

export default Home;
