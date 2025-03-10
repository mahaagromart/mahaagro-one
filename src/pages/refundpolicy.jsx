import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rtl text-left">
            <h2 className="text-center mb-3 text-2xl sm:text-3xl md:text-4xl headerTitle">Refund Policy</h2>
            <div className="card __card border-2 rounded-lg p-4 sm:p-8 md:p-12 lg:p-16">
                <div className="card-body">
                    <p><strong>Refund Policy</strong></p>
                    <ol className="list-decimal pl-5">
                        <li>The refund will be processed only after the product has been received by the Seller and it is found that:</li>
                        <ul className="list-disc pl-5">
                            <li>(i) The product was not damaged while in your possession.</li>
                            <li>(ii) The product is not different from what was shipped to you.</li>
                            <li>(iii) The product is returned in its original condition; and</li>
                            <li>(iv) Customer has submitted an unboxing video.</li>
                        </ul>
                        <li>The refund shall be processed only through the original mode of payment and in no other manner.</li>
                        <li>The maximum amount of refund for any transaction shall not exceed the total price paid by the Buyer for the concerned transaction or product that was ordered through the E-COMMERCE PLATFORM. In no case, shall THE M.A.I.D.C. be liable to pay any interest, compensation, or damages on the refund amount.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;