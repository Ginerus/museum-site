let currentImages = [];
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

/* ---------- МОДАЛКА ---------- */
function openModal(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const gallery = document.querySelector('.gallery');

    currentImages = gallery ? Array.from(gallery.querySelectorAll('img')) : [img];
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

function nextImage() { showImage(currentIndex + 1); }
function prevImage() { showImage(currentIndex - 1); }

function closeModal() {
    document.getElementById("imgModal").style.display = "none";
}

window.onclick = function(e) {
    const modal = document.getElementById("imgModal");
    if (e.target === modal) modal.style.display = "none";
}

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById("imgModal");
    if (modal.style.display !== "flex") return;

    if (e.key === 'ArrowLeft') prevImage();
    else if (e.key === 'ArrowRight') nextImage();
    else if (e.key === 'Escape') closeModal();
});

/* ---------- СВАЙПЫ ---------- */
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    if (!modal || !modalImg) return;

    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    modal.addEventListener('touchmove', function(e) {
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(deltaX) > 50) {
            modalImg.style.transform = `translateX(${deltaX * 0.3}px)`;
            modalImg.style.transition = 'none';
        }
    }, { passive: true });

    modal.addEventListener('touchcancel', function() {
        modalImg.style.transform = 'translateX(0)';
        modalImg.style.transition = 'transform 0.3s ease';
    }, { passive: true });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        modalImg.style.transform = 'translateX(0)';
        modalImg.style.transition = 'transform 0.3s ease';

        if (Math.abs(deltaX) > 50) {
            deltaX < 0 ? nextImage() : prevImage();
        }
    }
});

/* ---------- ГАЛЕРЕЯ ---------- */
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const images = gallery.querySelectorAll('img');
    const total = images.length;
    const visibleCount = 3;

    if (total > visibleCount) {
        images.forEach((img, index) => {
            if (index >= visibleCount) img.classList.add('hidden-gallery-item');
        });

        const btn = document.getElementById('toggleGalleryBtn');
        const hiddenCount = document.getElementById('hiddenCount');
        const hiddenTotal = total - visibleCount;
        hiddenCount.textContent = hiddenTotal;

        let isExpanded = false;

        btn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            images.forEach((img, index) => {
                if (index >= visibleCount) {
                    img.classList.toggle('hidden-gallery-item', !isExpanded);
                }
            });
            btn.innerHTML = isExpanded
                ? `Скрыть`
                : `Показать все (<span id="hiddenCount">${hiddenTotal}</span>)`;
        });
    } else {
        const btn = document.getElementById('toggleGalleryBtn');
        if (btn) btn.style.display = 'none';
    }
});

/* ---------- DROPDOWN (единый блок) ---------- */
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('serverDropdown');
    if (!dropdown) return;

    const btn = dropdown.querySelector('.btn.server');

    // Тап на мобильных — переключение меню
    btn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('open');
        }
    });

    // Закрытие при выборе пункта
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            dropdown.classList.remove('open');
        });
    });

    // Закрытие при клике вне дропдауна
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});
