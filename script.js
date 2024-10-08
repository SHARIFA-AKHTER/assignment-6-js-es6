    //banner section
document.getElementById('view-more-button').addEventListener('click',function(){
    document.getElementById('adopt-section').scrollIntoView({behavior: 'smooth'});
})

// fetch and display category
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

// Call fetchCategories 
fetchCategories();