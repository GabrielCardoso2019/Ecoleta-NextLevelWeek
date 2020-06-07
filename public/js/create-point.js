function populateUFs() {
    const ufSelect = document.querySelector("[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        });
}


document
    .querySelector("[name=uf]")
    .addEventListener("change", getCities);



// Itens de Coleta
// Pegar todos os Li's

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];


function handleSelectedItem(event) {
    const itemLi = event.target;

    // Adciona ou remover uma classe JS
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    // console.log('ITEM ID: ', itemId)

    // Verifica se existem selecionador
    // Sim ? Pegar itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId; // Retorna True or False
        return itemFound;
    });

    // Se estiver selecionado
    if (alreadySelected >= 0) {
        //  retirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId; // False
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        // Se não estiver selecionado
        // add à seleção
        selectedItems.push(itemId)

    }

    // console.log('selectedItems: ', selectedItems)

    // Atualizar o campo escondigo com os dados selecionados
    collectedItems.value = selectedItems;
}