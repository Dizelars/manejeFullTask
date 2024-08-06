// Получаем блок с id cardsRendering, в котором будут отрисоуваться карточки.
const cardFeedContainer = document.getElementById("cardsRendering");

// Устанавливаем глобальную переменную для хранения массива карточек
let cardItems;

// Функция для создания HTML-кода элемента карточки
function createCardHTML(cardItem) {
    // Получаем заголовок, дату, ссылку на изображение и описание из элемента карточки
    const title = cardItem.title;
    const date = cardItem.date;
    const imageUrl = cardItem.image;
    const description = cardItem.description;

    // Возвращаем HTML-код для карточки с уникальными значениями
    return `
    <div class="card">
        <div class="card-img">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="card-descr">
            <div class="card-date">
                <div class="svg_wrapper">
                    <div class="date_svg">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 7V1.75" stroke="white" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.5469 4.375L2.45361 9.625" stroke="white" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M1.83755 7.95974C1.61024 6.72961 1.82894 5.45873 2.45437 4.37534C3.0798 3.29195 4.07099 2.46703 5.24993 2.04871V5.9896L1.83755 7.95974Z" stroke="white" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6.99987 1.75C7.91968 1.75017 8.8233 1.992 9.62025 2.45126C10.4172 2.91053 11.0795 3.57111 11.5408 4.36686C12.0022 5.16262 12.2463 6.06561 12.2489 6.98542C12.2514 7.90522 12.0123 8.80956 11.5554 9.60786C11.0985 10.4062 10.4399 11.0704 9.64548 11.5341C8.8511 11.9978 7.94883 12.2446 7.02904 12.2499C6.10924 12.2552 5.20421 12.0187 4.40455 11.5642C3.6049 11.1097 2.93869 10.453 2.47266 9.66" stroke="white" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <div class="pulse"></div>
                </div>
                <span>${date}</span>
            </div>
            <p class="card-title">${title}</p>
            <p class="card-description">
                ${description}
            </p>
        </div>
    </div>
    `;
}

const insertCards = () => {
    // Отображаем карточки на странице
    for (let i = 0; i < cardItems.length; i++) {
        // Берем текущий json-обьект
        const cardItem = cardItems[i];
        // Формируем карточку на основе json-обьекта
        const cardHTML = createCardHTML(cardItem);
        // Вставляем сформированную карточку внутрь блока с id cardsRendering самой последней
        cardFeedContainer.insertAdjacentHTML("beforeend", cardHTML);
    }
}

// Функция для загрузки карточек
function loadCardsFromJson() {
    // Запрашиваем JSON с карточками
    fetch("https://coddmac.store/maneje/dataCards.json")
    .then(response => response.json())
    .then(data => {
        console.log('first time')
        // Записываем карточки в cardItems
        cardItems = data.cards;
        
        console.log(cardItems)

        insertCards()
    })
    .catch(error => {
        // Обрабатываем ошибку при запросе
        console.log("Запрос не прошел. Ошибка: " + error);
    });
}

// Вызов функции для загрузки карточек из json файла
loadCardsFromJson();