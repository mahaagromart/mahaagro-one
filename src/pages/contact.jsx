import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import img from "../../public/assets/images/img/Contact-banner.png";
import imgMobile from "../../public/assets/images/img/Contact-banner.png"; // Added mobile image
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message || !formData.phone) {
            alert("Please fill all fields!");
        } else {
            alert("Form Submitted");
            setFormData({ name: "", email: "", phone: "", message: "" });
        }
    };

    return (
        <>

            <main className="container mx-auto px-6 ">
                <div className="bg-white text-gray-800">
                    {/* Banner Section */}
                    <div className="relative w-full h-[20vh] md:h-96">
                        {/* Default image for larger screens */}
                        <Image
                            src={img} // Banner Image
                            alt="Banner Image"
                            layout="fill"
                            className="rounded-md hidden md:block "
                        />
                        {/* Mobile image for smaller screens */}
                        <Image
                            src={imgMobile} // Mobile Image
                            alt="Mobile Banner Image"
                            layout="responsive"
                            width={600}
                            height={200}
                            className="rounded-md md:hidden h-40 object-cover"
                        />
                    </div>
                    <h1 className="text-red text-4xl font-bold text-left mt-4">Contact Us</h1>

                    {/* Two-Column Layout for Contact Information and Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        {/* First Column: Join Maha Agromart, Contact Info */}
                        <div>
                            <h2 className="text-green-500 font-semibold text-2xl mb-4 ">Join Maha Agromart</h2>
                            <p className="text-gray-700 mb-6">
                                Become a part of Maha Agromart and take your agricultural business to the next level.
                                We offer great opportunities for growth, collaboration, and success. Get in touch with
                                us to learn more about how you can join the Maha Agromart family and grow with us.
                            </p>

                            {/* Contact Details */}
                            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-center">
                                    <FaWhatsapp className="text-green-500 mr-2" />
                                    <a href="https://wa.me/1234567890" className="hover:underline">phone no: 8888842325
                                        8888842290</a>
                                </li>
                                <li className="flex items-center">
                                    <FaEnvelope className="text-gray-600 mr-2" />
                                    <a href="mailto:contact@mahaagromart.com" className="hover:underline">Email: support@mahaagromart.com /
                                    info@mahaagromart.com</a>
                                </li>
                                <li className="flex items-center">
                                    <FaMapMarkerAlt className="text-red-600 mr-2" />
                                    <span>Address: Krushi Udyog Bhavan Dinkarrao Desai Marg, Aarey Milk Colony, Goregaon (E), Mumbai - 400065.</span>
                                </li>
                                {/* Added Contact Number */}
                                <li className="flex items-center">
                                    <FaWhatsapp className="text-green-500 mr-2" />
                                    <span>Phone: +918888842300
                                   </span>
                                </li>
                            </ul>

                            {/* Google Map Embed */}
                            <div className="mt-6">
                                <iframe
                                    title="Maha Agromart Location"
                                    width="100%"
                                    height="300"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.6117976286355!2d-77.0368708!3d38.9071903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b52e8a79901d%3A0x7d9e9c4c4b4acb6!2sMaha%20Agromart%20St.!5e0!3m2!1sen!2sus!4v1592280764123!5m2!1sen!2sus"
                                    style={{ border: "0", borderRadius: "8px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Second Column: Get in Touch Form and Social Media */}
                        <div>
                            <h2 className="text-green-500 font-semibold text-2xl mb-4">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                                        Your Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                                        rows="6"
                                        placeholder="Enter your message"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                            {/* Download Maha Agromart & Social Icons */}
                            <div className="mt-8 flex flex-col items-center">
                                <Link href="/download" className="block text-blue-500 font-semibold text-lg mb-4">
                                    Download Maha Agromart App
                                </Link>

                                <div className="flex space-x-6">
                                    <a href="https://facebook.com" className="text-gray-800 hover:text-blue-600">
                                        <FaFacebook size={24} />
                                    </a>
                                    <a href="https://twitter.com" className="text-gray-800 hover:text-blue-600">
                                        <FaTwitter size={24} />
                                    </a>
                                    <a href="https://instagram.com" className="text-gray-800 hover:text-pink-600">
                                        <FaInstagram size={24} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    );
};

export default ContactPage;