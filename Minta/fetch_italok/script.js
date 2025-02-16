const kokteltKerek=document.getElementById("koktelt-kerek");

kokteltKerek.addEventListener('click',fetchCocktails);

async function fetchCocktails(){
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const cocktail = await response.json();
        displayCocktail(cocktail);
    } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
    }
}

function displayCocktail(cocktail){
    const drink=cocktail.drinks[0];

    const kep=document.getElementById("ital-kep");
    const neve=document.getElementById("ital-neve");
    const leirasa=document.getElementById("ital-leirasa");
    const recept=document.getElementById("ital-recept");

    kep.src=drink.strDrinkThumb;
    neve.textContent=drink.strDrink;
    leirasa.textContent=drink.strInstructions;

    recept.innerHTML="";
    for (let index = 1; index <= 15; index++){
        const hozzavalo=drink[`strIngredient${index}`];
        const mennyiseg=drink[`strMeasure${index}`];

        if(hozzavalo && mennyiseg){
            const div=document.createElement('div');
            div.className="fs-6";   
            div.textContent=`- ${hozzavalo}: ${mennyiseg} `;
            recept.append(div);
        }
    }
}