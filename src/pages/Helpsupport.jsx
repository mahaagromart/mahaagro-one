import { FaSearch, FaQuestionCircle } from 'react-icons/fa';

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Help & Support</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex items-center bg-white border border-green-600 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for help..."
            className="flex-grow p-3 outline-none"
          />
          <button className="p-3 bg-green-600 text-white">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-green-600 rounded-lg p-4">
              <div className="flex items-center">
                <FaQuestionCircle className="text-green-600 mr-2" />
                <h3 className="text-lg font-medium">{faq.question}</h3>
              </div>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "How do I create an account?",
    answer: "To create an account, go to the sign-up page and fill in the required details.",
  },
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
  },
  {
    question: "How do I contact support?",
    answer: "You can contact support by sending an email to support@mahaagromart.com",
  },
];