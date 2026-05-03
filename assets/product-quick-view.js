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

        const res = await axios.get(productUrl);
        quickViewContainer.innerHTML = await quickViewPopupTemplate(res.data);
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



function quickViewPopupTemplate({ id, title, description, price, featured_image, options, variants }) {

const optionsTemplate = options.map(option => {

  if (option.name.toLowerCase() === "size") {
    return `
      <div class="product-quick-view__options">
        <label>${option.name}</label>
        <select name="size">
          ${option.values.map(v => `
            <option value="${v}">${v}</option>
          `).join('')}
        </select>
      </div>
    `;
  }

  if (option.name.toLowerCase() === "color") {
    return `
      <div class="product-quick-view__options">
        <label>${option.name}</label>
        <div>
          ${option.values.map(v => `
            <label>
              <input type="checkbox" name="color" value="${v}" />
              ${v}
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="product-quick-view__options">
      <label>${option.name}</label>
      ${option.values.map(v => `<span>${v}</span>`).join('')}
    </div>
  `;
}).join('');

return `
  <div class="product-quick-view__content">
    
    <div class="product-quick-view__content-image-wrapper">
      <img src="${featured_image}" class="product-quick-view__content-image" width="100%" />
    </div>

    <div class="product-quick-view__content-text-wrapper">
      <h4>${title}</h4>
      <span>${(price / 100).toFixed(2)}€</span>
      <div>${description}</div>
    </div>

  </div>

  <form id="product-quick-view-form">

    ${optionsTemplate}

    <input type="hidden" name="id" value="${variants[0].id}">

    <button type="submit" class="product-quick-view__button">
      Add to cart
    </button>

  </form>

  <span class="product-quick-view__close-button"></span>
`;
}
