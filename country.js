let countryName = new URLSearchParams(location.search).get('name');


let requiredHTML = []
let countryDetails = document.querySelector(".country-details");


async function getCountryDetails() {
    

try{
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then((data)=>{
    const country = data[0];
  
    


console.log(requiredHTML)

    countryDetails.innerHTML = ` <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="details-text-container">
                <h1>${country.name.common}</h1>
                <div class="details-text">
                <p><b>Native Name: </b>${ country.name.nativeName?Object.values(country.name.nativeName)[0].official : "Null" }</p>
                 <p><b>Population: </b>${country.population.toLocaleString()}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Sub Region: </b>${country.subregion}</p>
                <p><b>Capital: </b>${country.capital? country.capital : "No Capital"}</p>
                
                <p><b>Top Level Domain: </b>${country.tld}</p>

                <p><b>Language: </b>${country.languages? Object.values(country.languages).join(", ") : "No Language"}</p>
                </div>
                <div class="border-countries">
                    <p><b>Border Countries: &nbsp;&nbsp;</b> <span class="border-country-link">
 
                     </span>
                    </p>
                </div>
 </div>`

 let borderCountriesContainer = document.querySelector(".border-country-link")
 if(country.borders){

    console.log(country.borders)
  
     country.borders.forEach((neighbourCountryCode) => {
        
        fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountryCode}`)
            .then(res => res.json())
            .then((neighbour)=>{
               
                let neighbourArray = [...neighbour]
              

                const countryBorderTag = document.createElement("a")

                countryBorderTag.innerText = `${neighbourArray[0].name.common}`
                countryBorderTag.href = `/country.html?name=${neighbourArray[0].name.common}`

                console.log(countryBorderTag)

                borderCountriesContainer.append(countryBorderTag)
                
                
            })
            
        });
     
}
else{
    const countryBorderTag = document.createElement("span")

                countryBorderTag.innerText = `No Border Shared`
                
                console.log(countryBorderTag)

                borderCountriesContainer.append(countryBorderTag)
}

})
}
catch(exception){
    countryDetails.innerHTML = `<h1>Enable to fetch Data</h1>`;
}

}

getCountryDetails()

let backButton = document.querySelector(".back-button")

backButton.addEventListener( "click" ,()=>{
    history.back()
})





// dark mode 

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


