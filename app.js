const ACCESS_KEY = "IJtvbFBiIKcscxwffJWNFxPfX9z4IoF85YoMirQxaQ0"
let pageIndex = 1
let research = "random"

const form = document.querySelector("form")
let searchInput = document.getElementById("search")

form.addEventListener("submit", researchImage)

function researchImage(e) {
    e.preventDefault()
    pageIndex = 1
    imagesContainer.textContent = ""
    research = searchInput.value
    populateUI()
}

const errorMessage = document.querySelector(".error-message")

async function getImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&query=${research}&client_id=${ACCESS_KEY}`)

        if(!response.ok) {
            throw new Error(`${response.status}`)
        }

        const data = await response.json()
        return data.results
    }
    catch (error) {
        errorMessage.textContent = error
    }
}

const imagesContainer = document.querySelector(".images-container")

async function populateUI() {

    const images = await getImage(research)
    if(!images.length) return errorMessage.textContent = "Whoops, aucune image trouvé avec cette recherche"

    images.forEach(image => {
        const newCard = document.createElement("div")
        newCard.innerHTML =
        `
        <div class="card">
            <img class="card-image" src="${image.urls.regular}" alt="${image.alt_description}" />
            <p class="card-credit">${image.user.name}</p>
        </div>
        `
        imagesContainer.appendChild(newCard)
    });
}

const observerBlock = document.querySelector(".observer-block")

const observer = new IntersectionObserver(handleIntersect, option = {rootMargin: "350px"})
observer.observe(observerBlock)

function handleIntersect(entries) {
    if(entries[0].isIntersecting) {
        pageIndex++
        populateUI()
    }
}

const scrollToTop = document.querySelector(".scroll-to-top")

scrollToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})