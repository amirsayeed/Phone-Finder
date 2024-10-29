const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('card-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //console.log(phones);
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    

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
             <div class="card-actions justify-center">
             <button onClick= "handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
             </div>
         </div>
         `;
         phoneContainer.appendChild(phoneCard);
    });
    toggleSpinner(false);
}

const handleShowDetail = async (id) => {
    //console.log('clicked show detail',id);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    //console.log(data);
    const phone = data.data;
    //console.log(phone);
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const showDetailPhoneName = document.getElementById('show_detail_phone_name');
    showDetailPhoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show_detail_container');
    showDetailContainer.innerHTML = `
    <img class='mx-auto mb-2' src='${phone.image}' alt=''/>
    <p><span><b>Storage:</b> ${phone?.mainFeatures?.storage}</span></p>
    <p><span><b>Display:</b> ${phone?.mainFeatures?.displaySize}</span></p>
    <p><span><b>Chipset:</b> ${phone?.mainFeatures?.chipSet}</span></p>
    <p><span><b>Memory:</b> ${phone?.mainFeatures?.memory}</span></p>
    <p><span><b>Slug:</b> ${phone?.slug}</span></p>
    <p><span><b>Release Date:</b> ${phone?.releaseDate}</span></p>
    <p><span><b>Brand:</b> ${phone?.brand}</span></p>
    <p><span><b>GPS:</b> ${phone?.others?.
                        GPS}</span></p>
    
    `;
    showDetails_modal.showModal();
}

const handleSearch = (isShowAll) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();