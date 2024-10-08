    //banner section
document.getElementById('view-more-button').addEventListener('click',function(){
    document.getElementById('adopt-section').scrollIntoView({behavior: 'smooth'});
})

// section categories
const apiUrl = 'https://openapi.programming-hero.com/api/peddy/categories';
function fetchCategories() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
         
            const categoriesContainer = document.getElementById('categoriesContainer');

          
            //  categories and display buttons with icons
            categories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.classList.add('btn', 'w-[150px]', 'h-full', 'shadow-md', 'font-bold', 'flex',
                   'items-center');
                categoryButton.innerHTML = `              
                    <img src="${category.category_icon}" alt="${category.category}" 
                    class="w-10 h-10 ml-2">
                     <span>${category.category}</span>
                `;

                categoryButton.addEventListener('click', () => {
                    fetchPetsByCategory(category.category); 
                });

                categoriesContainer.appendChild(categoryButton);
            });
            
        })
       
}

function fetchCategories() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const categoriesContainer = document.getElementById('categoriesContainer');
            categories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.classList.add('btn', 'w-[150px]', 'h-full', 'shadow-md', 'font-bold', 'flex', 'items-center', 'bg-gray-100', 'hover:bg-gray-200', 'rounded-lg', 'px-4', 'py-2');
                categoryButton.innerHTML = `              
                    <img src="${category.category_icon}" alt="${category.category}" class="w-10 h-10 ml-2">
                    <span class="ml-2">${category.category}</span>
                `;

                categoryButton.addEventListener('click', () => {
                    fetchPetsByCategory(category.category);
                });

                categoriesContainer.appendChild(categoryButton);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Call fetchCategories 
fetchCategories();



// selected category
async function fetchPetsByCategory(category) { 
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json();
    
    const petsContainer = document.getElementById('pets-container');
    const errorImage = document.getElementById('error-image'); 

    petsContainer.innerHTML = ''; 
    errorImage.classList.add('hidden'); 
   
    if (data.data && data.data.length > 0) {

        if (category === 'birds') {
            birdImage.classList.remove('hidden'); 
        }
        const petsGrid = document.createElement('div');
        petsGrid.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4');

        data.data.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('bg-white', 'shadow-md', 'p-4', 'rounded-lg', 'w-full', 'h-auto', 'gap-4');
            petCard.innerHTML = `
                <div>
                    <img src="${pet.image}" alt="${pet.name}" class="w-full h-48 object-cover shadow-md mb-4">
                    <h2 class="text-2xl font-bold">${pet.breed}</h2>
                    <p><i class="fa-brands fa-elementor"></i> Breed: ${pet.breed}</p>
                    <p><i class="fa-solid fa-calendar-days"></i> Date of Birth: ${pet.date_of_birth || 'N/A'}</p>
                    <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender || 'N/A'}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price || 'N/A'}</p>
                    <div class="flex space-x-2 mt-2">
                        <button class="like-btn py-1 px-3 rounded shadow-md bg-blue-100 hover:bg-blue-200" data-pet-id="${pet.id}">
                            <i class="fa-regular fa-thumbs-up"></i> Like
                        </button>
                        <button class="adopt-btn text-[#0E7A81] py-1 px-3 rounded shadow-md bg-green-100 hover:bg-green-200">Adopt</button>
                        <button class="details-btn text-[#0E7A81] py-1 px-3 rounded shadow-md bg-yellow-100 hover:bg-yellow-200">Details</button>
                    </div>
                </div>
            `;
            petsGrid.appendChild(petCard);
        });

        petsContainer.appendChild(petsGrid);
    } else {
    
        if (category === 'bird') {
            errorImage.src = 'images/error.webp'; 
            errorImage.classList.remove('hidden'); 
        } else {
            petsContainer.innerHTML = '<p class="text-center text-xl">No pets available in this category.</p>';
        }
    }
}


fetchPetsByCategory('cat');


async function fetchPets() {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    

    const petsContainer = document.getElementById('pets-container');
  
    const likedPetsContainer = document.getElementById('liked-pets-container');
    const likedImagesContainer = document.getElementById('liked-images-container');
    petsContainer.innerHTML = '';
    
    likedImagesContainer.innerHTML = '';
    const likedPets = [];
    
    const petsGrid = document.createElement('div');
    petsGrid.classList.add( 
         'grid', 'grid-cols-1','md:grid-cols-2','lg:grid-cols-3','gap-4'
      );

    data.pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'shadow-md', 'p-4', 
            'rounded-lg', 'w-full', 'h-auto','gap-4'
        );


        // Set inner HTML for the pet card
        petCard.innerHTML = `
              <div>
                <img src="${pet.image}" alt="${pet.name}" class="w-full h-48 object-cover shadow-md mb-4">
                <h2 class="text-2xl font-bold">${pet.breed}</h2>
                <p><i class="fa-brands fa-elementor"></i> Breed: ${pet.breed}</p>
                <p><i class="fa-solid fa-calendar-days"></i> Date of Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                <div class="flex space-x-2 mt-2">
                    <button class="like-btn py-1 px-3 rounded shadow-md" data-pet-id="${pet.id}">
                        <i class="fa-regular fa-thumbs-up"></i> Like
                    </button>
                    <button class="adopt-btn text-[#0E7A81] py-1 px-3 rounded shadow-md">Adopt</button>
                    <button class="details-btn text-[#0E7A81] py-1 px-3 rounded shadow-md">Details</button>
                </div>
            </div>
            
        `;
     
        petsGrid.appendChild(petCard);

        const likeButton = petCard.querySelector('.like-btn');
        
        likeButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (!likedPets.includes(pet.id)) {
                likedPets.push(pet.id);

                const likedPetCard = document.createElement('div');
                likedPetCard.classList.add('bg-white', 'shadow-md', 'p-4', 'rounded-lg', 'w-[100%]', 'h-auto');
                likedPetCard.innerHTML = `
                    <img src="${pet.image}" alt="${pet.name}" class="w-[50%]
                     h-[70%] object-cover rounded mb-2">
                    <h3 class="text-xl font-bold">${pet.name}</h3>
                    <p class="text-sm">${pet.breed}</p>
                      <p class="text-sm">${pet.category}</p>
                      <p class="text-sm">${pet.price}</p>

                `;

           
                likedImagesContainer.appendChild(likedPetCard);

                likedPetsContainer.classList.remove('hidden');
            }
        });
    const detailsButton = petCard.querySelector('.details-btn');
    detailsButton.addEventListener('click', () => {
        openModal(pet); 
    });

    });

    petsContainer.appendChild(petsGrid); 
    


function openModal(pet) {
    document.getElementById('modal-pet-name').textContent = pet.name;
    document.getElementById('modal-pet-image').src = pet.image;
    document.getElementById('modal-breed').textContent = `Breed: ${pet.breed}`;
    document.getElementById('modal-date-of-birth').textContent = `Date of Birth: ${pet.date_of_birth}`;
    document.getElementById('modal-gender').textContent = `Gender: ${pet.gender}`;
    document.getElementById('modal-price').textContent = `Price: ${pet.price}`;

    document.getElementById('pet-modal').classList.remove('hidden');
}

// Function to close the modal
function closeModal() {
    document.getElementById('pet-modal').classList.add('hidden');
}


document.getElementById('last-close-modal').addEventListener('click', closeModal);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('pet-modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});

}
// Call the function on page load
fetchPets();
