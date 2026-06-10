let currentImages = [];
let currentIndex = 0;

function openModal(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");

    // Собираем все скриншоты из галереи
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        currentImages = Array.from(gallery.querySelectorAll('img'));
    } else {
        currentImages = [img];
    }

    // Находим индекс текущего изображения
    currentIndex = currentImages.findIndex(image => image.src === img.src);
    if (currentIndex === -1) currentIndex = 0;

    modal.style.display = "flex";
    modalImg.src = currentImages[currentIndex].src;
}

function showImage(index) {
    const modalImg = document.getElementById("modalImg");
    if (index < 0) {
        currentIndex = currentImages.length - 1;
    } else if (index >= currentImages.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    modalImg.src = currentImages[currentIndex].src;
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

function closeModal() {
    document.getElementById("imgModal").style.display = "none";
}

// Закрытие по клику на фон
window.onclick = function(e) {
    const modal = document.getElementById("imgModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

// Клавиши ← → для навигации
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById("imgModal");
    if (modal.style.display !== "flex") return;

    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'Escape') {
        closeModal();
    }
});
