const gallery = document.getElementById("gallery");
const filterBtns = document.querySelectorAll(".filter-btn");
const viewBtns = document.querySelectorAll(".view-btn");
const searchInput = document.getElementById("searchInput");

const artworks = document.querySelectorAll(".artwork");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        filterBtns.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        const category = btn.dataset.filter;

        artworks.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

viewBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        viewBtns.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        gallery.className = "gallery";

        switch(btn.dataset.view){
            case "grid":
                gallery.classList.add("grid-view");
                break;

            case "masonry":
                gallery.classList.add("masonry-view");
                break;

            case "showcase":
                gallery.classList.add("showcase-view");
                break;
        }
    });
});

searchInput.addEventListener("keyup", () => {

    const term =
    searchInput.value.toLowerCase();

    artworks.forEach(card => {

        const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        card.classList.toggle(
            "hidden",
            !title.includes(term)
        );
    });
});

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

artworks.forEach(item => {

    item.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src =
        item.querySelector("img").src;
    });
});

document.querySelector(".close")
.addEventListener("click", () => {

    lightbox.style.display = "none";
});

lightbox.addEventListener("click", e => {

    if(e.target === lightbox){
        lightbox.style.display = "none";
    }
});