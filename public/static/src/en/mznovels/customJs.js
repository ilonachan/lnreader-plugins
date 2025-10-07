document.querySelectorAll('.author-feedback').forEach(
  el =>
    (el.onclick = function (e) {
      e.preventDefault();
      this.classList.toggle('active');
    }),
);
