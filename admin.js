/* $(function(){
    if ((!localStorage.getItem("products")) || (localStorage.getItem("products") == "[]") || (localStorage.getItem("products") == null)) {
        localStorage.setItem("products", convertJSON(OBJECTS));
    }

    main();
}) */

let priceDiff;
let notNeededKeys = ["eleres"];
let currentOrder = "ASC";
let orderKey;
let sortParams = {
    nev: "",
    ar: [0, 750000],
    kategoria: "",
}

function main() {
    rangeLisener();
    listItems(deconvertJSON(localStorage.getItem("products")));
    addNewItemButtonLisener();
    searchLisener();

    $("#addItemButton").on("click", () => {
        const NEW_ITEM_ADD = $("#addItemSection");

        if (NEW_ITEM_ADD.css("display") == "block") {
            NEW_ITEM_ADD.css("display", "none");
        } else {
            NEW_ITEM_ADD.css("display", "block");
        }
        
    });
}


function rangeLisener() {
    const RANGE_DOTS = $(".priceSelectorRange");
    
    changeMaxForPriceRange(RANGE_DOTS);

    priceDiff = getPriceAverage() / 2;

    RANGE_DOTS.off("input");

    RANGE_DOTS.on("input", (event) => {        
        if (event.target == RANGE_DOTS[0] && parseInt(RANGE_DOTS[1].value) - priceDiff < parseInt(event.target.value)) {
            event.target.value = parseInt(RANGE_DOTS[1].value) - priceDiff;
            return;
        }else if (event.target == RANGE_DOTS[1] && parseInt(RANGE_DOTS[0].value) + priceDiff > parseInt(event.target.value)) {
            event.target.value = parseInt(RANGE_DOTS[0].value) + priceDiff;
            return;
        }
        let min = RANGE_DOTS[0].value;
        let max = RANGE_DOTS[1].value;

        updateSliderValues(min, max);
        updateInputNumValues(min, max);
    });

}

function updateSliderValues(min, max) {
    const RANGE_MIN = $("#priceMin");
    const RANGE_MAX = $("#priceMax");
    const PROGRESS_BAR = $("#sliderFill");

    RANGE_MIN.attr("value", min);
    RANGE_MAX.attr("value", max);

    PROGRESS_BAR.css("left", (min / RANGE_MIN.attr("max")) * 100 + "%");
    PROGRESS_BAR.css("right", 100 - (max / RANGE_MAX.attr("max")) * 100 + "%");
}

function updateInputNumValues(min, max) {
    const RANGE_MIN = $("#priceMinNum");
    const RANGE_MAX = $("#priceMaxNum");

    RANGE_MIN.attr("value", min);
    RANGE_MAX.attr("value", max);
}

function changeMaxForPriceRange(RANGE_DOTS) {
    const MAX_PRICE = getMaxPrice();
    const PROGRESS_BAR = $("#sliderFill");

    const MIN_NUM_INPUT = $("#priceMinNum");
    const MAX_NUM_INPUT = $("#priceMaxNum");
    
    RANGE_DOTS[0].max = MAX_PRICE;
    RANGE_DOTS[0].value = 0;
    MIN_NUM_INPUT.attr("max", MAX_PRICE);
    MIN_NUM_INPUT.attr("value", 0);
    
    RANGE_DOTS[1].max = MAX_PRICE;
    RANGE_DOTS[1].value = MAX_PRICE;
    MAX_NUM_INPUT.attr("max", MAX_PRICE);
    MAX_NUM_INPUT.attr("value", MAX_PRICE);

    PROGRESS_BAR.css("left", 0);
    PROGRESS_BAR.css("right", 0);

    sortParams.ar[1] = MAX_PRICE;
}
function listItems(list) {
    if (list == null) {
        list = deconvertJSON(localStorage.getItem("products"));
    }
    const DIV = $("#datas");

    DIV.html(getTableWithItems(list));
    deleteButtonLisener();
    sortKeyLisener(list);

}


function getMaxPrice() {
    return Math.max.apply(Math, deconvertJSON(localStorage.getItem("products")).map( termek => {return termek.ar}));
}

function getPriceAverage() {
    let sum = 0;
    let list = deconvertJSON(localStorage.getItem("products"))

    $.each(list, function()  {
        sum += this.ar;
    });
    return parseInt(sum / list.length);
}

function getTableWithItems(products) {
    let code = `<table class="table table-hover"><tr>`;
    let headers = getHeaderTitles(products);

    products = sortItems(products);

    orderByKey(products);

    for (const key of headers) {
        code += `<th id="${key}">${key}</th>`;
    }
    code += "<tr>";

    for (const row of products) {
        code += "<tr>"

        for (const key of headers) {
            let data;

            if (!row[key]) {
                data = "-";
            } else {
                data = row[key];
            }

            code += `<td>${data}</td>`;
        }

        code += `<td><button id="Item-${row.id}">X</button></td></tr>`;

    }


    code += "</table>";
    return code;
}

