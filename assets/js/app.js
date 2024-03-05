(() => {
    let allItems = ["Study Web Development Courses"];

    function populateTotalItems (count) {
        const totalElement = document.getElementById("total");
        totalElement.innerText = count;
    }

    function addNewItem(event) {
        event.preventDefault();

        const inputElement = document.querySelector("input");
        let newItem = inputElement.value;
    
        if(newItem) {
            allItems.unshift(newItem);
            populateItems(allItems.slice(0, 5));
            populateTotalItems(allItems.length);
            inputElement.value = "";
        }
        else {
            inputElement.classList.add("error-input");
        }
        toggleViewButton();
    }


    function populateItems(allItems) {
        const listsElement = document.getElementsByClassName("lists")[0];
        
        const allElements = [] ;
        allItems.forEach((item) => {
            allElements.push(`<div>
                <span>${item}</span>
                <input class="check-item" type="checkbox" >
            </div>`);
        });
        listsElement.innerHTML = allElements.join("");
        handleCheckbox();
    }

    function handleCheckbox() {
        const checkItems = document.querySelectorAll(".check-item");
        checkItems.forEach((checkItem) => {
            checkItem.addEventListener("click", (event) => {
                const checkElement = event.target;
                const itemValue = checkElement.parentElement.childNodes[1].textContent;
                allItems = allItems.filter((item) => item !== itemValue);
                populateItems(allItems);
                populateTotalItems(allItems.length);
            });
        })
    }

    

    function showAllItems(event) {
        populateItems(allItems);
        if (event.target.innerText === "View All") {
            populateItems(allItems);
            event.target.innerHTML = "View Less"
        }
        else {
            populateItems(allItems.slice(0, 5));
            event.target.innerHTML = "View All";
        }
    }

    function toggleViewButton() {
        if (allItems.length > 5) {
            document.getElementById("view-btn").style.display = "inline";
        }

        else{
            document.getElementById("view-btn").style.display = "none";
        }
        
    }
    
    document.querySelector("input").addEventListener("focus", () => {
        const inputElement = document.querySelector("input");
        inputElement.classList.remove("error-input");
    });
    document.getElementById("add_new_btn").addEventListener("click", addNewItem);
    document.getElementById("view-btn").addEventListener("click", showAllItems);
    toggleViewButton();
    populateItems(allItems);
})();