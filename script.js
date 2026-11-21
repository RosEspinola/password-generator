const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?"
};

const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const message = document.getElementById("message");

function generatePassword() {
  let pool = "";
  let password = "";

  // Add each selected group, and make sure the password has at least one of each
  for (const type in CHARS) {
    if (document.getElementById(type).checked) {
      pool += CHARS[type];
      password += randomChar(CHARS[type]);
    }
  }

  if (pool === "") {
    message.textContent = "Please select at least one option.";
    return "";
  }

  message.textContent = "";

  // Fill the remaining length with random characters from the pool
  while (password.length < lengthInput.value) {
    password += randomChar(pool);
  }

  return shuffle(password);
}

function randomChar(text) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return text[array[0] % text.length];
}

function shuffle(text) {
  const arr = text.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

document.getElementById("generateBtn").addEventListener("click", () => {
  passwordInput.value = generatePassword();
});

document.getElementById("copyBtn").addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value);
  message.style.color = "#16a34a";
  message.textContent = "Copied!";
});