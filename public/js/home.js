document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  // Add Journal Button
  if (addBtn) {
    addBtn.addEventListener('click', async () => {
      try {
        const res = await axios.post('/home', {
          title: 'My New Entry',
          content: 'Added using Axios',
        });
        console.log('✅ Added:', res.data);
        window.location.reload();
      } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message);
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
