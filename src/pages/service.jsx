import Image from "next/image";
import { MessageCircle } from "lucide-react";
import imga from "../../public/assets/images/Service/service (1).svg"
import imgb from"../../public/assets/images/Service/service (2).svg"
import imgc from "../../public/assets/images/Service/service (3).svg"
import imgd from "../../public/assets/images/Service/service (4).svg"
const services = [
  {
    id: 16,
    name: "Drone Services",
    price: "₹ 600",
    img: imga,
    desc: "MahaAgroMart's Drone Services offer innovative agricultural solutions for modern farming needs. Our drones provide precise aerial monitoring, crop health assessment, and soil analysis, helping farmers maximize yield and reduce input costs.",
  },
  {
    id: 17,
    name: "Agro Tourism",
    price: "₹ 5000",
    img: imgb,
    desc: "MahaAgroMart’s Agro Tourism services connect visitors with authentic farming experiences, promoting rural tourism and providing a glimpse into agricultural life. From guided farm tours to hands-on farming workshops, this service fosters a closer connection between urban residents and rural communities.",
  },
  {
    id: 18,
    name: "Financial Services",
    price: "₹ 50",
    img:imgc,
    desc: "MahaAgroMart’s Financial Services offer farmers and agribusinesses accessible, secure financial solutions to support growth and stability. Our services include tailored financing options, crop insurance, credit services, and investment opportunities specifically designed for the agricultural sector.",
  },
  {
    id: 19,
    name: "Consultancy Services",
    price: "₹ 99",
    img: imgd,
    desc: "MahaAgroMart’s Consultancy Services connect farmers, agribusinesses, and stakeholders with expert guidance to enhance agricultural practices, improve operational efficiency, and drive profitability.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6 border-b pb-4">Our Services</h2>
      <div className="grid md:grid-cols-1 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6"
          >
            <div className="w-full md:w-1/3 flex justify-center">
              <Image
                src={service.img}
                alt={service.name}
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-gray-600 my-2">{service.desc}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-green-600">{service.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <MessageCircle size={16} /> Enquiry
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}