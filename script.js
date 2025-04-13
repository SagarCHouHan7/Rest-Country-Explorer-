let countriesContainer = document.querySelector(".countries-container");
let filterByRegion = document.querySelector(".filter-by-region")
let searchInput = document.querySelector(".search-container input")
let allCountriesData 
fetch("https://restcountries.com/v3.1/all")
    .then((res)=> res.json())
    .then((data)=>{
         allCountriesData = data
        renderCountries(data)
})


filterByRegion.addEventListener("change" , (e)=>{
   
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=> res.json())
    .then((data)=>{
        renderCountries(data)
     })
})

function renderCountries(data){
    
    countriesContainer.innerHTML = ""
    data.forEach((country) => {
        let newCountry = document.createElement("a");
        newCountry.classList.add("country-card");
        newCountry.href = `/country.html?name=${country.name.common}`;

        newCountry.innerHTML = ` <img src="${country.flags.svg}" alt="${country.name.common} Flag">
            <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString()}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital ? country.capital : "No Capital"}</p>
            
            </div>`;
        countriesContainer.append(newCountry);
        
    });
}

searchInput.addEventListener("input" , (e)=>{
    console.log(e.target.value)

    let filteredCountries = allCountriesData.filter((country)=>{
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })

    renderCountries(filteredCountries)

})

let bodyColor = document.querySelector("body");

let mode = localStorage.getItem('modeValue') || 'light';
if(mode == 'dark'){
    bodyColor.classList.add("dark-mode");
}

themeButton = document.querySelector(".header-content  p");

themeButton.addEventListener("click",()=>{
    bodyColor.classList.toggle("dark-mode");
    if(bodyColor.classList.contains("dark-mode"))
    localStorage.setItem('modeValue' , 'dark');
    else
    localStorage.setItem('modeValue' , 'light');
});

