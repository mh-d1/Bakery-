
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        return;
    }

    const phone = "6281200000000";

    const whatsappMessage = `
Hello Hana Bakery!

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, "_blank");
});
