// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

console.log('Шаблон готовий. Можна писати код 🚀');
import { PREP_TIME } from "./js/menu.js";
const form = document.querySelector(".form");
const orderLog = document.querySelector(".order-log");
function makeOrder(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}
function addOrderRow(drinkName) {
    const li = document.createElement("li");
    li.className = "row-pending";
    li.textContent = `${drinkName} · у роботі`;
    orderLog.prepend(li);
    return li;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const drink = formData.get("drink");
    const state = formData.get("state");
    const delay = PREP_TIME[drink];
    const shouldResolve = state === "fulfilled";
    const row = addOrderRow(drink);
    makeOrder(delay, shouldResolve)
        .then(delayMs => {
            row.className = "row-ok";
            row.textContent = `✅${drink} · готовe · ${delayMs} ms`;
        })
        .catch(delayMs => {
            row.className = "row-err";
            row.textContent = `❌${drink} · скасовано · ${delayMs} ms`;
        })
        .finally(() => {
            const timeString = new Date().toLocaleTimeString("uk-UA");
            row.textContent += ` · ${timeString}`;
        })
});
