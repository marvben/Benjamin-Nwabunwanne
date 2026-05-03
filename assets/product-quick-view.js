

 
  const quickViewButtons = document.querySelectorAll('.product-button');
  const quickViewPopup = document.querySelector('.product-quick-view__popup');
  const quickViewPopupOverlay  = document.querySelector('.product-quick-view__popup-overlay');
  const quickViewContainer = document.querySelector('.product-quick-view__container');
  const quickViewCloseButton = document.querySelector('.product-quick-view__close-button')

  quickViewButtons.forEach(quickViewButton => {
    quickViewButton.addEventListener('click', ()=>{
      quickViewPopup.classList.add('active');
      const productUrl =  quickViewButton.dataset.productLink + '.json'
      axios.get(productUrl).then(res  =>{

        const{id, title, description,price, images,featured_image, options, variants }  = res.data;
        //alert(options[0].name)

        //alert(variants[0].name);

//         {
//   id: 123456789,
//   title: "Product Name",
//   handle: "product-name",
//   description: "<p>Product description</p>",
//   published_at: "2024-01-01T00:00:00+00:00",
//   created_at: "2024-01-01T00:00:00+00:00",
//   vendor: "Brand Name",
//   type: "Category",
//   tags: ["tag1", "tag2"],
//   price: 250000, // in kobo (₦2,500.00)
//   price_min: 250000,
//   price_max: 300000,
//   available: true,
//   images: [
//     "//cdn.shopify.com/s/files/.../image1.jpg",
//     "//cdn.shopify.com/s/files/.../image2.jpg"
//   ],
//   featured_image: "//cdn.shopify.com/s/files/.../image1.jpg",
//   options: [
//     {
//       name: "Size",
//       values: ["S", "M", "L"]
//     }
//   ],
//   variants: [
//     {
//       id: 111,
//       title: "M",
//       option1: "M",
//       price: 250000,
//       available: true,
//       sku: "ABC123"
//     }
//   ]
// }
      }).catch(err =>{
        console.log(err.message)
      })

    })
  });

  quickViewCloseButton.addEventListener('click', ()=>{
    quickViewPopup.classList.remove('active');
  });

  quickViewPopupOverlay.addEventListener('click', ()=>{
    quickViewPopup.classList.remove('active');
  })
  
 
