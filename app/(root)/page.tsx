import Carousel from "@/components/Carousel";
import FelaTee from "@/components/FelaTee";
import NewArrivals from "@/components/NewArrivals";
import Pants from "@/components/Pants";
import TShirtCategory from "@/components/TShirtCategory";
import Link from "next/link";

export const dynamic = "force-dynamic"


export default function Home() {

  return (
    <div >

      <Carousel />
      <div className="py-12 md:px-6 mb-2 text-center">
        <h1 className="text-center font-karla text-[27px] font-semibold">ElitesMerch Inspired Tees</h1>
        <FelaTee />
        <Link href={`/shirts`}>
          <span className="mt-4 inline-block bg-black text-white py-2 px-4 rounded hover:bg-blue-600">
            View Details
          </span>
        </Link>
      </div>
      <div className="py-12 md:px-6 mb-2 text-center">
        <h1 className="text-center font-karla text-[27px] font-semibold">New Arrivals</h1>

        <NewArrivals />
        <Link href={`/new-arrival`}>
          <span className="mt-4 inline-block bg-black text-white py-2 px-4 rounded hover:bg-blue-600">
            View Details
          </span>
        </Link>
      </div>
      <div className="py-12 md:px-6 mb-2 text-center">

        <TShirtCategory />
        <Pants />
      </div>
    </div>
  );
}
