import Fruitsa from '../../public/assets/images/fruitproduct/fruits.png';
import Fruitsb from '../../public/assets/images/fruitproduct/fruit-1 (1).png';
import Fruitsc from '../../public/assets/images/fruitproduct/fruit-2 (1).png';
import Fruitsd from '../../public/assets/images/fruitproduct/fruit-2 (2).png';
import Fruitse from '../../public/assets/images/fruitproduct/fruit-2 (3).png';
import Fruitsf from '../../public/assets/images/fruitproduct/fruit-3 (2).png';
import Fruitsg from '../../public/assets/images/fruitproduct/fruit-3 (3).png';

// // Check if the images are imported correctly by logging them to the console
// console.log(Fruitsa, Fruitsb, Fruitsc, Fruitsd, Fruitse, Fruitsf, Fruitsg);

const productsData = [
    {
        id: 1,
        category_id: 1,
        category: 'Fruits',
        name: 'Blackberry',
        image: Fruitsa,
        price: {
            original: 250,
            discounted: 180,
        },
        discount: 28,
        rating: 4.8,
        reviews: 320,
        weights: [
            { label: '350g', originalPrice: 250, discountedPrice: 180 },
            { label: '500g', originalPrice: 350, discountedPrice: 280 },
            { label: '1kg', originalPrice: 600, discountedPrice: 500 },
        ],
        selectedWeight: { label: '350g', originalPrice: 250, discountedPrice: 180 }
    },
    {
        id: 2,
        category_id: 1,
        category: 'Fruits',
        name: 'Kiwi',
        image: Fruitsb,
        price: {
            original: 150,
            discounted: 120,
        },
        discount: 20,
        rating: 4.5,
        reviews: 200,
        weights: [
            { label: '350g', originalPrice: 150, discountedPrice: 120 },
            { label: '500g', originalPrice: 200, discountedPrice: 160 },
            { label: '1kg', originalPrice: 380, discountedPrice: 320 },
        ],
        selectedWeight: { label: '350g', originalPrice: 150, discountedPrice: 120 }
    },
    {
        id: 3,
        category_id: 1,
        category: 'Fruits',
        name: 'Papaya',
        image: Fruitsc,
        price: {
            original: 90,
            discounted: 70,
        },
        discount: 22,
        rating: 4.3,
        reviews: 150,
        weights: [
            { label: '350g', originalPrice: 90, discountedPrice: 70 },
            { label: '500g', originalPrice: 120, discountedPrice: 90 },
            { label: '1kg', originalPrice: 220, discountedPrice: 170 },
        ],
        selectedWeight: { label: '350g', originalPrice: 90, discountedPrice: 70 }
    },
    {
        id: 4,
        category_id: 1,
        category: 'Fruits',
        name: 'Guava',
        image: Fruitsd,
        price: {
            original: 110,
            discounted: 85,
        },
        discount: 23,
        rating: 4.7,
        reviews: 180,
        weights: [
            { label: '350g', originalPrice: 110, discountedPrice: 85 },
            { label: '500g', originalPrice: 160, discountedPrice: 130 },
            { label: '1kg', originalPrice: 300, discountedPrice: 250 },
        ],
        selectedWeight: { label: '350g', originalPrice: 110, discountedPrice: 85 }
    },
    {
        id: 5,
        category_id: 1,
        category: 'Fruits',
        name: 'Pineapple',
        image: Fruitse,
        price: {
            original: 180,
            discounted: 140,
        },
        discount: 22,
        rating: 4.6,
        reviews: 280,
        weights: [
            { label: '350g', originalPrice: 180, discountedPrice: 140 },
            { label: '500g', originalPrice: 250, discountedPrice: 200 },
            { label: '1kg', originalPrice: 450, discountedPrice: 380 },
        ],
        selectedWeight: { label: '350g', originalPrice: 180, discountedPrice: 140 }
    },
    {
        id: 6,
        category_id: 1,
        category: 'Fruits',
        name: 'Watermelon',
        image: Fruitsf,
        price: {
            original: 70,
            discounted: 50,
        },
        discount: 28,
        rating: 4.2,
        reviews: 130,
        weights: [
            { label: '350g', originalPrice: 70, discountedPrice: 50 },
            { label: '500g', originalPrice: 90, discountedPrice: 70 },
            { label: '1kg', originalPrice: 160, discountedPrice: 130 },
        ],
        selectedWeight: { label: '350g', originalPrice: 70, discountedPrice: 50 }
    },
    {
        id: 7,
        category_id: 1,
        category: 'Fruits',
        name: 'Banana',
        image: Fruitsg,
        price: {
            original: 120,
            discounted: 90,
        },
        discount: 25,
        rating: 4.9,
        reviews: 400,
        weights: [
            { label: '350g', originalPrice: 120, discountedPrice: 90 },
            { label: '500g', originalPrice: 170, discountedPrice: 130 },
            { label: '1kg', originalPrice: 300, discountedPrice: 250 },
        ],
        selectedWeight: { label: '350g', originalPrice: 120, discountedPrice: 90 }
    },
];

export default productsData;