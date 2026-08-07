// ---------- Chip checker tool ----------
const chipOptions = document.querySelectorAll(".chip-option");
const chipResult = document.getElementById("chipResult");

const resultText = {
  repair: {
    title: "Good news — that's a repair.",
    text: "This is exactly what we fix on-site in about 30 minutes, and it's usually covered by insurance at no cost to you."
  },
  maybe: {
    title: "Likely repairable — worth a look.",
    text: "Chips this size can usually still be repaired if caught soon. Send us a photo and we'll confirm before you book."
  },
  replace: {
    title: "This one likely needs replacement.",
    text: "Cracks this size compromise the windshield's strength. We'll quote a full replacement, often covered by insurance too."
  }
};

chipOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // highlight the selected option
    chipOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");

    // show the matching result
    const result = option.getAttribute("data-result");
    const data = resultText[result];

    chipResult.innerHTML = `<strong>${data.title}</strong><br>${data.text}`;
    chipResult.classList.add("visible");
  });
});

// ---------- Quote form ----------
const quoteForm = document.getElementById("quoteForm");
const formFields = document.getElementById("formFields");
const formSuccess = document.getElementById("formSuccess");

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("qName").value.trim();
  const phone = document.getElementById("qPhone").value.trim();

  if (!name || !phone) {
    return;
  }

  // In a real site, you'd send this data to a server or form service here.
  formFields.style.display = "none";
  formSuccess.classList.add("visible");
});