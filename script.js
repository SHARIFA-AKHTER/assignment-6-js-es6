      // solution 3
// const apiUrl = 'https://openapi.programming-hero.com/api/peddy/categories';

// // fetch and display the categories

// function fetchCategories() {
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         const categories = data.categories;
//         const categoriesContainer = document.getElementById('categoriesContainer');
  
//         // Loop through categories and display buttons with icons
//         categories.forEach(category => {
//           const categoryButton = document.createElement('button');
//           categoryButton.classList.add('btn', 'w-[150px]', 'h-full', 'shadow-md', 'font-bold', 'flex',
//             'items-center');
//           categoryButton.innerHTML = `
//             <span>${category.category}</span>
//             <img src="${category.category_icon}" alt="${category.category}" 
//             class="w-10 h-10 mt-2">
//           `;
//           categoriesContainer.appendChild(categoryButton);
//         });
//       })
//       .catch(error => console.error('Error fetching data:', error));



// Benner section

document.getElementById('view-more-button').addEventListener('click', function () {

    document.getElementById('adopt-section').scrollIntoView({ behavior: 'smooth' });
});

  const apiUrl = 'https://openapi.programming-hero.com/api/peddy/categories';
// Function to fetch and display categories
function fetchCategories() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const categoriesContainer = document.getElementById('categoriesContainer');

            // Loop through categories and display buttons with icons
            categories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.classList.add('btn', 'w-[150px]', 'h-full', 'shadow-md', 'font-bold', 'flex',
                   'items-center');
                categoryButton.innerHTML = `              
                    <img src="${category.category_icon}" alt="${category.category}" 
                    class="w-10 h-10 ml-2">
                     <span>${category.category}</span>
                `;

                // Add click event listener to fetch pets by category
                categoryButton.addEventListener('click', () => {
                    fetchPetsByCategory(category.category); 
                });

                categoriesContainer.appendChild(categoryButton);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Function to fetch pets by category
function fetchPetsByCategory(category) {
    const petsApiUrl = `https://openapi.programming-hero.com/api/peddy/pets?
    category=${category.toLowerCase()}`; 

    fetch(petsApiUrl)
        .then(response => response.json())
        .then(data => {
            const petsContainer = document.getElementById('pets-container');

            petsContainer.innerHTML = ''; 

            const pets = data.pets; 
            if (pets && pets.length > 0) {
                // Loop through pets and display them
                pets.forEach(pet => {
                    const petCard = document.createElement('div');
                    petCard.classList.add('pet-card', 'bg-white', 'shadow-lg',
                       'p-4', 'rounded-md', 'transition', 'transform', 
                       'hover:scale-105');
                    petCard.innerHTML = `
                      <h3 class="font-bold text-xl">${pet.pet_name}</h3>
                        <img src="${pet.image}" alt="${pet.pet_name}"
                         class="w-full h-40 object-cover rounded-lg mt-2">
                        <p class="mt-2">Breed: ${pet.breed}</p>
                        <p class="mt-1">Age: ${calculateAge(pet.date_of_birth)} years</p>
                        <p class="mt-1">Gender: ${pet.gender}</p>
                        <p class="mt-1">Vaccinated: ${pet.vaccinated_status}</p>
                    `;
                    petsContainer.appendChild(petCard);
                });
            }
             
        })
        .catch(error => console.error('Error fetching pets:', error));

}
// fetch('https://openapi.programming-hero.com/api/peddy/categories')
//   .then(response => response.json())
//   .then(data => {
//     const categories = data.data; // Assuming the categories are in 'data.data'
//     const categoryContainer = document.getElementById('categoriesContainer');

//    
//     categories.forEach(category => {
//       const button = document.createElement('button');
//       button.classList.add('bg-gray-200', 'rounded', 'p-4', 'flex', 'items-center', 'justify-center', 'hover:bg-gray-300');

//       // Create the image element
//       const img = document.createElement('img');
//       img.src = category.image; // Assuming 'category.image' holds the image URL
//       img.alt = category.name;  // Alt text for accessibility
//       img.classList.add('h-16', 'w-16', 'object-contain'); // Styling for the image size

