
1. 
const menuItems = [
    {
        id: 1,
        title: "Палав Фергана",
        price: "380 сом",
        desc: "Кой эти, сары сабиз, сарымсак жана атайын туз менен казанга бышкан плов.",
        img: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400"
    },
    {
        id: 2,
        title: "Уйгур Лагманы",
        price: "320 сом",
        desc: "Колдон чоюлган камыр, сочный соус жана жаңы жашылчалар.",
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"
    },
    {
        id: 3,
        title: "Кой этинен шишкебек",
        price: "220 сом",
        desc: "Мангалдагы чокто бышырылган жумшак эт жана пияз.",
        img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400"
    },
    {
        id: 4,
        title: "Тандыр Самса",
        price: "110 сом",
        desc: "Кат-кат камырдын ичинде туралган ширелүү кой эти.",
        img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    }
];

// 2. DOM RENDERING (forEach колдонуу)
document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("js-card-container");
    
    // Fake Data'ны окуп, сайтка чыгаруу
    menuItems.forEach((item) => {
        const cardHTML = `
            <div class="col-md-6 col-lg-3">
                <div class="card card-js h-100 shadow-sm border-0">
                    <img src="${item.img}" class="card-img-top" alt="${item.title}" style="height: 180px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h3 class="h5 card-title">${item.title}</h3>
                        <p class="card-text text-muted flex-grow-1">${item.desc}</p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="fw-bold text-success fs-5">${item.price}</span>
                            <a href="#contact" class="btn btn-sm btn-outline-warning text-dark fw-bold">Тандоо</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });

    // LocalStorage аркылуу акыркы сакталган маалыматты жүктөө
    loadSavedOrder();
});

// 3. FORM VALIDATION, LOCALSTORAGE & TIMER
const orderForm = document.getElementById("orderForm");
const alertMsg = document.getElementById("alert-msg");

orderForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Баракча кайра жүктөлүп калбашы үчүн

    // Input баалуулуктарын алуу
    const name = document.getElementById("userName").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const dish = document.getElementById("dishSelect").value;
    const message = document.getElementById("userMessage").value.trim();

    // БОШ ТАЛААЛАРДЫ ТЕКШЕРҮҮ (Validation)
    if (name === "" || phone === "" || dish === "") {
        showAlert("Сураныч, бардык милдеттүү талааларды толтуруңуз!", "danger");
        return;
    }

    // ТУУРА ТОЛТУРУЛСА (Success handling & LocalStorage)
    const orderData = {
        name: name,
        phone: phone,
        dish: dish,
        message: message,
        date: new Date().toLocaleTimeString()
    };

    // LocalStorage'ке сактоо
    localStorage.setItem("chaihanaLastOrder", JSON.stringify(orderData));

    showAlert(`Рахмат ${name}! Заказыңыз кабыл алынды. Жакын арада байланышабыз.`, "success");
    
    // Форманы тазалоо жана LocalStorage'тегини дароо экранга чыгаруу
    orderForm.reset();
    loadSavedOrder();
});

// ALERT КӨРСӨТҮҮ ЖАНА TIMER (setTimeout)
function showAlert(message, type) {
    alertMsg.className = `alert alert-${type} mb-3 d-block`;
    alertMsg.innerText = message;

    // 3 секунддан кийин кабарлоо автоматтык түрдө жоголот (Timer)
    setTimeout(() => {
        alertMsg.className = "alert d-none mb-3";
    }, 3000);
}

// LOCALSTORAGE'ДЕН МААЛЫМАТТЫ ЧЫГАРУУ
function loadSavedOrder() {
    const savedData = localStorage.getItem("chaihanaLastOrder");
    const savedOrderDiv = document.getElementById("savedOrder");
    const savedOrderText = document.getElementById("savedOrderText");

    if (savedData) {
        const order = JSON.parse(savedData);
        savedOrderText.innerHTML = `<strong>Конок:</strong> ${order.name} | <strong>Тамак:</strong> ${order.dish} | <strong>Убакыт:</strong> ${order.date}`;
        savedOrderDiv.classList.remove("d-none");
    }
}