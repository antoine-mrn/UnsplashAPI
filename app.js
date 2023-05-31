const ACCESS_KEY = "IJtvbFBiIKcscxwffJWNFxPfX9z4IoF85YoMirQxaQ0"
let pageIndex = 1

async function getImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&query=dog&client_id=${ACCESS_KEY}`)

        if(!response.ok) {
            throw new Error(`${response.status}`)
        }

        const data = await response.json();
        console.log(data)

        return data.results
    }
    catch (error) {
        console.log(error)
    }
}

const imagesContainer = document.querySelector(".images-container")

async function populateUI() {

    const images = await getImage()

    images.forEach(image => {
        const newCard = document.createElement("div")
        newCard.innerHTML =
        `
        <div class="card">
            <img class="card-image" src="${image.urls.full}" alt="${image.alt_description}" />
            <p class="card-credit">${image.user.name}</p>
        </div>
        `
        imagesContainer.appendChild(newCard)
    });
}

const observerBlock = document.querySelector(".observer-block")

const observer = new IntersectionObserver(handleIntersect, option = {rootMargin: "100px"})
observer.observe(observerBlock)

function handleIntersect(entries) {
    if(entries[0].isIntersecting) {
        pageIndex++
        populateUI()
    }
}
