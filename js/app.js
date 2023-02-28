const cardContainer = document.getElementById('card-container');
const loadData = async (searchWord ='chicken', clicked) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`);
        const data = await res.json();
        if(clicked){
            displayAllData(data.meals);
        }else{
            displayData(data.meals);
        }

    } catch (error) {
        console.log(error)
    }
}
const displayData = (data) => {
    cardContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const element = data[i];
        createElement(element);
    }
}
const displayAllData = data => {
    cardContainer.innerHTML = '';
    for (const element of data) {
        createElement(element);
    }
}

const createElement = element => {
    const idMeal = element.idMeal;
    const div = document.createElement('div');
    // div.classList.add('card', 'mb-3');
    // div.setAttribute('style', 'max-width: 540px');
    div.innerHTML = `
        <div class="card mb-3 p-2">
            <div class="row mt-1 g-0 align-items-center">
                <div class="col-md-4">
                    <img src="${element.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                     <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text">
                                <a onclick="displayModal(${idMeal})" class="text-warning" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    View Details
                                </a>
                            </p>
                    </div>
                </div>
            </div></div>
        `;
    cardContainer.appendChild(div);
}
const showAll = () => {
    const searchField = document.getElementById('search-field');
    const searchWord = searchField.value;
    loadData(searchWord, true);
}
const displayModal = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => modalInfoUpdate(data.meals[0]))
        .catch(error => console.log(error));
}
const modalInfoUpdate = data => {
    document.getElementById('exampleModalLabel').innerText = data.strMeal;
    document.getElementById('modal-body').innerHTML = `
        <img src="${data.strMealThumb}" style="width:100%; height:250px; display:block; margin:auto;" class="w-">
        <p class="mt-2"><b>Category:</b> ${data.strCategory}</p>
        <p><b>Area:</b> ${data.strArea}</p>
        <p><b>Instructions:</b> ${data.strInstructions} </p>
        <p><b>Youtube:</b> <a href="${data.strYoutube}">${data.strYoutube}</a></p>
    `;
}

const search = () => {
    const searchField = document.getElementById('search-field');
    const searchWord = searchField.value;
    // searchField.value = '';
    loadData(searchWord);
}
loadData();