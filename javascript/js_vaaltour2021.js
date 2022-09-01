const gallery = document.getElementById('gallery');
const popup = document.getElementById('gallery-popup');
const selectedImage = document.getElementById('gallery-selected-image');

const imageIndexes = [1,2,3,4,5,6,7];
const selectedIndex = null;

imageIndexes.forEach((ind) => {
    const image = document.createElement('img');
    image.src = `/images/vaal-tour-2021/gallery-${ind}.jpg`;
    image.classList.add('gallery-img');
    
    image.addEventListener('click', () => {
        // on clicking the image, the image pops up
        popup.style.transform = `translateY(0)`;
        selectedImage.src = `/images/vaal-tour-2021/gallery-${ind}.jpg`;
    });
    gallery.appendChild(image);
});

popup.addEventListener('click', () => {
    // on clicking the popped-up, remove from center stage
    popup.style.transform = `translateY(-100%)`;
    selectedImage.src = '';
});
