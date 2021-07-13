let increment = document.querySelector('.increment');
let decrement = document.querySelector('.decrement');
let likesText = document.querySelector('.likes');
increment.addEventListener('click', increaseLikes);
decrement.addEventListener('click', decreaseLikes);
function increaseLikes() {
  likesText.innerText = Number(likesText.innerText) + 1;
}
function decreaseLikes() {
  likesText.innerText = Number(likesText.innerText) - 1;
}
