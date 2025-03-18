import { RefreshCw } from "lucide-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ProductCompareButton = ({ setCompareProducts, product }) => {
  // Function to add product to localStorage
  const handleCompare = () => {
    const existingProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];

    // Check if the product already exists to avoid duplicates
    const isProductExists = existingProducts.some((item) => item.id === product.id);

    if (isProductExists) {
      alert(`${product.name} is already in the comparison list.`);
      return;
    }

    // If 3 products already exist, ask the user to remove one
    if (existingProducts.length >= 3) {
      const productToRemove = prompt(
        `You can compare up to 3 products. Please select a PRODUCT ID displayed in front of name to remove:\n${existingProducts
          .map((p, index) => `(${index + 1}) ${p.name}`)
          .join("\n")}`
      );

      // Validate input and remove the chosen product
      const indexToRemove = parseInt(productToRemove, 10) - 1;
      if (
        isNaN(indexToRemove) ||
        indexToRemove < 0 ||
        indexToRemove >= existingProducts.length
      ) {
        alert("Invalid selection. No product removed.");
        return;
      }

      existingProducts.splice(indexToRemove, 1); // Remove selected product
    }

    // Add the new product and save back to localStorage
    const updatedProducts = [...existingProducts, product];
    setCompareProducts(updatedProducts);

    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));

    alert(`${product.name} added for comparison!`);
  };

  return (
     <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-top-compare-${product?.id}`}>Compare</Tooltip>}
    > 
      <button className="btn btn-outline-secondary" onClick={handleCompare}>
        <RefreshCw size={16} />
      </button>
    </OverlayTrigger>

  );
};

export default ProductCompareButton;

// import { useState, useEffect } from "react";
// import { RefreshCw } from "lucide-react";

// const ProductCompare = ({ product }) => {
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedToRemove, setSelectedToRemove] = useState([]);

//   // Load products from localStorage on mount
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
//     setCompareProducts(storedProducts);
//   }, []);

//   // Handle checkbox selection
//   const handleCheckboxChange = (productId) => {
//     setSelectedToRemove((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId) // Remove if already selected
//         : [...prev, productId] // Add if not selected
//     );
//   };

//   // Update localStorage and state
//   const updateLocalStorage = (products) => {
//     localStorage.setItem("compareProducts", JSON.stringify(products));
//     setCompareProducts(products);
//   };

//   // Function to add product to compare
//   const handleCompare = () => {
//     const isProductExists = compareProducts.some((p) => p.id === product.id);

//     if (isProductExists) {
//       alert(`${product.name} is already in the comparison list.`);
//       return;
//     }

//     // If 3 products already exist, show the modal
//     if (compareProducts.length >= 3) {
//       setShowModal(true);
//       return;
//     }

//     // If space is available, add the new product
//     const updatedProducts = [...compareProducts, product];
//     updateLocalStorage(updatedProducts);
//     alert(`${product.name} added for comparison!`);
//   };

//   // Handle product removal and add new product
//   const handleRemoveAndAdd = () => {
//     // Remove selected products
//     const remainingProducts = compareProducts.filter(
//       (p) => !selectedToRemove.includes(p.id)
//     );

//     // Add new product only if space is available
//     if (remainingProducts.length < 3) {
//       const updatedProducts = [...remainingProducts, product];
//       updateLocalStorage(updatedProducts);
//       alert(`${product.name} added for comparison!`);
//       setShowModal(false);
//       setSelectedToRemove([]);
//     } else {
//       alert("Please select at least one product to remove.");
//     }
//   };

//   return (
//     <div>
//       <button className="btn btn-outline-secondary" onClick={handleCompare}>
//         <RefreshCw size={16} /> Compare
//       </button>

//       {/* Modal for product removal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4>Select products to remove:</h4>
//             {compareProducts.map((p) => (
//               <label key={p.id}>
//                 <input
//                   type="checkbox"
//                   checked={selectedToRemove.includes(p.id)}
//                   onChange={() => handleCheckboxChange(p.id)}
//                 />
//                 {p.name}
//               </label>
//             ))}

//             <div className="modal-actions">
//               <button onClick={handleRemoveAndAdd}>Remove & Add</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background: white;
//           padding: 20px;
//           border-radius: 12px;
//           width: 300px;
//         }

//         .modal-actions {
//           margin-top: 10px;
//           display: flex;
//           justify-content: space-between;
//         }

//         label {
//           display: block;
//           margin: 5px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCompare;


