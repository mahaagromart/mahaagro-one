import Agroengineera from "../../public/assets/images/Agroengineer/agro (1).webp";
import Agroengineerb from "../../public/assets/images/Agroengineer/agro (2).webp";
import Agroengineerc from "../../public/assets/images/Agroengineer/agro (3).webp";
import Agroengineerd from "../../public/assets/images/Agroengineer/agro (4).webp";
import Agroengineere from "../../public/assets/images/Agroengineer/agro (5).webp";
import Agroengineerf from "../../public/assets/images/Agroengineer/agro (6).webp";

const productsData = [
    // Category ID: 2 (Fertilizer)
     {
               id: 1,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-1.. ',
               image: Agroengineera,
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
               id: 2,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-2..',
               image:Agroengineerb,
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
               id: 3,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-3..',
               image:Agroengineerc,
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
               id: 4,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-4..',
               image:Agroengineerd,
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
               id: 5,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-5..',
               image: Agroengineere,
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
               id: 6,
               category_id: 1,
               category: 'Agroengineer',
               name: 'Garden-tool-6..',
               image:Agroengineerf,
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