//       // Append the image to the button
//       button.appendChild(img);

//       // Optional: You can add category name as a label
//       const label = document.createElement('span');
//       label.innerText = category.name;
//       label.classList.add('ml-2', 'text-gray-700', 'font-medium');
//       button.appendChild(label);

//       // Append the button to the container
//       categoryContainer.appendChild(button);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching categories:', error);
//   });

// Function to calculate age from date of birth
function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970); 
}
// Call fetchCategories 
fetchCategories();

      // solution 1

       // Function to fetch and display pets
       async function fetchPets() {
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await response.json();
        
        // Get the pets container
        const petsContainer = document.getElementById('pets-container');
        
        // Clear the container before displaying new data
        petsContainer.innerHTML = '';
        
        const petsGrid = document.createElement('div');
        petsGrid.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 
        'lg:grid-cols-3', 'gap-4');
        // Iterate through the pets data
        data.pets.forEach(pet => {
            // Create a card for each pet
            const petCard = document.createElement('div');
            petCard.classList.add('bg-white', 'shadow-md', 'p-4', 'rounded-lg','items-center');
            
            // Set inner HTML for the pet card
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" class="'w-[312px]','h-full'
                 object-cover shadow-md mb-4  >
                <h2 class="text-2xl font-bold">
                ${pet.breed} 
               
                </h2>
                <p> <i class="fa-brands fa-elementor"></i>
                 breed: ${pet.breed}</p>
                <p> <i class="fa-solid fa-calendar-days"></i>
                 date_of_birth: ${pet.date_of_birth}</p>
                <p> <i class="fa-solid fa-venus"></i>
                 gender: ${pet.gender}</p>
                <p> <i class="fa-solid fa-dollar-sign"></i>
                 price: ${pet.price}</p>
               
                 <div class="flex space-x-2 mt-2 ">
          <button class="like-btn py-1 px-3 rounded shadow-md ">
          <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="adopt-btn  text-[#0E7A81] py-1 px-3 
          rounded shadow-md">Adopt</button>
          <button class="details-btn text-[#0E7A81] py-1 px-3 
          rounded shadow-md">Details</button>
        </div>

            `;
            
              // Append the card to the pets grid
        petsGrid.appendChild(petCard);
        });
          // Create a container for the six images
     const imagesContainer = document.createElement('div');
     imagesContainer.classList.add('grid', 'grid-cols-1',
         'mt-4','w-[312px]','h-full');

    // Add six images to the imagesContainer (replace with your image URLs)
     for (let i = 0; i <= 0; i++) {
         const imgDiv = document.createElement('div');
         imgDiv.classList.add('bg-gray-200', 'p-4');

          const img = document.createElement('img');
        //  img.src = `side-image${i}.jpg`; 
        //  img.alt = `Image ${i}`;
        //  img.classList.add('w-full', 'h-48', 'object-cover');

        imgDiv.appendChild(img);
        imagesContainer.appendChild(imgDiv);
    }

    // Append both the pets grid and images container to the main pets container
    petsContainer.appendChild(petsGrid);
    petsContainer.appendChild(imagesContainer);
}

 // Call the function on page load
  fetchPets();
  

     

const petsContainer = document.getElementById('petsContainer');
const petModal = document.getElementById('petModal');
const closeModal = document.getElementById('closeModal');

// Elements to display pet details in the modal
const petImage = document.getElementById('pet-image');
const petName = document.getElementById('pet-name');
const petBreed = document.getElementById('pet-breed');
const petCategory = document.getElementById('pet-category');
const petDob = document.getElementById('pet-dob');
const petPrice = document.getElementById('pet-price');
const petGender = document.getElementById('pet-gender');
const petVaccinated = document.getElementById('pet-vaccinated');
const petDetails = document.getElementById('pet-details');

// Sample API data
const apiData = [
    {
        "petId": 1,
        "breed": "Golden Retriever",
        "category": "Dog",
        "date_of_birth": "2023-01-15",
        "price": 1200,
        "image": "https://i.ibb.co/p0w744T/pet-1.jpg",
        "gender": "Male",
        "pet_name": "Sunny",
        "vaccinated_status": "Fully",
        "pet_details": "This friendly male Golden Retriever is energetic and loyal..."
    },
   
];

// Function to display pet cards and details button
function displayPetCards() {
    petsContainer.innerHTML = '';

    apiData.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'shadow-md', 'rounded-md', 'p-4', 'text-center');

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-40 object-cover rounded-md mb-4">
            <h3 class="text-xl font-bold">${pet.pet_name}</h3>
            <p>${pet.breed}</p>
            <button class="detailsButton bg-blue-500 text-white mt-4 py-2 px-4 rounded-md">Details</button>
        `;

        // Add event listener to the "Details" button
        petCard.querySelector('.detailsButton').addEventListener('click', () => {
            showPetDetails(pet);
        });

        petsContainer.appendChild(petCard);
    });
}

