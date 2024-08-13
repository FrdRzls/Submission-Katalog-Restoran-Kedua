import 'regenerator-runtime';
import './custom-element/header';
import './custom-element/footer';
import '../styles/main.css';
import swRegister from '../swRegister';

const toggleBtn = document.getElementById('toggleBtn');
const nav = document.querySelector('nav ul');
toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});

const restaurantListElement = document.getElementById('restaurant-list');

async function fetchData() {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function renderRestaurantList() {
  const restaurants = await fetchData();
  restaurantListElement.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('restaurant-card');
    restaurantCard.setAttribute('tabindex', 0);

    const restaurantImage = document.createElement('img');
    restaurantImage.src = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
    restaurantImage.alt = restaurant.name;
    restaurantImage.setAttribute('crossorigin', 'anonymous');

    const restaurantCity = document.createElement('h2');
    restaurantCity.textContent = `City: ${restaurant.city}`;

    const restaurantName = document.createElement('h3');
    restaurantName.textContent = restaurant.name;
    restaurantName.classList.add('restaurantName');

    const restaurantRating = document.createElement('h3');
    restaurantRating.innerHTML = `Rating: <span class="fas fa-star"></span> ${restaurant.rating}`;

    const restaurantDescription = document.createElement('p');
    restaurantDescription.textContent = restaurant.description;

    const detailLink = document.createElement('a');
    detailLink.textContent = 'View Details';
    detailLink.href = `detail.html?id=${restaurant.id}`;
    detailLink.classList.add('detail-link');

    restaurantCard.appendChild(restaurantImage);
    restaurantCard.appendChild(restaurantCity);
    restaurantCard.appendChild(restaurantName);
    restaurantCard.appendChild(restaurantRating);
    restaurantCard.appendChild(restaurantDescription);
    restaurantCard.appendChild(detailLink);

    restaurantListElement.appendChild(restaurantCard);
  });
}

document.addEventListener('DOMContentLoaded', renderRestaurantList);

const btnBackToTop = document.querySelector('.btn-back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnBackToTop.style.display = 'block';
  } else {
    btnBackToTop.style.display = 'none';
  }
});

btnBackToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

swRegister();
