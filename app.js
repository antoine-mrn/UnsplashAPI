const ACCESS_KEY = "IJtvbFBiIKcscxwffJWNFxPfX9z4IoF85YoMirQxaQ0"

// https://api.unsplash.com/search/collections?page=1&query=office

async function getImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=cat&client_id=${ACCESS_KEY}`)

        if(!response.ok) {
            throw new Error(`${response.status}`)
        }

        const data = await response.json();
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}

getImage()