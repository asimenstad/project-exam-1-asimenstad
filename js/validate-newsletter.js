const newsletterForm = document.querySelector(".newsletter-form");
const newsletterContainer = document.querySelector(".newsletter");

function newsletterSuccess() {
  newsletterContainer.innerHTML = `<h2>Thank you!</h2><p>You are now subscribed to our newsletter. We hope you enjoy our weekly recipes and news.</p>`;
}

newsletterForm.addEventListener("submit", newsletterSuccess);
