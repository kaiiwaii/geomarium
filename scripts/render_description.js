const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
  
if (id) {
    fetch(`points/${id}.txt`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Fetch failed");
        }
        return response.text();
    })
    .then((data) => {
        document.title = id;
        paragraphs = data.split("\n\n");
        const template = document.getElementById("template");
        template.innerHTML = 
        `
        <h1>${id}</h1>
        ${paragraphs.map((p) => `<p>${p}</p>`).join("")}
        <div class="baguetteBoxOne">
            <figure>
                <a href="images/${id}.png">
                    <img src="images/${id}.png">
                </a>
                <figcaption style="padding-bottom: 0.5rem;">
                    Imagen generada con Stable Diffusion XL
                </figcaption>
            </figure>
        </div>
        <div class="fullimage-button-container">
            <a class="fullimage-button" href=/geomarium/images/2x/${id}2x.png>
                Ver con resolución completa
            </a>
        </div>
        `; 
        loadBaguetteBox();
    })
    .catch((error) => {
        const template = document.getElementById("template");
        template.innerHTML = "<h1>Esta página todavía no está acabada o no existe</h1>";
    });
} else {
    const template = document.getElementById("template");
    template.innerHTML = "<h1>¡Enlace equivocado! ¿Has considerado volver al mapa y elegir un destino más adecuado?</h1>";
}

function loadBaguetteBox() {
    baguetteBox.run('.baguetteBoxOne', {
        captions: function(element) {
            console.log("baguette");
            return element.getElementsByTagName('img')[0].alt;
        },
        fullscreen: true
    });
}