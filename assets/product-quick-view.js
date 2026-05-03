const quickViewButtons = document.querySelectorAll('.product-button');
  const quickViewPopup = document.querySelector('.product-quick-view__popup');
  const quickViewPopupOverlay  = document.querySelector('.product-quick-view__popup-overlay');
  const quickViewContainer = document.querySelector('.product-quick-view__container');
 

  quickViewButtons.forEach(quickViewButton => {
    quickViewPopupOverlay.addEventListener('click', ()=> quickViewPopup.classList.remove('active'))
    quickViewButton.addEventListener('click', async ()=>{
        
        quickViewPopup.classList.add('active');
        const productUrl =  quickViewButton.dataset.productLink + '.js'
        quickViewContainer.innerHTML = "<p>Loading...</p>"

        const res = await axios.get(productUrl) 
        quickViewContainer.innerHTML =  await quickViewPopupTemplate(res.data);
        const quickViewCloseButton = document.querySelector('.product-quick-view__close-button')
       if(quickViewCloseButton) {
            quickViewCloseButton.addEventListener('click', ()=> quickViewPopup.classList.remove('active'))
            };

  
         


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
 

    })
  });



  function quickViewPopupTemplate({id, title, description,price, images,featured_image, options, variants }) {
    alert(options)


        return `
  <div class="product-quick-view__content">
    <div class="product-quick-view__content-image-wrapper">
    <img src=${featured_image} class="product-quick-view__content-image" 
    height="100%" width="100%" alt=${title}>
    </div>
    <div class="product-quick-view__content-text-wrapper">
      <h4 class="product-quick-view__content-text-title">${title}</h4>
      <span class="product-quick-view__content-text-price">${(price/100).toFixed(2)}€</span>
      <div class="product-quick-view__content-text-desc">${description}</div>
    </div>
  </div>
  <form id="product-quick-view-form" class="product-quick-view__form">
    <div class="product-quick-view__colors">
      <span class="options-name">Color</span>
      
      <div class="product-quick-view__color-options">
      ${options.map(option, index)=> `<label class="product-quick-view__color-option">White 
          <input type="radio"  name=${option} value=${option} checked=${index === 1 ? true : false }>
        </label>`}
    
        
        
      </div>
    </div>

    <div class="product-quick-view__sizes">
      <label for="size-options" class="options-name" >Size</label>
      <select id="size-options" class="product-quick-view__size-options">
        <option class="product-quick-view__size-option" value="L" >White</option>
        <option class="product-quick-view__size-option" value="L" >White</option>
        <option class="product-quick-view__size-option" value="L" >White</option>
        <option class="product-quick-view__size-option" value="L" >White</option>
      </select>
    </div>

      <button class="product-quick-view__button" type="submit">Add to cart
        <div class="product-quick-view__button-icon" >
        <img src="https://cdn.shopify.com/s/files/1/0988/0495/7495/files/Line_15.png?v=1777474777" height="auto" width="100%">
      </div>
      </button>
    
  </form>
  <span class="product-quick-view__close-button"></span>
        `
  }
 
