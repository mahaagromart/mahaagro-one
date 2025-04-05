import Link from 'next/link';
import { FaGift } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Import useRouter hook
import { useSelector } from 'react-redux'; // Import useSelector to get cart items

export default function Billform() {
    const router = useRouter();
    const { totalPrice, totalQuantity } = router.query; // Retrieve query parameters
    const { cartItems } = useSelector((state) => state.cart); // Get cart items from the state

    return (
        <>
            <div className="bg-white text-gray-800 min-h-screen flex flex-col">
                {/* Main Content */}
                <div className="flex-1 container mx-auto py-18 px-4">
                    {/* <div className="border-b-2 border-gray-500 mb-1"></div> */}

                    {/* Breadcrumbs
                    <div className="flex items-center mb-4 space-x-3">
                        <Link href="/" className="text-black text-lg hover:text-green-300 transition-colors">
                            Home
                        </Link>
                        <span className="text-black">/</span>
                        <Link href="/checkout" className="text-black text-lg hover:text-green-300 transition-colors">
                            Checkout
                        </Link>
                    </div> */}

                    {/* <div className="border-b-2 border-gray-500 mb-6"></div> */}

                    {/* Coupon Section */}
                    <div className="bg-pink-50 p-4 rounded-md mb-8">
                        <div className="flex justify-between items-center">
                            {/* Coupon Icon */}
                            <FaGift className="text-green-500 mr-2" />
                            <span className="text-gray-700 font-semibold">Have a coupon?</span>
                            <Link href="#" className="text-green-800 hover:text-green-400">Click here to enter your code</Link>
                        </div>
                        {/* Coupon Code Input (Hidden initially, reveal upon clicking) */}
                        <div className="mt-4 hidden" id="coupon-input">
                            <input
                                type="text"
                                placeholder="Enter Coupon Code"
                                className="border border-gray-300 rounded-md p-3 w-full"
                            />
                            <button className="mt-2 inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                Apply Coupon
                            </button>
                        </div>
                    </div>

                    {/* Flex Layout for Order Summary and Billing Information */}
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        {/* Billing Information Form */}
                        <div className="w-full md:w-2/3">
                            <h3 className="text-2xl font-semibold text-gray-700">Billing Information</h3>
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    {/* First Name */}
                                    <input type="text" placeholder="First Name*" className="border border-gray-300 rounded-md p-3" required />
                                    
                                    {/* Last Name */}
                                    <input type="text" placeholder="Last Name*" className="border border-gray-300 rounded-md p-3" required />

                                    {/* Company Name (Optional) */}
                                    <input type="text" placeholder="Company Name (Optional)" className="border border-gray-300 rounded-md p-3" />

                                    {/* Country/Region Dropdown */}
                                    <select className="border border-gray-300 rounded-md p-3">
                                        <option value="">Select Country/Region</option>
                                        <option value="IN">India</option>
                                        {/* Add more countries as needed */}
                                    </select>

                                    {/* Street Address */}
                                    <input type="text" placeholder="Street Address*" className="border border-gray-300 rounded-md p-3" required />

                                    {/* Town/City */}
                                    <input type="text" placeholder="Town/City" className="border border-gray-300 rounded-md p-3" />

                                    {/* State Dropdown */}
                                    <select className="border border-gray-300 rounded-md p-3" required>
                                        <option value="">Select State</option>
                                        <option value="MH">Maharashtra</option>
                                        <option value="KA">Karnataka</option>
                                        {/* Add more states as needed */}
                                    </select>

                                    {/* Zipcode */}
                                    <input type="text" placeholder="Zipcode*" className="border border-gray-300 rounded-md p-3" required />

                                    {/* Phone */}
                                    <input type="tel" placeholder="Phone*" className="border border-gray-300 rounded-md p-3" required />

                                    {/* Email Address */}
                                    <input type="email" placeholder="Email Address*" className="border border-gray-300 rounded-md p-3" required />
                                </div>

                                {/* Create Account Checkbox */}
                                <div className="flex items-center mt-6">
                                    <input type="checkbox" id="create-account" className="mr-2" />
                                    <label htmlFor="create-account" className="text-gray-600">Create an account for future use</label>
                                </div>

                                {/* Different Shipping Address Checkbox */}
                                <div class="flex items-center mt-4">
                                    <input type="checkbox" id="different-shipping" className="mr-2" />
                                    <label htmlFor="different-shipping" className="text-gray-600">Ship to a different address?</label>
                                </div>

                                {/* Order Notes */}
                                <div className="mt-6">
                                    <textarea placeholder="Order Notes (Optional)" className="w-full border border-gray-300 rounded-md p-3" rows="4"></textarea>
                                </div>

                                {/* <button type="submit" className="mt-6 inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                    Continue to Payment
                                </button> */}
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-gray-50 p-6 rounded-md shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-700">Your Order</h3>
                                <div className="my-4">
                                    <p className="flex justify-between font-medium text-gray-600">
                                        <span>Product Name</span>
                                        <span>Subtotal</span>
                                    </p>
                                    <div className="border-t-2 border-gray-300 my-4"></div>

                                    {/* Products */}
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span>{item.name}</span>
                                            <span>₹{item.selectedDiscountedPrice * item.quantity}</span>
                                        </div>
                                    ))}

                                    <div className="border-t-2 border-gray-300 my-4"></div>

                                    {/* Subtotal */}
                                    <p className="flex justify-between font-bold text-lg text-gray-800">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice}</span>
                                    </p>

                                    {/* Shipping */}
                                    <div className="flex justify-between mt-4">
                                        <span className="text-gray-700 font-semibold">Shipping</span>
                                        <div>
                                            <div className="flex items-center">
                                                <input type="radio" id="flat-rate" name="shipping" className="mr-2" />
                                                <label htmlFor="flat-rate" className="text-gray-600">Flat Rate</label>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <input type="radio" id="local-pickup" name="shipping" className="mr-2" />
                                                <label htmlFor="local-pickup" className="text-gray-600">Local Pickup</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-gray-300 my-4"></div>

                                    {/* Total */}
                                    <p className="flex justify-between font-bold text-lg text-gray-800">
                                        <span>Total</span>
                                        <span>₹{totalPrice}</span>
                                    </p>

                                    {/* Payment Method */}
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-700">Payment Method</h4>
                                        <div className="flex items-center mt-2">
                                            <input type="radio" id="bank-transfer" name="payment" className="mr-2" />
                                            <label htmlFor="bank-transfer" className="text-gray-600">Direct Bank Transfer</label>
                                        </div>
                                        <p className="text-gray-600 mt-2">Please transfer the total amount to our bank account after placing the order.</p>

                                        <div className="flex items-center mt-4">
                                            <input type="radio" id="cash-on-delivery" name="payment" className="mr-2" />
                                            <label htmlFor="cash-on-delivery" className="text-gray-600">Cash on Delivery</label>
                                        </div>

                                        <div className="border-t-2 border-gray-300 my-4"></div>

                                        {/* Terms and Conditions */}
                                        <div className="flex items-center">
                                            <input type="checkbox" id="agree" className="mr-2" required />
                                            <label htmlFor="agree" className="text-gray-600">
                                                I have read and agree to the <Link href="/Termscondition" className="text-green-500 hover:text-green-400">Website Terms & Conditions</Link> and <Link href="/privacypolicy" className="text-green-500 hover:text-green-400">Privacy Policy</Link>.
                                            </label>
                                        </div>

                                        {/* Place Order Button */}
                                        <button type="submit" className="mt-6 w-full inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                            Proceed to payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}