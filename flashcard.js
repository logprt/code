let currentIndex = 0;
const flashcards = document.querySelectorAll('.fc');
const total = flashcards.length;
const counter = document.getElementById('counter');

function showCard(index) {
  flashcards.forEach((card, i) => {
    card.style.display = (i === index) ? 'block' : 'none';

    const front = card.querySelector('.fcf');
    const back = card.querySelector('.fcb');
    front.style.display = 'block';
    back.style.display = 'none';
  });

  updateCounter(index);
}

function updateCounter(index) {
  counter.textContent = `(${index + 1} / ${total})`;
}

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  showCard(currentIndex);
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  showCard(currentIndex);
});

flashcards.forEach(card => {
  card.addEventListener('click', () => {
    const front = card.querySelector('.fcf');
    const back = card.querySelector('.fcb');

    if (front.style.display === 'block') {
      front.style.display = 'none';
      back.style.display = 'block';
    } else {
      front.style.display = 'block';
      back.style.display = 'none';
    }
  });
});

// Show the first flashcard on load
showCard(currentIndex);
