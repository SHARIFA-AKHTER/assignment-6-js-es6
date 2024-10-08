    //banner section
document.getElementById('view-more-button').addEventListener('click',function(){
    document.getElementById('adopt-section').scrollIntoView({behavior: 'smooth'});
})

// category item
const apiUrl = 'https://openapi.programming-hero.com/api/peddy/categories';
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