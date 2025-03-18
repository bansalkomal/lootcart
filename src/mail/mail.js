// const nodemailer = require('nodemailer');

// const sendCartDetailsEmail = (userEmail, cartProducts) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com',
//             pass: 'your-email-password'
//         }
//     });

//     let productDetails = '';
//     cartProducts.forEach(product => {
//         productDetails += `
//             <div class="product">
//                 <img src="${product.image}" alt="${product.name}">
//                 <div class="product-details">
//                     <h3>${product.name}</h3>
//                     <p>Price: $${product.price.toFixed(2)}</p>
//                     <p>Size: ${product.size}</p>
//                     <p>Color: ${product.color}</p>
//                 </div>
//             </div>
//         `;
//     });

//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: userEmail,
//         subject: 'Your Cart Details',
//         html: `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Cart Details</title>
//                 <style>
//                     body {
//                         font-family: Arial, sans-serif;
//                         background-color: #f4f4f4;
//                         margin: 0;
//                         padding: 0;
//                     }
//                     .container {
//                         width: 100%;
//                         max-width: 600px;
//                         margin: 0 auto;
//                         background-color: #ffffff;
//                         padding: 20px;
//                         border-radius: 8px;
//                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                     }
//                     .header {
//                         text-align: center;
//                         padding-bottom: 20px;
//                     }
//                     .header h1 {
//                         margin: 0;
//                         color: #333333;
//                     }
//                     .product {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;
//                         border-bottom: 1px solid #dddddd;
//                         padding: 10px 0;
//                     }
//                     .product img {
//                         max-width: 100px;
//                         border-radius: 8px;
//                     }
//                     .product-details {
//                         flex: 1;
//                         margin-left: 20px;
//                     }
//                     .product-details h3 {
//                         margin: 0;
//                         color: #333333;
//                     }
//                     .product-details p {
//                         margin: 5px 0;
//                         color: #666666;
//                     }
//                     .footer {
//                         text-align: center;
//                         padding-top: 20px;
//                     }
//                     .footer p {
//                         margin: 0;
//                         color: #666666;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="container">
//                     <div class="header">
//                         <h1>Your Cart Details</h1>
//                     </div>
//                     ${productDetails}
//                     <div class="footer">
//                         <p>Thank you for shopping with us!</p>
//                     </div>
//                 </div>
//             </body>
//             </html>
//         `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Email sent: ' + info.response);
//     });
// };

// // Example usage
// const userEmail = 'user@example.com';
// const cartProducts = [
//     {
//         name: 'Product 1',
//         price: 99.99,
//         size: 'L',
//         color: 'Red',
//         image: 'https://example.com/product1.jpg'
//     },
//     {
//         name: 'Product 2',
//         price: 49.99,
//         size: 'M',
//         color: 'Blue',
//         image: 'https://example.com/product2.jpg'
//     }
// ];

// sendCartDetailsEmail(userEmail, cartProducts);