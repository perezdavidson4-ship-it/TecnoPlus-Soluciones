// Menú móvil
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Acordeón FAQ
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Cierra todos
    document.querySelectorAll('.faq__q').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq__a').forEach(a => a.classList.remove('open'));
    // Abre actual si estaba cerrado
    btn.setAttribute('aria-expanded', String(!expanded));
    const answer = btn.parentElement.querySelector('.faq__a');
    if (!expanded) answer.classList.add('open');
  });
});

// Reveal on scroll (IntersectionObserver)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
},{ threshold: 0.12 });

document.querySelectorAll('.observe').forEach(el => observer.observe(el));

// Reseñas (LocalStorage)
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

function loadReviews(){
  if (!reviewsList) return;
  const data = JSON.parse(localStorage.getItem('tp_reviews') || '[]');
  reviewsList.innerHTML = '';
  data.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<strong>${r.name}</strong> — <span style="color:#aeb8c6">${r.email}</span><br>${r.text}`;
    reviewsList.appendChild(div);
  });
}

if (reviewForm) {
  loadReviews();
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rName').value.trim();
    const email = document.getElementById('rEmail').value.trim();
    const text = document.getElementById('rText').value.trim();
    if (!name || !email || !text) return;

    const current = JSON.parse(localStorage.getItem('tp_reviews') || '[]');
    current.push({ name, email, text, at: Date.now() });
    localStorage.setItem('tp_reviews', JSON.stringify(current));

    reviewForm.reset();
    loadReviews();
    alert('¡Gracias por tu reseña!');
  });
}
