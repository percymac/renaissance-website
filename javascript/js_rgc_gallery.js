const gallery = document.getElementById('gallery');
const popup = document.getElementById('gallery-popup');
const selectedImage = document.getElementById('gallery-selected-image');

const imageIndexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const selectedIndex = null;

imageIndexes.forEach((ind) => {
    const image = document.createElement('img');
    image.src = `/images/gallery/gallery-${ind}.jpg`;
    image.classList.add('gallery-img');
    
    image.addEventListener('click', () => {
        // on clicking the image, the image pops up
        popup.style.transform = `translateY(0)`;
        selectedImage.src = `./images/gallery/gallery-${ind}.jpg`;
    });
    gallery.appendChild(image);
});

popup.addEventListener('click', () => {
    // on clicking the popped-up, remove from center stage
    popup.style.transform = `translateY(-100%)`;
    selectedImage.src = '';
});
