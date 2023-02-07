fetch("AI-list.json")
  .then(res => res.json())
  .then(data => {
    let sortedData = data.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
    let root = document.getElementById("root");
    let row = document.createElement("div");
    row.classList.add("row");
    sortedData.forEach((item, index) => {
      let div = document.createElement("div");
      div.classList.add("col-3", "item-container");
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
    } else {
      item.style.display = "block";
    }
  });
});

// Get the category buttons and the AI tools list
const categoryButtons = document.querySelectorAll('.category-button');
const AIlist = document.querySelector('.AI-list');

// Add click event to each category button
categoryButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all category buttons
    categoryButtons.forEach(button => {
      button.classList.remove('active');
    });

    // Add active class to the clicked category button
    this.classList.add('active');

    // Get the category from the clicked button
    const category = this.getAttribute('data-category');

    // Show only the AI tools with the selected category
    AIlist.querySelectorAll('.AI-tool').forEach(tool => {
      if (tool.getAttribute('data-category') === category || category === 'all') {
        tool.style.display = 'block';
      } else {
        tool.style.display = 'none';
      }
    });
  });
});