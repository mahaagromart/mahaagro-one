import { useState } from 'react';
import Head from 'next/head';
import { FaUser, FaMoneyCheckAlt, FaStore } from 'react-icons/fa';

const BecomeSeller = () => {
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
        gst: '',
        shop_name: '',
        shop_pincode: '',
        shop_state: '',
        shop_city: '',
        shop_address: '',
        shop_description: '',
        sellerPackage: '6',
        shopDocuments: [{ type: 'Sales Licence', file: null }],
        captcha: '',
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e, index) => {
        const newDocuments = [...formData.shopDocuments];
        newDocuments[index].file = e.target.files[0];
        setFormData({ ...formData, shopDocuments: newDocuments });
    };

    const handleAddDocument = () => {
        setFormData({
            ...formData,
            shopDocuments: [...formData.shopDocuments, { type: 'Sales Licence', file: null }],
        });
    };

    const handleRemoveDocument = (index) => {
        const newDocuments = formData.shopDocuments.filter((_, i) => i !== index);
        setFormData({ ...formData, shopDocuments: newDocuments });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <div>
            <Head>
                <title>Become a Seller | Maha Agro Mart</title>
            </Head>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
                <h3 className="text-3xl font-semibold text-center mb-6">Shop Application</h3>
                <div className="text-center mb-4">
                    <a
                        className="text-blue-500 hover:underline"
                        href="https://mahaagromart.com/seller/auth/login"
                    >
                        Already have an account? Login.
                    </a>
                </div>
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                >
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
                        <h5 className="text-xl font-semibold mb-4 flex items-center">
                            <FaUser className="mr-2" /> Seller Info
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="f_name"
                                placeholder="First name"
                                value={formData.f_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="l_name"
                                placeholder="Last name"
                                value={formData.l_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="repeatPassword"
                                placeholder="Repeat password"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full sm:col-span-2"
                                name="gst"
                                placeholder="Please enter GST"
                                value={formData.gst}
                                onChange={handleChange}
                            />
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-center text-center">
                                <img
                                    className="w-32 h-32 object-cover rounded-full"
                                    src="https://mahaagromart.com/public/assets/back-end/img/400x400/img2.jpg"
                                    alt="banner"
                                />
                                <input
                                    type="file"
                                    className="form-input mt-3 text-center"
                                    name="image"
                                    onChange={handleFileChange}
                                    accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h5 className="text-xl font-semibold mb-4 flex items-center">
                            <FaMoneyCheckAlt className="mr-2" />
                            Transaction
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Seller Type</label>
                                <select
                                    className="form-select w-full p-2 border rounded"
                                    name="sellertype_id"
                                    value={formData.sellertype_id}
                                    onChange={handleChange}
                                >
                                    <option value="gold_package">Gold Package (₹3000) For unlimited products</option>
                                    <option value="businesses">Businesses</option>
                                    <option value="mil">MIL</option>
                                    <option value="fertilizers">Fertilizers</option>
                                    <option value="pesticides">Pesticides</option>
                                    <option value="fPO_fPC">FPO/FPC</option>
                                    <option value="SHG">SHG</option>
                                    <option value="mahila_bachat">Mahila Bachat Gat</option>
                                    <option value="khadi_udyog">Khadi Udyog</option>
                                    <option value="blind_organisation">Blind Organisation</option>
                                    <option value="handicap_organization">Handicap Organization</option>
                                    <option value="prison_organization">Prison Organization</option>
                                    <option value="NGO">NGO</option>
                                    <option value="distressed_farmers">Distressed Farmers</option>
                                    <option value="government_organization">Government Organization</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Seller Package</label>
                                <select
                                    className="form-select w-full p-2 border rounded"
                                    name="sellerPackage"
                                    value={formData.sellerPackage}
                                    onChange={handleChange}
                                >
                                    <option value="6">Gold Package</option>
                                    <option value="7">Commercial Vendors</option>
                                    <option value="8">Concessional Registration</option>
                                    <option value="9">Free Registration</option>
                                </select>
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block mb-1">Package Amount</label>
                                <span className="block p-2 border rounded bg-gray-100">
                                    ₹ {formData.sellerPackage === '6' ? 3000 : formData.sellerPackage === '7' ? 1000 : formData.sellerPackage === '8' ? 500 : 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
                        <h5 className="text-xl font-semibold mb-4 flex items-center">
                            <FaStore className="mr-2" /> Shop Info
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="shop_name"
                                placeholder="Shop name"
                                value={formData.shop_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="shop_pincode"
                                placeholder="Shop pincode"
                                value={formData.shop_pincode}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="shop_state"
                                placeholder="Shop state"
                                value={formData.shop_state}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg w-full"
                                name="shop_city"
                                placeholder="Shop city"
                                value={formData.shop_city}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                className="form-input border-2 p-2 rounded-lg w-full col-span-2"
                                name="shop_address"
                                placeholder="Shop address"
                                value={formData.shop_address}
                                onChange={handleChange}
                            />
                            <textarea
                                className="form-input border-2 p-2 rounded-lg w-full col-span-2"
                                name="shop_description"
                                placeholder="Shop description"
                                value={formData.shop_description}
                                onChange={handleChange}
                            />

                            {/* Image Section - Responsive Layout */}
                            <div className="col-span-2 flex flex-col md:flex-row md:justify-between items-center gap-6">
                                {/* Logo Section */}
                                <div className="text-center w-full md:w-1/2">
                                    <img
                                        className="w-32 h-32 object-cover mx-auto rounded-full"
                                        src="https://mahaagromart.com/public/assets/back-end/img/400x400/img2.jpg"
                                        alt="logo"
                                    />
                                    <input
                                        type="file"
                                        className="form-input mt-2 w-full"
                                        name="logo"
                                        accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff"
                                    />
                                </div>

                                {/* Banner Section */}
                                <div className="text-center w-full md:w-1/2">
                                    <img
                                        className="w-32 h-32 object-cover mx-auto rounded-full"
                                        src="https://mahaagromart.com/public/assets/back-end/img/400x400/img2.jpg"
                                        alt="banner"
                                    />
                                    <input
                                        type="file"
                                        className="form-input mt-2 w-full"
                                        name="banner"
                                        accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h5 className="text-xl font-semibold mb-4">Shop Documents</h5>
                        <button type="button" className="btn btn-sm btn-success" onClick={handleAddDocument}>
                            <i className="fa fa-plus"></i> Add Document
                        </button>
                        {formData.shopDocuments.map((doc, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mt-4">
                                <select
                                    className="form-select"
                                    name="document_type"
                                    value={doc.type}
                                    onChange={(e) => {
                                        const newDocuments = [...formData.shopDocuments];
                                        newDocuments[index].type = e.target.value;
                                        setFormData({ ...formData, shopDocuments: newDocuments });
                                    }}
                                >
                                    <option value="Sales Licence">Sales Licence</option>
                                    <option value="CIB">CIB</option>
                                    <option value="GST Registration">GST Registration</option>
                                    <option value="PAN Card">PAN Card</option>
                                    <option value="MSME">MSME</option>
                                    <option value="G-2">G-2</option>
                                    <option value="FCO">FCO</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="Manufacturing Licence">Manufacturing Licence</option>
                                    <option value="Shop Registration">Shop Registration</option>
                                    <option value="Driving Licence">Driving Licence</option>
                                    <option value="Incorporation Certificate">Incorporation Certificate</option>
                                </select>
                                <input
                                    type="file"
                                    className="form-input "
                                    name="document_file"
                                    onChange={(e) => handleFileChange(e, index)}
                                />
                                <button
                                    type="button"
                                    className="w-32 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400 font-semibold py-2 px-4 flex justify-center items-center rounded-lg shadow-md transition"
                                    onClick={() => handleRemoveDocument(index)}
                                >
                                    Remove
                                </button>

                            </div>
                        ))}
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h5 className="text-xl font-semibold mb-4">Captcha</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <input
                                type="text"
                                className="form-input border-2 p-2 rounded-lg"
                                name="captcha"
                                placeholder="Enter captcha value"
                                value={formData.captcha}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://mahaagromart.com/seller/auth/code/captcha/1?captcha_session_id=default_recaptcha_id_seller_regi"
                                    alt="captcha"
                                    className="rounded h-10"
                                />
                                <button type="button" className="btn btn-outline-secondary">
                                    <i className="tio-refresh"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="form-group flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="agree" className="flex-grow">
                                I agree to your{' '}
                                <a
                                    href="/Termscondition"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-32 bg-yellow-400 font-bold py-2 px-4 flex items-center rounded-lg shadow-md transition mx-auto"
                            disabled={!formData.agree}
                        >
                            Apply Shop
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeSeller;