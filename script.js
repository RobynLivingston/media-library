
let mediaItems = [];

try {
    const stored = localStorage.getItem('mediaItems');
    if (stored) mediaItems = JSON.parse(stored);
} catch (e) {
    console.error("Error loading localStorage", e);
}

function saveToStorage() {
    localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
}

function displayGallery(items) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerText = `${item.type.toUpperCase()}: ${item.title}`;
        gallery.appendChild(div);
    });
}

function filterMedia() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const selectedTags = Array.from(document.querySelectorAll(".filter-checkbox:checked")).map(cb => cb.value);
    const filtered = mediaItems.filter(item => {
        const tagMatch = selectedTags.length === 0 || selectedTags.includes(item.type);
        const textMatch = item.title.toLowerCase().includes(term);
        return tagMatch && textMatch;
    });
    displayGallery(filtered);
}

function resetFilters() {
    document.querySelectorAll(".filter-checkbox").forEach(cb => cb.checked = false);
    document.getElementById("searchInput").value = "";
    filterMedia();
}

function showUploadModal() {
    document.getElementById("uploadModal").style.display = "block";
}

function hideUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
}

function addMedia() {
    const title = document.getElementById("mediaTitle").value;
    const type = document.getElementById("mediaType").value;
    if (!title) return alert("Title is required");
    mediaItems.push({ title, type });
    saveToStorage();
    hideUploadModal();
    filterMedia();
}

window.onload = () => {
    filterMedia();
};
