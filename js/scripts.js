const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");
const boxWordsElement = document.getElementById("box-words");
const lineWordsElement = document.querySelectorAll(".line-words");
const letterElement = document.querySelectorAll(".letter");
const warningElement = document.getElementById("warning");
let counter = -1;
let i = 0;
let secretWord = "lucas";
let correct = 0;

//función para sustituir los caracteres ya acertados por un guión
let newWord = secretWord;
const removeCharacter = letter => {
  newWord = newWord.replace(letter, "-");
};

//marcar en verde las letras en la posición correcta
const checkCorrectLetters = (letter, span, i) => {
  if (secretWord.charAt(i) === letter) {
    span.classList.add("correct");
    correct++;
    removeCharacter(letter);
  }
};

//marcar en naranja las letras incluidas pero en posición incorrecta y en gris las letras no incluidas
const checkIncludedLetters = (letter, span) => {
  if (newWord.includes(letter)) {
    span.classList.add("included");
    removeCharacter(letter);
  } else {
    span.classList.add("not-included");
  }
};

//Retirar el mensaje de información
const removeWarning = () => {
  warningElement.classList.remove("show");
};

//Mostrar mensaje conseguido o sin intentos
const gameOver = () => {
  if (correct === 5) {
    warningElement.textContent = "Enhorabuena, has descubierto la palabra";
    warningElement.classList.add("show");
    inputElement.value = "";
    setTimeout(removeWarning, 4000);
  } else if (counter === 4) {
    warningElement.textContent = "No te quedan más intentos";
    warningElement.classList.add("show");
    inputElement.value = "";
    setTimeout(removeWarning, 4000);
  }
};

//añadir letras a cada caja y lanzar funciones para colorear letras
const addWord = () => {
  let word = inputElement.value;
  for (let i = 0; i < word.length; i++) {
    boxWordsElement.children[counter].children[i].textContent = word.charAt(i);
    checkCorrectLetters(word.charAt(i), boxWordsElement.children[counter].children[i], i);
  }
  for (let i = 0; i < word.length; i++) {
    checkIncludedLetters(word.charAt(i), boxWordsElement.children[counter].children[i]);
  }
  inputElement.value = "";
  gameOver();
  correct = 0;
  newWord = secretWord;
};

//animar letras
const animate = () => {
  for (const item of boxWordsElement.children[counter].children) {
    item.classList.add("animation");
  }
};

//validar palabra indicada

const validateWord = () => {
  if (inputElement.value.length !== 5) {
    warningElement.textContent = "La palabra debe tener 5 letras";
    warningElement.classList.add("show");
    inputElement.value = "";
    setTimeout(removeWarning, 3000);
    return false;
  } else {
    counter++;
    return true;
  }
};

//añadir evento al enviar palabra
formElement.addEventListener("submit", e => {
  e.preventDefault();
  const isWordValid = validateWord();
  if (!isWordValid) return;
  animate();
  addWord();
});
