window.browser = (() => window.msBrowser || window.browser || window.chrome)();


let isExtensionOn = true;

container = document.createElement("div")
container.innerHTML = '<div>Lignende gjenstander <span id="similar-item-label"></span></div><div style="float: right;position: absolute;right: 40px;top: 10px;">[<a id="close-similar">x</a>]</div><div id="similar-items"><div>'
container.setAttribute("style", "display:none; overflow:hidden; text-align: center;background: #3d3f41;height: 240px;width: 100%;z-index: 100;position: absolute;bottom: 0;color: #a8aaad;font-family: Sans Serif;font-weight: bold;padding: 1em;")
document.body.append(container)

document.getElementById("close-similar").addEventListener("click", event => {
    container.style.display = "none"
})

function enable() {

    document.querySelectorAll("a.no-link:not(.similarity)").forEach(elem => {
        let sim = document.createElement("span")
        let id = elem.getAttribute("data-id")
        let index
        if (document.location.search.includes(encodeURI("bilder"))) {
            index = "images.knn"
        } else if (document.location.search.includes(encodeURI("bøker"))) {
            index = "books.knn"
        }
        if (!index) return
        container.setAttribute("data-selected", id)
        sim.classList.add("similarity-link")
        sim.setAttribute("style", "display: inline-flex; cursor: pointer;")
        sim.innerHTML = '<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">scatter_plot</mat-icon> <span style="margin-left: 1px; padding-top: 0.16em;">Lignende gjenstander</span>'
        sim.addEventListener("click", function() {
            document.getElementById("similar-item-label").innerHTML = `: "${elem.querySelector("h3.title").textContent}"`
            let params = {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    value: id,
                    scale_from: [0.98, 1],
                    scale_to: [0, 10]
                }),
                method: "POST"
            }
            fetch(new Request(`https://api.nb.no/maken/similarity/${index}/id?size=12&offset=0&fields=filename,id`), params)
            .then(data => { return data.json() })
            .then(res => {
                let errorMessage = ""
                container.style.display = "block"
                document.getElementById("similar-items").innerHTML = `<span>Ser etter objekter som ligner på ${id}...</span>`
                if (res && !res.error) {
                    document.getElementById("similar-items").innerHTML = ""
                    res.forEach(entry => {
                        let img = document.createElement("span")
                        let similarUrl = `https://www.nb.no/items/URN:NBN:no-nb_${entry.fields.filename[0]}`
                        fetch(new Request(`https://api.nb.no/catalog/v1/iiif/${entry.fields.id[0]}/manifest`))
                        .then(data => { return data.json() })
                        .then(manifest => {
                            img.innerHTML = `<a href='${similarUrl}' target=_blank><img width='150px' src='${manifest.thumbnail["@id"]}' /></a>`
                            document.getElementById("similar-items").append(img)
                        })
                    })
                } else if (res && !!res.error) {
                    errorMessage = `Beklager, dette <abbr title='${res.error}'>objektet</abbr> er ikke behandlet enda.`
                } else {
                    errorMessage = "Vi kunne ikke fullføre spørringen"
                }
                if (errorMessage) {
                    document.getElementById("similar-items").innerHTML = `<span>${errorMessage}</span>`
                }
            })
            .catch(error => { console.log(error) })
        });
        elem.parentElement.append(sim)
        elem.classList.add("similarity")
    })
}
document.addEventListener("DOMContentLoaded", enable);

insertionQ("a.no-link:not(.similarity)").summary(function(arrayOfInsertedNodes){
  if (isExtensionOn) {
    enable();
  }
});


function disable() {
    container.style.display = "none"
    document.querySelectorAll("span.similarity-link").forEach(elem => {
        elem.remove();
    });
    document.querySelectorAll("a.no-link").forEach(elem => {
        elem.classList.remove("similarity")
    });
}

browser.storage.onChanged.addListener(function (changes, namespace) {
    if (Object.keys(changes).includes("isExtensionOn")) {
        if (changes.isExtensionOn.newValue && !changes.isExtensionOn.oldValue) {
            enable()
        } else {
            disable()
        }
        isExtensionOn = changes.isExtensionOn.newValue
    }
});
