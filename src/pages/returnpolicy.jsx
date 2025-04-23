import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto p-4 text-left rtl">
      <h2 className="text-center mb-3 text-3xl font-bold">Return Policy</h2>
      <div className="card border-2 rounded-lg p-6 shadow-lg">
        <div className="card-body">
          <p><strong>RETURN & REPLACEMENT:</strong></p>
          <ol className="list-decimal pl-5" >
          <li>Replacement is the action or process of replacing something in place of another. A Buyer can request for replacement whenever he is not satisfied with the item, for reason being:</li>
          <ul className="list-disc pl-5">
            <li>(i) Damaged in shipping.</li>
            <li>(ii) Defective item.</li>
            <li>(iii) Item(s) missing; and</li>
            <li>(iv) Wrong item shipped.</li>
          </ul>
          <li>The Seller can always accept the return irrespective of the policy. Buyer needs to raise the replacement request within the return period applicable to the respective product. The Buyer has to raise a replacement request by contacting THE M.A.I.D.C. and give the “reason for rejection” and order details. An intimation shall be provided to Seller seeking either "approval" or "rejection" of the replacement request.</li>
          <li>In case the Seller accepts the replacement request, Buyer shall be required to return the product to the Seller and only after return of the product, Seller shall be under obligation to provide the replacement product to the Buyer. In case Seller rejects the replacement request, Buyer can choose to raise a dispute by contacting the customer care of THE M.A.I.D.C. In case the Seller doesn't have the product at all, Seller can provide the refund to the Buyer and Buyer shall be under obligation to accept the refund in lieu of replacement.</li>
          <li>All the product parameters shall be required to be complied within each case of replacement. If the Seller doesn't respond to the Buyer's replacement request, within thirty (30) days from the date of replacement request placed by the Buyer, refund shall be processed in favour of Buyer and Seller shall be liable to refund amount paid to the Seller. All shipping and other replacement charges shall be borne and incurred by the Seller.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;