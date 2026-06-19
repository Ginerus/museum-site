let currentImages = [];
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

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

// ===================== СВАЙПЫ ДЛЯ МОБИЛЬНЫХ =====================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    
    // Обработчик начала касания
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    // Обработчик окончания касания
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    // Обработчик движения (для отмены свайпа, если пользователь передумал)
    modal.addEventListener('touchmove', function(e) {
        // Если свайп слишком короткий - игнорируем
        const touch = e.changedTouches[0];
        const deltaX = touch.screenX - touchStartX;
        if (Math.abs(deltaX) > 50) {
            // Показываем визуальную обратную связь - легкое смещение изображения
            const offset = deltaX * 0.3;
            modalImg.style.transform = `translateX(${offset}px)`;
            modalImg.style.transition = 'none';
        }
    }, { passive: true });
    
    // Обработчик отмены касания (если палец убрали с экрана)
    modal.addEventListener('touchcancel', function() {
        // Возвращаем изображение на место
        modalImg.style.transform = 'translateX(0)';
        modalImg.style.transition = 'transform 0.3s ease';
    }, { passive: true });
    
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const minSwipeDistance = 50; // Минимальное расстояние для свайпа
        
        // Возвращаем изображение на место с анимацией
        modalImg.style.transform = 'translateX(0)';
        modalImg.style.transition = 'transform 0.3s ease';
        
        // Определяем направление свайпа
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX < 0) {
                // Свайп влево - следующее изображение
                nextImage();
            } else if (deltaX > 0) {
                // Свайп вправо - предыдущее изображение
                prevImage();
            }
        }
    }
});

// ===================== УПРАВЛЕНИЕ ГАЛЕРЕЕЙ =====================
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const images = gallery.querySelectorAll('img');
    const total = images.length;
    const visibleCount = 3; // Сколько показывать изначально
    
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
