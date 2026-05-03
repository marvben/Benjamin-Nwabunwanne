const quickViewButtons = document.querySelectorAll('.product-button');
  const quickViewPopup = document.querySelector('.product-quick-view__popup');
  const quickViewPopupOverlay  = document.querySelector('.product-quick-view__popup-overlay');
  const quickViewContainer = document.querySelector('.product-quick-view__container');
 

  quickViewButtons.forEach(quickViewButton => {
    quickViewPopupOverlay.addEventListener('click', ()=> quickViewPopup.classList.remove('active'));

    quickViewButton.addEventListener('click', async ()=>{
        quickViewPopup.classList.add('active');
        quickViewContainer.innerHTML = "<p>Loading...</p>"
        const productUrl = quickViewButton.dataset.productLink
        await openQuickView(productUrl);
        animateColorBackground();
    })
  });

async function openQuickView(handle) {
    const res = await fetch(`${handle}?sections=quick-view-product`);
    const data = await res.json();

    quickViewContainer.innerHTML = data['quick-view-product'];
    quickViewContainer.classList.add('active');
    const quickViewCloseButton = document.querySelector('.product-quick-view__close-button')
    if(quickViewCloseButton) {
            quickViewCloseButton.addEventListener('click', ()=> quickViewPopup.classList.remove('active'))
    };
}


function animateColorBackground(){
    const group = document.querySelector(".radio-group");
const slider = group.querySelector(".slider");
const labels = group.querySelectorAll("label");

function moveSlider(label) {
  slider.style.width = `${label.offsetWidth}px`;
  slider.style.transform = `translateX(${label.offsetLeft}px)`;
}

// init position (checked input)
const checked = group.querySelector("input:checked");
if (checked) {
  moveSlider(group.querySelector(`label[for="${checked.id}"]`));
}

// hover + click support (touch friendly)
labels.forEach(label => {
  label.addEventListener("mouseenter", () => moveSlider(label));
  label.addEventListener("click", () => moveSlider(label));
});
}
