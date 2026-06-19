let currentImages = [];
let currentIndex = 0;

function openModal(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");

    // Собираем все скриншоты из галереи (включая скрытые)
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

// ===================== УПРАВЛЕНИЕ ГАЛЕРЕЕЙ =====================
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const images = gallery.querySelectorAll('img');
    const total = images.length;
    const visibleCount = 3ч; // Сколько показывать изначально
    
    // Если изображений больше, чем visibleCount
    if (total > visibleCount) {
        // Скрываем все, начиная с visibleCount
        images.forEach((img, index) => {
            if (index >= visibleCount) {
                img.classList.add('hidden-gallery-item');
            }
        });
        
        // Настраиваем кнопку
        const btn = document.getElementById('toggleGalleryBtn');
        const hiddenCount = document.getElementById('hiddenCount');
        const hiddenTotal = total - visibleCount;
        hiddenCount.textContent = hiddenTotal;
        
        let isExpanded = false;
        
        btn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            images.forEach((img, index) => {
                if (index >= visibleCount) {
                    if (isExpanded) {
                        img.classList.remove('hidden-gallery-item');
                    } else {
                        img.classList.add('hidden-gallery-item');
                    }
                }
            });
            
            btn.innerHTML = isExpanded 
                ? `Скрыть` 
                : `Показать все (<span id="hiddenCount">${hiddenTotal}</span>)`;
        });
    } else {
        // Если изображений мало — скрываем кнопку
        const btn = document.getElementById('toggleGalleryBtn');
        if (btn) btn.style.display = 'none';
    }
});
