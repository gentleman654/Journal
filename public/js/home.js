document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  // Add Journal Button
  const addJournalForm = document.getElementById('addJournalForm');

  if (addJournalForm) {
    addJournalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('journalTitle').value.trim();
      const body = document.getElementById('journalBody').value.trim();

      try {
        const res = await axios.post('/home', { title, body });

        // ✅ Create new card dynamically
        const newCard = document.createElement('div');
        newCard.classList.add('card', 'mb-3');
        newCard.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">${res.data.title}</h5>
            <p class="text-muted mb-0"><small>${new Date(
              res.data.dateCreated
            ).toLocaleDateString()}</small></p>
          </div>
          <div>
            <button class="btn btn-primary btn-sm me-2">Edit</button>
            <button class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      `;

        document.getElementById('journalList').prepend(newCard);

        // ✅ Reset and close modal
        addJournalForm.reset();
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
      } catch (err) {
        console.error(
          '❌ Error adding journal:',
          err.response?.data || err.message
        );
      }
    });
  }

  //  Search Button
  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();

      try {
        const res = await axios.get(
          `/home?search=${encodeURIComponent(query)}`
        );
        console.log(' Search results:', res.data);
        // Later: dynamically update results
      } catch (err) {
        console.error(' Error:', err.response?.data || err.message);
      }
    });
  }
});
