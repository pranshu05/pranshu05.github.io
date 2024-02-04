import Image from "next/image";
import { Footer } from "../components/footer";
import { ageInYears } from "../lib/ageInYears";

export default function Home() {
  return (
    <div className="h-full w-full p-0 m-0">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-2/5 mx-auto mt-32">
        <div className="flex items-baseline">
          <h1 className="text-xl font-medium">Pranshu Patel</h1>
          <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
        </div>
        <p className="text-zinc-400">{ageInYears}y/o Developer, India</p>
        <Footer />
      </div>
    </div>
  );
}
