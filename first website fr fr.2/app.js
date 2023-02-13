const filters = document.querySelectorAll(".filter");
const aiList = document.getElementById("root");

fetch("AI-list.json")
  .then(res => res.json())
  .then(data => {
    let sortedData = data.sort((a, b) => (a.rank < b.rank) ? 1 : -1);
    let root = document.getElementById("root");
    let row = document.createElement("div");
    row.classList.add("row");
    sortedData.forEach((item, index) => {
      let div = document.createElement("div");
      div.classList.add("col-3", "item-container");
      div.setAttribute("data-category", item.Category.toLowerCase());
      div.innerHTML = `
        <h2>${item.Name}</h2>
        <p><strong>Category:</strong> ${item.Category}</p>
        <p><strong>Description:</strong> ${item.Description}</p>
        <p><strong>Website:</strong> <a href="${item.Website}" target="_blank">${item.Website}</a></p>
      `;
      row.appendChild(div);
      if ((index + 1) % 4 === 0 || index === sortedData.length - 1) {
        root.appendChild(row);
        row = document.createElement("div");
        row.classList.add("row");
      }
    });
  });

  document.getElementById("search-button").addEventListener("click", function() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let items = document.getElementsByClassName("item-container");
    
    Array.from(items).forEach(item => {
      let name = item.getElementsByTagName("h2")[0].innerText.toLowerCase();
      let category = item.getElementsByTagName("p")[0].innerText.toLowerCase();
      let description = item.getElementsByTagName("p")[1].innerText.toLowerCase();
      if (
        name.indexOf(searchValue) === -1 &&
        category.indexOf(searchValue) === -1 &&
        description.indexOf(searchValue) === -1
      ) {
        item.style.display = "none";
        if (item.parentNode.classList.contains("search-result")) {
          item.parentNode.remove();
        }
      } else {
        if (!item.parentNode.classList.contains("search-result")) {
          let result = document.createElement("div");
          result.classList.add("search-result");
          item.parentNode.insertBefore(result, item);
          result.appendChild(item);
        }
        item.style.display = "block";
      }
    });
  });

for (let i = 0; i < filters.length; i++) {
  filters[i].addEventListener("change", function() {
    let items = document.getElementsByClassName("item-container");
    let checkedFilters = [];
    for (let j = 0; j < filters.length; j++) {
      if (filters[j].checked) {
        checkedFilters.push(filters[j].value.toLowerCase());
      }
    }
    Array.from(items).forEach(item => {
      let category = item.getAttribute("data-category");
      if (checkedFilters.includes(category.toLowerCase())) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}
