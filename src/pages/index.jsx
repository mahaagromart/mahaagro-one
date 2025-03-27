import { useEffect, useState } from "react";``
import Topbanner from "../components/Home/topbanner"; // Adjusted path
import Topcategories from "../components/Home/Topcategories/topcategories"; // Adjusted path
import Fruitcategory from "@/components/Home/fruits"; // Adjusted path
import Banner from "@/components/Home/All-banner/bannerone.jsx";
import Feedback from "@/components/Home/Feedback";
import Weeklyoffer from "@/components/Home/Weeklyoffer";
import Bannertwo from "@/components/Home/All-banner/bannertwo";
import Foodproduct from "@/components/Home/Foodproduct";
import Bannerthree from "@/components/Home/All-banner/bannerthree";
import Onsellproduct from "@/components/Home/Sellproduct";
import Slider from "@/components/Slider/Slider";
import Bannerfour from "@/components/Home/All-banner/bannerfour";
import Nogaproduct from "@/components/Home/Nogaproduct";
import Bannerfive from "@/components/Home/All-banner/bannerfive";
import Pesticidesproduct from "@/components/Home/Pesticidesproduct";
import Bannersix from "@/components/Home/All-banner/bannersix";
import Fertilizerproduct from "@/components/Home/Fertilizerproduct";
import Bannerseven from "@/components/Home/All-banner/bannerseven";
import Animalfeed from "@/components/Home/Animalfeed";
import Bannereight from "@/components/Home/All-banner/bannereight"
import Gardeningproduct from "@/components/Home/Gardeningproduct";
import Bannernine from "@/components/Home/All-banner/bannernine"
import Agroengineerproduct from "@/components/Home/Agroengineer";
import Bannerten from "@/components/Home/All-banner/bannerten"
import Testimonial from "@/components/Home/Testimonial";
import Bannereleven from "@/components/Home/All-banner/bannereleven";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    if (isChatOpen) {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/67da5759123ff2191266d37e/1immeae3l";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, [isChatOpen]);

  return (
    <div>
      <Topbanner />
      <Topcategories />
      <Fruitcategory />
      <Banner />
      <Feedback />
      <Weeklyoffer/>
      <Bannertwo/>
      <Foodproduct/>
      <Bannerthree/>
      <Onsellproduct/>
      <Slider/>
      <Bannerfour/>
      <Nogaproduct/>
      <Bannerfive/>
      <Pesticidesproduct/>
      <Bannersix/>
      <Fertilizerproduct/>
      <Bannerseven/>
      <Animalfeed/>
      <Bannereight/>
      <Gardeningproduct/>
      <Bannernine/>
      <Agroengineerproduct/>
      <Bannerten/>
      <Testimonial/>
      <Bannereleven/>
     
      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-5 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <span>Chatbot</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white text-lg hover:text-gray-200"
            >
              ✖
            </button>
          </div>
          <div id="tawk-chat-container" className="flex-grow"></div>
        </div>
      )}
    </div>
  );
}
 