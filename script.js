document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS DOS SERVIÇOS/ÁLBUNS ---
    const albumsData = [
        { category: "casamento", client: "Geisse & Luis", type: "Casamento", photos: 42, folder: "geisse_e_luis", coverPhoto: "FOTOS-7.jpg" },
        { category: "casamento", client: "Marina & Lucas", type: "Casamento", photos: 128, folder: "marina_e_lucas", coverPhoto: "FOTOS-55.jpg" },
        { category: "gestante", client: "Amanda", type: "Gestante", photos: 25, folder: "amanda_gestante", coverPhoto: "FOTOS-13.jpg" },
        { category: "gestante", client: "Sara", type: "Gestante", photos: 22, folder: "sara_gestante", coverPhoto: "FOTOS-1.jpg" },
        { category: "aniversario", client: "Calebe 1 Ano", type: "Aniversário", photos: 67, folder: "calebe_1ano", coverPhoto: "FOTOS-59.jpg" },
        { category: "aniversario", client: "Stella 1 Ano", type: "Aniversário", photos: 46, folder: "stella_1ano", coverPhoto: "FOTOS-32.jpg" },
        { category: "ensaio_formatura", client: "Luana - Ensaio", type: "Ensaio Formatura", photos: 30, folder: "luana_formatura", coverPhoto: "FOTOS-1.jpg" },
        { category: "ensaio", client: "Calebe - 1 Ano", type: "Ensaio Fotográfico", photos: 40, folder: "calebe_ensaio", coverPhoto: "FOTOS-5.jpg" },
        { category: "ensaio", client: "Lucas & Maria", type: "Ensaio Pré-Wedding", photos: 26, folder: "ensaio_lucas_e_maria", coverPhoto: "FOTOS-1.jpg" },
        { category: "casamento", client: "Keth & Samuel", type: "Casamento", photos: 30, folder: "keth_samuel_casamento", coverPhoto: "FOTOS-1.jpg" },
        { category: "ensaio_formatura", client: "Thauan - Ensaio", type: "Ensaio Formatura", photos: 30, folder: "thauan_formatura", coverPhoto: "FOTOS-1.jpg" },
        { category: "ensaio_formatura", client: "Gislene - Ensaio", type: "Ensaio Formatura", photos: 30, folder: "gislene_formatura", coverPhoto: "FOTOS-1.jpg" },


        
    ];

    const albumsGrid = document.getElementById('albumsGrid');
    const galleryModal = document.getElementById('galleryModal');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryGrid = document.getElementById('galleryGrid');
    const closeBtn = document.getElementById('closeBtn');

    function renderAlbums() {
        if (!albumsGrid) return;
        albumsGrid.innerHTML = '';
        albumsData.forEach(album => {
            const card = document.createElement('div');
            card.className = 'album-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105';
            card.dataset.client = album.client;
            card.innerHTML = `
                <div class="relative">
                    <div class="card-cover-container">
                        <img src="images/${album.folder}/${album.coverPhoto}" alt="Capa do álbum ${album.client}" class="card-cover-image">
                    </div>
                    <div class="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">${album.photos} fotos</div>
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-xl font-bold mb-1 text-brand-dark">${album.client}</h3>
                    <p class="text-gray-500">${album.type}</p>
                </div>
            `;
            albumsGrid.appendChild(card);
        });
    }

    function openGallery(clientName) {
        const albumData = albumsData.find(a => a.client === clientName);
        if (!albumData) return;
        galleryTitle.textContent = `${albumData.client} - ${albumData.type}`;
        galleryGrid.innerHTML = '';
        for (let i = 1; i <= albumData.photos; i++) {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${albumData.folder}/FOTOS-${i}.jpg`;
            imgElement.alt = `${albumData.type} - ${albumData.client} - Foto ${i}`;
            imgElement.className = 'w-full h-full object-cover rounded-lg';
            imgElement.loading = 'lazy';
            const photoContainer = document.createElement('div');
            photoContainer.className = 'gallery-photo-item';
            photoContainer.appendChild(imgElement);
            galleryGrid.appendChild(photoContainer);
        }
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    if (albumsGrid) {
        albumsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.album-card');
            if (card && card.dataset.client) {
                openGallery(card.dataset.client);
            }
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.dataset.filter;
            const allCards = document.querySelectorAll('.album-card');
            allCards.forEach(card => {
                const album = albumsData.find(a => a.client === card.dataset.client);
                if (album) {
                    card.style.display = (filterValue === 'todos' || album.category === filterValue) ? 'block' : 'none';
                }
            });
        });
    });

    function closeModal() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    closeBtn.addEventListener('click', closeModal);
    galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && galleryModal.style.display === 'block') closeModal(); });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });

    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (!mobileMenu.classList.contains('hidden')) { mobileMenu.classList.add('hidden'); }
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    sections.forEach(section => observer.observe(section));

    renderAlbums();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const phoneNumber = '554135380711';
            const name = document.getElementById('name').value;
            const eventType = document.getElementById('event-type').value;
            const message = document.getElementById('message').value;
            const whatsappMessage = `Olá, Allana! \nMeu nome é *${name}*.\nGostaria de um orçamento para: *${eventType}*.\n\nMensagem:\n${message}`;
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
        });
    }

    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
        swiperWrapper.addEventListener('click', (e) => {
            if (!e.target.closest('.swiper-button-next') && !e.target.closest('.swiper-button-prev')) {
                swiper.slideNext();
            }
        });
    }

}); // Fim do 'DOMContentLoaded'