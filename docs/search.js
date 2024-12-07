document.addEventListener("DOMContentLoaded", function () {
    let searchIndex = [];

    const reponame = window.location.pathname.split("/")[1];
    const baseurl = window.location.origin + "/" + reponame;
    // Load the search index
    fetch(`${baseurl}/search-index.json`)
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(error => console.error("Error loading search index:", error));

    // Perform search on button click
    document.getElementById("search-btn").addEventListener("click", function () {
        const query = document.getElementById("search-input").value.toLowerCase();
        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = ""; // Clear previous results

        if (query.trim() === "") {
            resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.keywords.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement("div");
                resultItem.classList.add("search-result");
                resultItem.innerHTML = `
                    <a href="${baseurl + result.url}" target="_blank">${result.title}</a>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
        }

        document.getElementById("search-results").style.display = "block";
    });
});
