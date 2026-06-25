const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBER = "0123456789";
const SYMBOL = "!@#$%^&*()_+[]{}<>?/|";

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function randomSecure(max){
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword(){

    let chars = "";

    if(uppercase.checked) chars += UPPER;
    if(lowercase.checked) chars += LOWER;
    if(numbers.checked) chars += NUMBER;
    if(symbols.checked) chars += SYMBOL;

    if(chars.length === 0){
        alert("Selecione pelo menos uma opção.");
        return;
    }

    let password = "";

    for(let i=0;i<lengthSlider.value;i++){
        password += chars[randomSecure(chars.length)];
    }

    passwordInput.value = password;

    evaluatePassword(password);
}

function evaluatePassword(password){

    let score = 0;

    if(password.length >= 12) score++;
    if(password.length >= 16) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    let percentage = (score / 6) * 100;

    strengthFill.style.width = percentage + "%";

    if(score <= 2){
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = "Fraca";
    }
    else if(score <= 4){
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = "Média";
    }
    else{
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Forte";
    }
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {

    if(!passwordInput.value) return;

    await navigator.clipboard.writeText(passwordInput.value);

    copyBtn.innerText = "Copiado ✓";

    setTimeout(() => {
        copyBtn.innerText = "Copiar";
    }, 2000);

});

generatePassword();