function orderByKey(products) {
    if (!orderKey) {
        return; 
    }
    let orderOperator = currentOrder === "ASC" ? ">" : "<";

    for(let i = 0; i < products.length-1; i++) {
        for(let j = i+1; j < products.length; j++) {
            let conLeft = products[i][orderKey];
            let conRight = products[j][orderKey];
            if (conLeft == "" || conLeft == null) {
                conLeft = 0;
            }
            if (conRight == "" || conRight == null) {
                conRight = 0;
            }

            let condition = (typeof(conLeft) == "number") || (typeof(conLeft) == "int") ?
                            `${conLeft} ${orderOperator} ${conRight}` :
                            `"${conLeft}" ${orderOperator} "${conRight}"`;
            console.log(condition);
            if (eval(condition)) {
                let cs = products[i];
                products[i] = products[j];
                products[j] = cs;
            }
        }
    }
}

function sortItems(list) {
    let newList;
    let tempList = list;

    for (let searchType in sortParams) {
        newList = [];
        for (let item of tempList) {
            let searchParam = sortParams[searchType];
            if (String(searchParam) == "" || String(searchParam) == null) {
                newList.push(item);
            } else {

                if (String(searchType) == "ar") {
                    searchParam = sortParams[searchType];

                    if (searchParam.length == 0) {
                        continue;
                    }
                    if ( searchParam[0] <= item.ar && searchParam[1] >= item.ar) {
                        if (!newList.includes(item)) {
                            newList.push(item);
                        }
                    }

                } else {
                    if (String(item[searchType]).toLowerCase().indexOf(String(searchParam).toLowerCase()) >= 0) {
                        if (!newList.includes(item)) {
                            newList.push(item);
                        }

                    }
                }
            }
        }

        tempList = newList;
    }

    return newList;
}

function getHeaderTitles(products) {
    let headers = [];

    for (let i = 0; i < products.length; i++) {
        let keys = Object.keys(products[i]);
        for (const key of keys) {
            if (!(headers.includes(key)) && !(key.includes(notNeededKeys))) {
                headers.push(key);
            }
        }
    }
    return headers;
}

function removeItem(list, id) {
    let index = getItemIndexById(list, id);
    if (index < 0) {
        return;
    }
    list.splice(index, 1);
    localStorage.setItem("products", convertJSON(list));
}

function addItem(list) {
    const ITEM_NAME = $("#newItemName").val();
    const ITEM_CATEGORY = $("#newItemCategory").val();
    const ITEM_PRICE = $("#newItemPrice").val();

    if (ITEM_NAME == "" || ITEM_CATEGORY == "" || ITEM_PRICE == null) {
        return;
    }

    list.push({
        id: findMaxId(list) + 1,
        nev: ITEM_NAME, 
        kategoria: ITEM_CATEGORY,
        ar: ITEM_PRICE,
        eleres: null,
    });

    localStorage.setItem("products", convertJSON(list));
}

function getItemIndexById(list, id) {
    let i = 0;
    while (i < list.length && list[i].id != id) {
        i++;
    }
    return i < list.length ? i : -1;
}

function addNewItemButtonLisener() {
    const BUTTON = $("#newItemEnter");
    
    BUTTON.on("click", (event) => {
        event.preventDefault();
        addItem(deconvertJSON(localStorage.getItem("products")));
        listItems();

    });
}

function deleteButtonLisener() {
    const BUTTONS = $("article #datas button");
    
    BUTTONS.on("click", (event) => {
        let id = (event.target.id).split("-")[1];
        removeItem(deconvertJSON(localStorage.getItem("products")), id);
        listItems();

        BUTTONS.off("click");
    })
}

function sortKeyLisener(list) {
    const KEYS = $("article #datas th");

    KEYS.on("click", (event) => {
        if (orderKey == event.target.id) {
            if (currentOrder === "ASC") {
                currentOrder = "DESC";
            } else {
                currentOrder = "ASC";
            }
        } else {
            currentOrder = "ASC";
            orderKey = event.target.id;
        }

        KEYS.off("click");
        listItems(list);
    });
}

function searchLisener() {
    const SEARCH_INPUT = $("#search");
    const CATEGORY_INPUT = $("#kat")
    const PRICE_INPUT = $(".priceSelectorRange");

    SEARCH_INPUT.on("input", (event) => {
        sortParams.nev = SEARCH_INPUT.val();
        listItems();
    });

    CATEGORY_INPUT.on("input", (event) => {
        sortParams.kategoria = CATEGORY_INPUT.val();
        listItems();
    });

    PRICE_INPUT.on("input", (event) => {

        if (event.target.id == "priceMin") {
            sortParams.ar[0] = parseInt(event.target.value);
        } else {
            sortParams.ar[1] = parseInt(event.target.value);
        }
        listItems();
    })

}


function convertJSON(list) {
    return JSON.stringify(list);
}

function deconvertJSON(json) {
    return JSON.parse(json);
}


function findMaxId(list) {
    let max = 0;

    for (let i = 1; i < list.length; i++) {
        if (list[max].id < list[i].id) {
            max = i;
        }
    }
    return list[max].id;
}   