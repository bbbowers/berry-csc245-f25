console.log("Hello Chicken Lovers");
const chickenDiv = document.getElementsByClassName("chickens")[0];

fetch("/api/chickens/").then((response) => 
    {return response.json()}).then((response) =>
        {for (i in response) {
            const chicken = response[i];
            const curChicken = document.createElement("div");
            curChicken.className = 'chicken';
            chickenDiv.append(curChicken);
            curChicken.style.backgroundColor = chicken['color'];
            curChicken.innerHTML = '<p class="name">'+chicken['name']+'</p>'
        }});