import Dronea from "../../public/assets/images/Drone/drone (1).svg";
import Droneb from "../../public/assets/images/Drone/drone (2).svg";
import Dronec from "../../public/assets/images/Drone/drone (3).svg";
import Droned from "../../public/assets/images/Drone/drone (4).svg";
import Dronee from "../../public/assets/images/Drone/drone (5).svg";

const productsData = [
    // Drone Service Product 1
    {
        id: 1,
        category_id: 1,
        category: 'Drone Service',
        name: 'Aerial Survey Pro',
        image: Dronea,
        price: {
            original: 200,
            discounted: 150,
        },
        discount: 25,
        rating: 5,
        reviews: 500,
        weights: [
            { label: 'Basic', originalPrice: 200, discountedPrice: 150 },
            { label: 'Advanced', originalPrice: 300, discountedPrice: 250 },
            { label: 'Premium', originalPrice: 500, discountedPrice: 400 },
        ],
        selectedWeight: { label: 'Basic', originalPrice: 200, discountedPrice: 150 }
    },
    // Drone Service Product 2
    {
        id: 2,
        category_id: 1,
        category: 'Drone Service',
        name: 'Drone Delivery Plus',
        image: Droneb,
        price: {
            original: 120,
            discounted: 100,
        },
        discount: 17,
        rating: 5,
        reviews: 500,
        weights: [
            { label: 'Small Package', originalPrice: 120, discountedPrice: 100 },
            { label: 'Medium Package', originalPrice: 180, discountedPrice: 150 },
            { label: 'Large Package', originalPrice: 250, discountedPrice: 200 },
        ],
        selectedWeight: { label: 'Small Package', originalPrice: 120, discountedPrice: 100 }
    },
    // Drone Service Product 3
    {
        id: 3,
        category_id: 1,
        category: 'Drone Service',
        name: 'Precision Mapping Drone',
        image: Dronec,
        price: {
            original: 500,
            discounted: 400,
        },
        discount: 20,
        rating: 5,
        reviews: 500,
        weights: [
            { label: 'Basic', originalPrice: 500, discountedPrice: 400 },
            { label: 'Advanced', originalPrice: 700, discountedPrice: 550 },
            { label: 'Premium', originalPrice: 1000, discountedPrice: 800 },
        ],
        selectedWeight: { label: 'Basic', originalPrice: 500, discountedPrice: 400 }
    },
    // Drone Service Product 4
    {
        id: 4,
        category_id: 1,
        category: 'Drone Service',
        name: 'Surveillance Drone 360',
        image: Droned,
        price: {
            original: 800,
            discounted: 600,
        },
        discount: 25,
        rating: 5,
        reviews: 500,
        weights: [
            { label: 'Standard', originalPrice: 800, discountedPrice: 600 },
            { label: 'Enhanced', originalPrice: 1000, discountedPrice: 800 },
            { label: 'Elite', originalPrice: 1200, discountedPrice: 1000 },
        ],
        selectedWeight: { label: 'Standard', originalPrice: 800, discountedPrice: 600 }
    },
    // Drone Service Product 5
    {
        id: 5,
        category_id: 1,
        category: 'Drone Service',
        name: 'Search and Rescue Drone',
        image: Dronee,
        price: {
            original: 1500,
            discounted: 1200,
        },
        discount: 20,
        rating: 5,
        reviews: 500,
        weights: [
            { label: 'Standard', originalPrice: 1500, discountedPrice: 1200 },
            { label: 'Advanced', originalPrice: 2000, discountedPrice: 1600 },
            { label: 'Elite', originalPrice: 2500, discountedPrice: 2000 },
        ],
        selectedWeight: { label: 'Standard', originalPrice: 1500, discountedPrice: 1200 }
    },
];

export default productsData;
