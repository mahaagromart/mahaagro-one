import Image from "next/image";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import imga from "../../public/assets/images/B2b/b (1).webp"
import imgb from "../../public/assets/images/B2b/b (2).webp"
import imgc from "../../public/assets/images/B2b/b (3).webp"
import imgd from "../../public/assets/images/B2b/b (4).webp"

const b2bListings = [
    {
        title: "Cotton (BULK Selling)",
        date: "2024-09-09",
        description:
            "MahaAgroMart's Cotton B2B service connects large-scale cotton suppliers with buyers across industries, ensuring reliable sourcing, quality verification, and competitive pricing.",
        imgSrc: imga,
        link: "",
    },
    {
        title: "Sitafal Mohatsav",
        date: "2024-11-15",
        description: "Sitafal Mohatsav Full Size",
        imgSrc: imgb,
        link: "",
    },
    {
        title: "Pesticides B2B",
        date: "2024-12-10",
        description:
            "Our B2B platform offers high-quality pesticides, ensuring cost efficiency, compliance with regulations, and secure transactions for wholesalers and distributors.",
        imgSrc: imgc,
        link: "",
    },
    {
        title: "Animal Feed B2B Selling",
        date: "2024-12-10",
        description:
            "Our platform provides premium-quality animal feed with reliable delivery, competitive pricing, and easy ordering for livestock, poultry, and aquaculture businesses.",
        imgSrc: imgd,
        link: "",
    },
];

export default function B2BPage() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-center text-3xl font-bold my-5">B2B</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {b2bListings.map((item, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all border border-gray-200">
                        <Image
                            src={item.imgSrc}
                            alt={item.title}
                            width={300}
                            height={170}
                            className="w-full h-44 object-cover rounded-md"
                            onError={(e) => (e.target.src = 'https://mahaagromart.com/public/assets/front-end/img/placeholder.png')}
                        />
                        <div className="mt-4">
                            <h6 className="text-lg font-semibold text-black">{item.title}</h6>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <FaCalendar /> {item.date}
                            </p>
                            <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                            <Link
                                href={item.link}
                                className="mt-4 inline-block text-white bg-green-600 border border-green-600 rounded-lg font-medium px-4 py-2 hover:bg-green-700 hover:border-green-700 transition"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
