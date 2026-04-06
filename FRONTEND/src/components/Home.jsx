import { pageTitleClass, bodyText, primaryBtn, secondaryBtn } from "../styles/common";
import { Link } from "react-router";

function Home() {
  return (
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className={pageTitleClass + " mb-8 drop-shadow-sm"}>
            Discover Brilliant Ideas and Inspiring Stories
          </h1>
          <p className={bodyText + " mx-auto max-w-2xl mb-12"}>
            Join our vibrant community of writers and thinkers. Read the latest perspectives, share your voice, and engage with content that matters.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link to="/register" className={primaryBtn}>
              Get Started
            </Link>
            <Link to="/login" className={secondaryBtn}>
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}

export default Home;