// Function to show modal with pet details
function showPetDetails(pet) {
    petImage.src = pet.image;
    petName.textContent = pet.pet_name;
    petBreed.textContent = pet.breed;
    petCategory.textContent = pet.category;
    petDob.textContent = pet.date_of_birth;
    petPrice.textContent = `$${pet.price}`;
    petGender.textContent = pet.gender;
    petVaccinated.textContent = pet.vaccinated_status;
    petDetails.textContent = pet.pet_details;

    // Show the modal
    petModal.classList.remove('hidden');
}

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    petModal.classList.add('hidden');
});

// Display pet cards on page load
displayPetCards();

// async function fetchPets() {
//     const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
//     const data = await response.json();
    
//     // Get the pets container
//     const petsContainer = document.getElementById('pets-container');

//     // Clear the container before displaying new data
//     petsContainer.innerHTML = '';
    
//     // Create a grid container for pet cards
//     const petsGrid = document.createElement('div');
//     petsGrid.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 
//         'lg:grid-cols-3', 'gap-4',);

//     // Iterate through the pets data
//     data.pets.forEach(pet => {
//         // Create a card for each pet
//         const petCard = document.createElement('div');
//         petCard.classList.add('bg-white', 'shadow-md', 'p-4', 'rounded-lg');

//         // Set inner HTML for the pet card
//         petCard.innerHTML = `
//             <img src="${pet.image}" alt="${pet.name}" class="object-cover shadow-md mb-4">
//             <h2 class="text-2xl font-bold">${pet.breed}</h2>
//             <p><i class="fa-brands fa-elementor"></i> Breed: ${pet.breed}</p>
//             <p><i class="fa-solid fa-calendar-days"></i> Date of Birth: ${pet.date_of_birth}</p>
//             <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender}</p>
//             <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
//             <div class="flex space-x-2 mt-2">
//                 <button class="like-btn py-1 px-3 rounded shadow-md">
//                     <i class="fa-regular fa-thumbs-up"></i>
//                 </button>
//                 <button class="adopt-btn text-[#0E7A81] py-1 px-3 rounded shadow-md">Adopt</button>
//                 <button class="details-btn text-[#0E7A81] py-1 px-3 rounded shadow-md">Details</button>
//             </div>
//         `;

//         // Append the card to the pets grid
//         petsGrid.appendChild(petCard);
//     });

//     // Create a container for the six images
//     const imagesContainer = document.createElement('div');
//     imagesContainer.classList.add('grid', 'grid-cols-1', 'mt-4');

//     // Add six images to the imagesContainer (replace with your image URLs)
//     for (let i = 0; i <= 0; i++) {
//         const imgDiv = document.createElement('div');
//         imgDiv.classList.add('bg-gray-200', 'p-4');

//           const img = document.createElement('img');
//         //  img.src = `side-image${i}.jpg`; 
//         //  img.alt = `Image ${i}`;
//         //  img.classList.add('w-full', 'h-48', 'object-cover');

//         imgDiv.appendChild(img);
//         imagesContainer.appendChild(imgDiv);
//     }

//     // Append both the pets grid and images container to the main pets container
//     petsContainer.appendChild(petsGrid);
//     petsContainer.appendChild(imagesContainer);
// }

// // Call the function on page load
// fetchPets();