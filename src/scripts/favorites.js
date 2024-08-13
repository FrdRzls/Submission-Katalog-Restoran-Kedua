import './custom-element/header';
import './custom-element/footer';
import '../styles/favorites.css';
import swRegister from '../swRegister';

document.addEventListener('DOMContentLoaded', () => {
  const favoriteList = document.querySelector('.restaurant-list');
  const menuToggle = document.querySelector('.toggle-btn');
  const menu = document.querySelector('#drawer ul');

  if (menuToggle && !menuToggle.listenerAdded) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
    menuToggle.listenerAdded = true;
  }

  async function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('restaurants', 1);

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('favorites', { keyPath: 'id' });
        objectStore.createIndex('id', 'id', { unique: true });
      };
    });
  }

  async function closeDatabase(db) {
    db.close();
  }

  async function removeFavoriteRestaurant(restaurantId) {
    const db = await openDatabase();
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    objectStore.delete(restaurantId);
    await transaction.complete;
    await closeDatabase(db);
  }

  async function fetchDataFromIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('restaurants', 1);

      request.onerror = function handleOpenError() {
        reject(request.error);
      };

      request.onsuccess = function handleSuccess() {
        const db = request.result;
        const transaction = db.transaction('favorites', 'readonly');
        const store = transaction.objectStore('favorites');
        const getAllRequest = store.getAll();

        getAllRequest.onerror = function handleGetAllError() {
          reject(getAllRequest.error);
        };

        getAllRequest.onsuccess = function handleGetAllSuccess() {
          resolve(getAllRequest.result);
        };
      };
    });
  }

  async function createFavoriteRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.classList.add('restaurant-card');
    card.setAttribute('tabindex', 0);

    const image = document.createElement('img');
    image.src = restaurant.pictureId;
    image.alt = restaurant.name;

    const name = document.createElement('h3');
    name.textContent = restaurant.name;

    const city = document.createElement('h2');
    city.textContent = `City: ${restaurant.city}`;

    const rating = document.createElement('h4');
    rating.innerHTML = `Rating: <span class="fas fa-star"></span> ${restaurant.rating}`;

    const description = document.createElement('p');
    description.textContent = restaurant.description;

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.addEventListener('click', async () => {
      await removeFavoriteRestaurant(restaurant.id);
      card.remove();
    });

    const detailLink = document.createElement('a');
    detailLink.innerHTML = '<i class="fas fa-info-circle"></i>';
    detailLink.href = `detail.html?id=${restaurant.id}`;
    detailLink.classList.add('detail-link');

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(city);
    card.appendChild(rating);
    card.appendChild(description);
    card.appendChild(detailLink);
    card.appendChild(removeButton);

    return card;
  }

  async function renderFavoriteRestaurantList() {
    try {
      const favoriteRestaurants = await fetchDataFromIndexedDB();
      favoriteList.innerHTML = '';
      favoriteRestaurants.forEach(async (restaurant) => {
        const updatedRestaurant = {
          ...restaurant,
          pictureId: `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`,
        };

        try {
          const card = await createFavoriteRestaurantCard(updatedRestaurant);
          favoriteList.appendChild(card);
        } catch (error) {
          console.error('Gagal membuat kartu restoran favorit:', error);
        }
      });
    } catch (error) {
      console.error('Gagal merender daftar restoran favorit:', error);
    }
  }

  renderFavoriteRestaurantList().catch((error) => {
    console.error('Gagal merender daftar restoran favorit:', error);
  });

  const btnBackToTop = document.querySelector('.btn-back-to-top');

  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnBackToTop.style.display = 'block';
    } else {
      btnBackToTop.style.display = 'none';
    }
  });
});

swRegister();
