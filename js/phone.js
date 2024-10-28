const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones =>{
    const phoneContainer = document.getElementById('card-container');
    phoneContainer.textContent = '';
    console.log(phones);
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
         <figure>
             <img
             src='${phone.image}' />
         </figure>
         <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
             <div class="card-actions justify-end">
             <button class="btn btn-primary">Buy Now</button>
             </div>
         </div>
         `;
         phoneContainer.appendChild(phoneCard);
    });
}

const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText);
}
loadPhone();