const modal = document.getElementById("pokemonModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openModal(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.querySelector('.modal-content');

    
    modalContent.classList.remove(...modalContent.classList);

    modalContent.classList.add('modal-content', pokemon.type); 

    const heightPercentage = (pokemon.height / 10) * 100; 
    const weightPercentage = (pokemon.weight / 10) * 100; 
    const powerLevel = Math.max(heightPercentage, weightPercentage); 

    modalContent.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.number})</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="info">
            <div class="info-item">
                <span>Tipo:</span>
                <div class="power-bar" style="width: ${powerLevel}%; background-color: ${pokemon.typeColor};"></div>
                <p>${pokemon.types.join(", ")}</p>
            </div>
            <div class="info-item">
                <span>Altura:</span>
                <div class="power-bar" style="width: ${heightPercentage}%; background-color: #f0f8ff;"></div>
                <p>${pokemon.height} decímetros</p>
            </div>
            <div class="info-item">
                <span>Peso:</span>
                <div class="power-bar" style="width: ${weightPercentage}%; background-color: #ff0000;"></div>
                <p>${pokemon.weight} hectogramas</p>
            </div>
            <div class="info-item">
                <span>Habilidades</span>
                <p>${(": ")}${pokemon.abilities.join(", ")}</p>
            </div>
        </div>
    `;

    
    modal.style.display = "block";
}


closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
