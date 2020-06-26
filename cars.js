const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const imageList = ["https://lkjlskdfj.net/wp-content/uploads/2017/04/expensive-car-735x400.jpg" , "https://i.ytimg.com/vi/jdNkbl3NXUc/hqdefault.jpg", "https://i.pinimg.com/originals/6f/cd/fa/6fcdfab82d95335bfe3201ee65a8499c.jpg" , "https://live.staticflickr.com/1925/45379653941_8973dee305_b.jpg"];

const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
};
// console.log(displayFunctions)


function generateCars(numberOfCars, isArray) { //return array with Cars ( each car is an object in JS)
    if (typeof numberOfCars !== 'number') return;
    const cars = isArray ? [] : {};
    for (let index = 0; index < numberOfCars; index++) {
        if (isArray) cars.push(generateSingleCar(index))
        else {
            const singleCar = generateSingleCar(index)
            cars[singleCar.lp.toString()] = singleCar;
        }
    }
    return cars;
}

function generateSingleCar(index) {
    return {
        lp: _generateLP(),
        color: _generateColor(),
        type: _generateType(),
        doors: _generateDoors(),
        isSunRoof: _isSunRoof(index),
        image: _generateImages(),
    };


    function _generateLP() {
        return Math.ceil(Math.random() * 999999);
    }
    function _generateColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function _generateDoors() {
        return doors[Math.floor(Math.random() * doors.length)];
    }
    function _isSunRoof(index) {
        return index % 2 === 0 ? true : false
    }
    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }
    function _generateImages(){
        return imageList[Math.floor(Math.random() * imageList.length)];
    }
    
}

// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..


(function () {
    const cars = generateCars(100, true)
    DOM.listData = document.getElementById("data");
    DOM.cardsData = document.getElementById("data-cards");
    DOM.tableData = document.getElementById("data-table")
    draw(cars, DOM.listData, "list");

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    const tableViewButton = document.getElementById("tableView");
    listViewButton.addEventListener("click", function () {
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        draw(cars, DOM.cardsData, "cards")
    })
    tableViewButton.addEventListener("click", function() {
        draw(cars, DOM.tableData, "table")
    })
}())


function draw(data, domContainer, displayType) {
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    data.forEach(car => {
        domContainer.append(displayFunction(car))
    });
}

function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
    DOM.tableData.innerHTML = "";
}
function getListItem(carData) {
    const listItem = document.createElement("li");
    const img = document.createElement("img");
    img.style.height ="80px"
    img.style.width ="80px"
    img.src = `${carData.image}`
    img.style.position = "absolute";
    img.style.right ="80px"

    listItem.style.height = "120px"
    listItem.classList.add("list-group-item");
    listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}, type: ${carData.type}`;
    listItem.style.marginBottom = "5px";

    if( `${carData.color}` === "black"){
    listItem.classList.add("list-group-item-secondary");
    }
    else if(`${carData.color}` === "red"){
        listItem.classList.add("list-group-item-danger");
    }
    else if(`${carData.color}` === "yellow"){
        listItem.classList.add("list-group-item-warning");
    }
    else if(`${carData.color}` === "green"){
        listItem.classList.add("list-group-item-success");
    }

    listItem.appendChild(img)

    return listItem;
}

function getCardItem(carData) {
    const card = document.createElement("div");
    const img = document.createElement("img");
    card.style.border = "1px solid black";
    card.style.height = "200px";
    card.style.width = "300px";
    card.style.display = "inline-block";
    card.style.textAlign = "center"
    card.style.paddingTop = "30px"

    img.style.height ="80px"
    img.style.width ="80px"
    img.src = `${carData.image}`
    img.style.position = "absolute"
    img.style.bottom = "110px"
    img.style.right = "10px"
    card.innerText = `car lp: ${carData.lp},

     car color: ${carData.color},

      type: ${carData.type}`;

    card.style.margin = "15px";
    card.classList.add("text-white");
    card.classList.add("mb-3");
    card.classList.add("card");
    

    if(`${carData.color}` === "black"){
    
    card.classList.add("bg-secondary");
    }
    else if (`${carData.color}` === "red")
    {
        card.classList.add("bg-danger");
     }
     else if (`${carData.color}` === "yellow"){
         card.classList.add("bg-warning");
     }
     else if( `${carData.color}` === "green"){
        card.classList.add("bg-success");

     }
    
    card.appendChild(img)
    return card;
}
function getRowItem(carData) {
    
   const tableBody = document.getElementById("data-table");
   
   const row = document.createElement ("tr");
   const cellLp = document.createElement("td");
   const cellColor = document.createElement("td");
   const cellType = document.createElement("td");
   const cellDoors = document.createElement("td");
   const cellImage = document.createElement("td");
   const cellTextLP = document.createTextNode(`${carData.lp}`);
   const cellTextColor = document.createTextNode(`${carData.color}`);
   const cellTextType = document.createTextNode(`${carData.type}`);
   const cellTextDoors = document.createTextNode(`${carData.doors}`);
   const img = document.createElement("img");
   img.src = `${carData.image}` ;
   img.style.height = "80px";
   img.style.width = "80px";


   cellLp.appendChild(cellTextLP);
   row.appendChild(cellLp);
   cellColor.appendChild(cellTextColor);
   row.appendChild(cellColor);
   cellType.appendChild(cellTextType);
   row.appendChild(cellType); 
   cellDoors.appendChild(cellTextDoors);
   row.appendChild(cellDoors);
   cellImage.appendChild(img);
   row.appendChild(cellImage); 
   tableBody.appendChild(row); 
   
    
    

 }
