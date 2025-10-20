# Frontend-applikation för pizzeria
En frontend-applikation skapad för en pizzeria som skriver ut menyn och har ett kontaktformulär för att hantera frågor eller meddelanden från kunder [se publicerad applikation](https://pizzeriavenedig.netlify.app/). 
Den använder HTML, JavaScript, Parcel och SASS (SCSS), samt är kopplad till en RESTful webbtjänst. API:et erhåller data genom dokumentdatabasen MongoDB (se [API](https://projekt-api-73oa.onrender.com/api/menu) och [API repo](https://github.com/rare2400/projekt-api) ). 

## Funktioner
- Lista rätter i en meny
- Skicka in meddelanden/frågor
- SCSS för förbättrad struktur av CSS
- Kommunicerar med API via `fetch`:
```js
async function fetchMenu() {
    try {
        const response = await fetch("https://projekt-api-73oa.onrender.com/api/menu");

        if (response.ok) {
            const data = await response.json();
            dishes = data;
            displayMenu(dishes);
        } else {
            console.error("Fel vid hämtning:", error);
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
```

## Verktyg
- HTML5
- JavaScript
- Parcel
- SASS/SCSS
- REST-webbtjänst (eget API)

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/projekt-pizzeria.git
cd projekt-pizzeria
```

2. **Installera paket:**
```bash
npm install
```

3. **starta utvecklingsserver:**
```bash
npm run start
```

4. **Applikation körs på** `http://localhost:1234`

## Bygga för produktion
```bash
npm run build
```

## Skapad av
Skapad som en del av en projektuppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz      
[rare2400@student.miun.se](rare2400@student.miun.se)      
2025-10-20
