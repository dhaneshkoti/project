let cache = [];
let map = {};
let capacity = 3;

document.getElementById("capacity").addEventListener("change", function() {
    capacity = parseInt(this.value);
    cache = [];
    map = {};
    updateCacheDisplay();
});

function put() {
    let key = document.getElementById("key").value;
    let value = document.getElementById("value").value;
    
    if (!key || !value) return;

    if (map[key]) {
        cache = cache.filter(item => item.key !== key);
    } else if (cache.length >= capacity) {
        const removed = cache.pop();
        delete map[removed.key];
    }

    cache.unshift({ key, value });
    map[key] = value;
    updateCacheDisplay();
}

function get() {
    let searchKey = document.getElementById("searchKey").value;
    let resultDiv = document.getElementById("searchResult");

    if (map[searchKey]) {
        put(searchKey, map[searchKey]);
        resultDiv.innerHTML = `Search Result: ${map[searchKey]}`;
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerHTML = "Not Found";
        resultDiv.style.color = "red";
    }
}

function updateCacheDisplay() {
    let cacheContainer = document.getElementById("cache");
    cacheContainer.innerHTML = "";
    cache.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = `cache-item ${index === 0 ? "green" : "blue"}`;
        div.innerHTML = `${item.key}: ${item.value}`;
        cacheContainer.appendChild(div);
    });
}
