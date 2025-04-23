// pages/cancellation-policy.js

import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="container mx-auto p-4 text-left rtl">
      <h2 className="text-center mb-3 text-3xl font-bold">Cancellation Policy</h2>
      <div className="card border-2 rounded-lg p-6 shadow-lg">
        <div className="card-body">
          <p><strong>Cancellation Policy:</strong></p>
          <ol className="list-decimal pl-5">
            <li>The order cancellation policy for each product is displayed on the product page, as it depends on the type of product and its shelf life.</li>
            <li>Once the product has been processed for delivery and dispatch, the Buyer is not allowed to cancel the order on the E-COMMERCE PLATFORM.</li>
            <li>If the Seller cancels the order, they will provide a full refund including payment gateway charges to the Buyer. The timeline for the refund will depend on the terms & conditions of the payment gateway service provider.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;