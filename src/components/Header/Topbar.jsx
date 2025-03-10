import { useState, useEffect } from 'react';
import { FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiGlobe } from 'react-icons/fi';

const Topbar = () => {
    useEffect(() => {
        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,mr',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                        multilanguagePage: true,
                    },
                    'google_translate_element'
                );

                setTimeout(() => {
                    const dropdown = document.querySelector('.goog-te-menu-value');
                    const selectLabel = document.querySelector('.goog-te-menu-value span');
                    if (dropdown && selectLabel) {
                        selectLabel.style.display = 'none';
                    }
                    document.querySelectorAll('.goog-logo-link').forEach(el => el.style.display = 'none');
                }, 1000);
            };

            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Function to navigate to the location page
    const handleLocationClick = () => {
        window.location.href = "/location"; // Update this with your actual location page URL
    };

    return (
        <div className="bg-green-900 text-white py-2 px-4 sm:px-16 hidden sm:block">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div className="flex items-center cursor-pointer" onClick={handleLocationClick}>
                        <FiMapPin className="mr-2" />
                        <span className="font-poppins">Location</span>
                    </div>
                    <div className="flex items-center">
                        <FiMail className="mr-2" />
                        <span className="font-poppins">info@mahaagromart.com</span>
                    </div>
                </div>

                {/* Google Translate Widget */}
                <div className="flex items-center space-x-2">
                    <FiGlobe size={18} />
                    <div id="google_translate_element" className="text-black"></div>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <a href="#" className="text-white hover:text-gray-400">
                        <FiFacebook size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FiTwitter size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FiInstagram size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FiYoutube size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
