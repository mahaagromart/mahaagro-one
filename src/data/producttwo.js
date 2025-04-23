import Fertilizera from "../../public/assets/images/Fertilizer/fert (1).svg";
import Fertilizerb from "../../public/assets/images/Fertilizer/fert (2).svg";
import Fertilizerc from "../../public/assets/images/Fertilizer/fert (3).svg";
import Fertilizerd from "../../public/assets/images/Fertilizer/fert (4).svg";
import Fertilizere from "../../public/assets/images/Fertilizer/fert (5).svg";
import Fertilizerf from "../../public/assets/images/Fertilizer/fert (6).svg";

const productsData = [
    // Category ID: 2 (Fertilizer)
    {
        id: 1, // Changed from 1 to 8
        category_id: 1,
        category: 'Fertilizer',
        name: 'Jaikissan- DF ',
        image: Fertilizera,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },
    {
        id: 2, // Changed from 2 to 9
        category_id: 1,
        category: 'Fertilizer',
        name: 'Jaikisan Fert ..',
        image: Fertilizerb,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },
    {
        id: 10, // Changed from 3 to 10
        category_id: 1,
        category: 'Fertilizer',
        name: 'Jaikissan Borocon',
        image: Fertilizerc,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },
    {
        id: 11, // Changed from 4 to 11
        category_id: 1,
        category: 'Fertilizer',
        name: 'jai kissan -agro-zyme',
        image: Fertilizerd,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },
    {
        id: 12, // Changed from 5 to 12
        category_id: 1,
        category: 'Fertilizer',
        name: 'Zinc fert..',
        image: Fertilizere,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },
    {
        id: 13, // Changed from 6 to 13
        category_id: 1,
        category: 'Fertilizer',
        name: 'ferrous fert..',
        image: Fertilizerf,
        price: {
            original: 8,
            discounted: 3,
        },
        discount: 77,
        rating: 5,
        reviews: 500,
        weights: [
            { label: '350g', originalPrice: 8, discountedPrice: 3 },
            { label: '500g', originalPrice: 10, discountedPrice: 4 },
            { label: '1kg', originalPrice: 15, discountedPrice: 7 },
        ],
        selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
    },

];
export default productsData;