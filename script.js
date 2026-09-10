document.addEventListener("DOMContentLoaded", () => {
    
    const menuData = [
        {
            title: "Плов Фергана",
            description: "Сары сабиз, сапаттуу кой эти жана өзгөчө чыгыш татымалдары кошулган салттуу аш.",
            price: "350 сом",
            image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500"
        },
        {
            title: "Уйгур Лагманы",
            description: "Колдо чоюлган камыр, жаңы жашылчалар жана жумшак эттен даярдалган ширелуу лагман.",
            price: "320 сом",
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500"
        },
        {
            title: "Кой этинен шишкебек",
            description: "Табигый жыгачтын чогунда бышырылган, ширеси таамган жумшак шишкебек.",
            price: "220 сом",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500"
        },
        {
            title: "Тандыр Самса",
            description: "Тандырга жабылган, ичине майлуураак кой эти жана пияз салынган кытырак самса.",
            price: "110 сом",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
        }
    ];

    
    const menuContainer = document.querySelector(".container-js");
    if (menuContainer) {
        menuData.forEach(dish => {
            const cardHTML = `
                <div class="menu-card">
                    <img src="${dish.image}" alt="${dish.title}">
                    <div class="menu-1">
                        <div class="menu-card1">${dish.title}</div>
                        <div class="menu-card2">${dish.description}</div>
                        <div class="menu-card3">${dish.price}</div>
                    </div>
                </div>
            `;
            menuContainer.innerHTML += cardHTML;
        });
    }

    const nameInput = document.getElementById("userName");
    const savedName = localStorage.getItem("lastOrderUserName");
    if (savedName && nameInput) {
        nameInput.value = savedName; 
    }

    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("userName").value.trim();
            const phone = document.getElementById("userPhone").value.trim();
            const dish = document.getElementById("dishSelect").value;
            const message = document.getElementById("userMessage").value.trim();

            if (!name || !phone) {
                alert("Сураныч, атыңызды жана телефон номериңизди толтуруңуз!");
                return;
            }

            
            const orderDetails = {
                userName: name,
                userPhone: phone,
                selectedDish: dish,
                userMessage: message,
                date: new Date().toISOString()
            };

            
            localStorage.setItem("lastOrderUserName", name);
            localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails));

            alert(`Рахмат, ${name}! Сиздин заказыңыз кабыл алынды жана браузерге сакталды.`);
            orderForm.reset();
            
        
            nameInput.value = name; 
        });
    }

    // 4. Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});