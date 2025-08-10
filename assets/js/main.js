const countryData = {
  Asia: ['China', 'India', 'Japan', 'Bangladesh', 'Indonesia'],
  Africa: ['Nigeria', 'Egypt', 'South Africa', 'Kenya'],
  Europe: ['France', 'Germany', 'Italy', 'Spain'],
  'North America': ['USA', 'Canada', 'Mexico'],
  'South America': ['Brazil', 'Argentina', 'Colombia'],
  Australia: ['Australia', 'New Zealand'],
  Antarctica: ['No countries - just research stations']
};

const continents = document.querySelectorAll('.continent');
const title = document.getElementById('continent-title');
const list = document.getElementById('country-list');

continents.forEach(continent => {
  continent.addEventListener('click', () => {
    // Reset all
    continents.forEach(c => c.classList.remove('active'));

    // Highlight current
    continent.classList.add('active');

    // Get data
    const name = continent.getAttribute('data-continent');
    const countries = countryData[name] || [];

    // Update UI
    title.innerText = `Countries in ${name}`;
    list.innerHTML = countries.map(country => `<li>${country}</li>`).join('');
  });
});


// index page departments show more/less js 
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.readmore').forEach(function(link) {
        link.addEventListener('click', function() {
            var currentWrapper = this.closest('.departments-wrap');
            document.querySelectorAll('.departments-wrap.show').forEach(function(wrapper) {
                if (wrapper !== currentWrapper) {
                    wrapper.classList.remove('show');
                }
            });
            currentWrapper.classList.toggle('show');
        });
    });
});
