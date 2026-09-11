```javascript
/* =========================================================
   HUDUMA CENTRE EMBU
   CUSTOMER GUIDANCE + QUEUE SYSTEM
   ========================================================= */


/* =========================================================
   SERVICES
   ========================================================= */

const services = [

    {
        category: "Identity",
        icon: "🪪",
        name: "National ID Services",
        desk: "ID Desk",

        services: [
            "National ID application",
            "Duplicate ID",
            "ID replacement",
            "Identity information"
        ]
    },

    {
        category: "Tax & Finance",
        icon: "💰",
        name: "KRA Services",
        desk: "KRA Desk",

        services: [
            "KRA PIN services",
            "Tax services",
            "Tax compliance assistance"
        ]
    },

    {
        category: "Transport",
        icon: "🚗",
        name: "NTSA Services",
        desk: "NTSA Desk",

        services: [
            "Driving licence services",
            "Vehicle registration",
            "Transport services"
        ]
    },

    {
        category: "Health",
        icon: "🏥",
        name: "SHA Services",
        desk: "Health Desk",

        services: [
            "SHA registration",
            "Health coverage assistance",
            "SHA information"
        ]
    },

    {
        category: "Immigration",
        icon: "🛂",
        name: "Passport & Immigration",
        desk: "Immigration Desk",

        services: [
            "Passport services",
            "Immigration information",
            "Permit information"
        ]
    },

    {
        category: "Land",
        icon: "🏠",
        name: "Land Services",
        desk: "Lands Desk",

        services: [
            "Land information",
            "Land administration",
            "Housing information"
        ]
    },

    {
        category: "Education",
        icon: "🎓",
        name: "HELB Services",
        desk: "HELB Desk",

        services: [
            "Loan services",
            "Loan repayment information",
            "HELB certificates"
        ]
    },

    {
        category: "Education",
        icon: "📚",
        name: "KUCCPS Services",
        desk: "KUCCPS Desk",

        services: [
            "Student placement",
            "Course information",
            "Career guidance"
        ]
    },

    {
        category: "Business",
        icon: "🏢",
        name: "Business Registration",
        desk: "BRS Desk",

        services: [
            "Business name registration",
            "Business name search",
            "Company registration"
        ]
    },

    {
        category: "Security",
        icon: "📄",
        name: "Certificate of Good Conduct",
        desk: "DCI Desk",

        services: [
            "Certificate of Good Conduct",
            "Police clearance information"
        ]
    },

    {
        category: "Civil Registration",
        icon: "📜",
        name: "Birth Certificate",
        desk: "Civil Registration Desk",

        services: [
            "Birth certificate",
            "Birth registration",
            "Certificate information"
        ]
    },

    {
        category: "Social Services",
        icon: "♿",
        name: "NCPWD Services",
        desk: "NCPWD Desk",

        services: [
            "PWD registration",
            "Disability services",
            "Support information"
        ]
    },

    {
        category: "Employment",
        icon: "💼",
        name: "Employment Services",
        desk: "Employment Desk",

        services: [
            "Employment information",
            "Job placement",
            "Career guidance"
        ]
    },

    {
        category: "Pensions",
        icon: "👴",
        name: "Pension Services",
        desk: "Pensions Desk",

        services: [
            "Pension information",
            "Pension claims",
            "Dependent pension services"
        ]
    },

    {
        category: "Postal",
        icon: "📮",
        name: "Postal Services",
        desk: "Posta Desk",

        services: [
            "Postal services",
            "Courier services",
            "Postal information"
        ]
    },

    {
        category: "Digital Services",
        icon: "💻",
        name: "E-Citizen Assistance",
        desk: "E-Citizen Desk",

        services: [
            "E-Citizen registration",
            "Online application assistance",
            "Government online services"
        ]
    }

];


/* =========================================================
   QUEUE VARIABLES
   ========================================================= */

let queue = [];

let currentCustomer = null;

let selectedService = null;

let queueCounter = 1;


/* =========================================================
   DISPLAY SERVICES
   ========================================================= */

function displayServices(list = services) {

    const container =
        document.getElementById("servicesContainer");

    container.innerHTML = "";

    const categories = {};


    list.forEach(service => {

        if (!categories[service.category]) {

            categories[service.category] = [];

        }

        categories[service.category].push(service);

    });


    Object.keys(categories).forEach(category => {

        const section =
            document.createElement("section");

        section.className = "category";


        section.innerHTML = `

            <h2>${category}</h2>

            <div class="services"></div>

        `;


        const grid =
            section.querySelector(".services");


        categories[category].forEach(service => {

            const button =
                document.createElement("button");

            button.className =
                "service-card";


            button.innerHTML = `

                <div class="service-icon">
                    ${service.icon}
                </div>

                <h3>
                    ${service.name}
                </h3>

                <p>
                    ${service.desk}
                </p>

            `;


            button.onclick = () => {

                showGuide(service);

            };


            grid.appendChild(button);

        });


        container.appendChild(section);

    });

}


/* =========================================================
   SHOW SERVICE GUIDE
   ========================================================= */

function showGuide(service) {

    selectedService = service;


    document
        .getElementById("customerSection")
        .classList.add("hidden");


    document
        .getElementById("guide")
        .classList.remove("hidden");


    document
        .getElementById("guideTitle")
        .textContent =
        service.name;


    document
        .getElementById("guideContent")
        .innerHTML = `

        <div class="guide-box">

            <h3>
                📍 Where should I go?
            </h3>

            <p>
                Please proceed to:
            </p>

            <h2>
                ${service.desk}
            </h2>

        </div>


        <div class="guide-box">

            <h3>
                📋 Services available
            </h3>

            <ul>

                ${service.services
                    .map(item =>
                        `<li>${item}</li>`
                    )
                    .join("")}

            </ul>

        </div>

    `;


    speakCurrentGuide();

}


/* =========================================================
   VOICE GUIDANCE
   ========================================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Voice guidance is not supported by this browser."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-KE";

    speech.rate = 0.9;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


/* =========================================================
   SPEAK SERVICE GUIDE
   ========================================================= */

function speakCurrentGuide() {

    if (!selectedService) return;


    const message =

        "Welcome to Huduma Centre Embu. " +

        "For " +
        selectedService.name +

        ", please proceed to " +

        selectedService.desk +

        ". Please have your required documents ready.";


    speak(message);

}


/* =========================================================
   CREATE QUEUE NUMBER
   ========================================================= */

function getQueueNumber() {

    if (!selectedService) return;


    const prefix =
        getPrefix(selectedService.name);


    const number =
        String(queueCounter)
        .padStart(3, "0");


    const queueNumber =
        prefix + "-" + number;


    queueCounter++;


    queue.push({

        number: queueNumber,

        service:
            selectedService.name,

        desk:
            selectedService.desk

    });


    document
        .getElementById("guide")
        .classList.add("hidden");


    document
        .getElementById("queueSection")
        .classList.remove("hidden");


    document
        .getElementById("queueNumber")
        .textContent =
        queueNumber;


    speak(

        "Your queue number is " +

        queueNumber +

        ". Please take your queue number and wait. " +

        "You will be called when it is your turn."

    );


    updateWaitingList();

}


/* =========================================================
   QUEUE PREFIX
   ========================================================= */

function getPrefix(serviceName) {

    if (
        serviceName.includes("KRA")
    ) return "KRA";


    if (
        serviceName.includes("NTSA")
    ) return "NTSA";


    if (
        serviceName.includes("ID")
    ) return "ID";


    if (
        serviceName.includes("Health") ||
        serviceName.includes("SHA")
    ) return "SHA";


    if (
        serviceName.includes("Passport")
    ) return "IMM";


    return "GEN";

}


/* =========================================================
   CALL NEXT CUSTOMER
   ========================================================= */

function callNextCustomer() {

    if (queue.length === 0) {

        speak(
            "There are currently no customers waiting."
        );

        return;

    }


    const desk =
        document
        .getElementById("deskSelect")
        .value;


    /*
       Find the first customer assigned
       to this desk.
    */

    const index =
        queue.findIndex(
            customer =>
                customer.desk === desk
        );


    if (index === -1) {

        speak(
            "There are no waiting customers for " +
            desk
        );

        return;

    }


    currentCustomer =
        queue.splice(index, 1)[0];


    document
        .getElementById("currentNumber")
        .textContent =
        currentCustomer.number;


    document
        .getElementById("currentDesk")
        .textContent =
        desk;


    document
        .getElementById("publicNumber")
        .textContent =
        currentCustomer.number;


    document
        .getElementById("publicDesk")
        .textContent =
        "Please proceed to " + desk;


    /*
       Announce current customer.
    */

    speak(

        "Attention please. " +

        "Queue number " +

        currentCustomer.number +

        ", please proceed to " +

        desk +

        ". " +

        "The next customer, please get ready."

    );


    updateWaitingList();

}


/* =========================================================
   RECALL CUSTOMER
   ========================================================= */

function recallCustomer() {

    if (!currentCustomer) {

        speak(
            "There is currently no customer being served."
        );

        return;

    }


    const desk =
        document
        .getElementById("deskSelect")
        .value;


    speak(

        "Attention please. " +

        "Queue number " +

        currentCustomer.number +

        ", please proceed to " +

        desk

    );

}


/* =========================================================
   UPDATE WAITING LIST
   ========================================================= */

function updateWaitingList() {

    const list =
        document
        .getElementById("waitingList");


    list.innerHTML = "";


    if (queue.length === 0) {

        list.innerHTML =
            "<li>No customers waiting</li>";

        return;

    }


    queue.forEach(customer => {

        const item =
            document.createElement("li");


        item.textContent =
            customer.number +
            " — " +
            customer.desk;


        list.appendChild(item);

    });

}


/* =========================================================
   QUEUE SPEAK BUTTON
   ========================================================= */

function speakQueueNumber() {

    const number =
        document
        .getElementById("queueNumber")
        .textContent;


    speak(

        "Your queue number is " +

        number +

        ". Please wait for your number to be called."

    );

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchServices() {

    const search =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();


    if (search === "") {

        displayServices();

        return;

    }


    const results =
        services.filter(service => {

            const text = `

                ${service.name}

                ${service.category}

                ${service.desk}

                ${service.services.join(" ")}

            `.toLowerCase();


            return text.includes(search);

        });


    displayServices(results);

}


/* =========================================================
   BACK
   ========================================================= */

function goBack() {

    document
        .getElementById("guide")
        .classList.add("hidden");


    document
        .getElementById("queueSection")
        .classList.add("hidden");


    document
        .getElementById("customerSection")
        .classList.remove("hidden");

}


/* =========================================================
   START
   ========================================================= */

displayServices();

updateWaitingList();
```
