const URL_BASE = "https://platzi-avo.vercel.app";

const appNode =document.querySelector('#app');

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es-ES', { // esto sale de la api, da formato a las monedas
        style: 'currency',
        currency: 'EUR'
    }).format(price); // instanciamos de la api con new, aplicamos el metodo format con argumento price
    return newPrice; // retornamos el precio ya procesado, newPrice
}

const printItems = (items) => {

    const allItems = []; // aquí ira guardando los datos generados

    items.forEach(item => {
        //Crear imagen
        const imagen = document.createElement('img');
        imagen.src = `${URL_BASE}${item.image}`;

        //Crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = 'productName'; // esto sale de la documentación de tailwindcss.com, es el framework que estamos usando

        //crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = 'productPrice';
            
        //Crear un container
        const container = document.createElement('div');
        container.append(imagen, title, price); //agregamos todos nuestros datos al container

        allItems.push(container); // y agregamos el container a allItems
        
    });

    //Agregamos todo al contenedor principal
    appNode.append(...allItems);       
}

//Uso de fetch

const getData = async url => {
    try{
        const response     = await fetch(url);
        const data         = await response.json();
        const allAguacates = data.data;

        printItems(allAguacates); // llamamos a la funcion printItems con allAguacates

    }catch(error){
        console.log(error);
    }
}



getData(`${URL_BASE}/api/avo`);