document.getElementById('scrape-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url-input').value;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<span>Scraping...</span>';

    // Call backend API (to be implemented)
    try {
        const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        displayResults(data);
    } catch (err) {
            resultsDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Display links
    if (data.links && data.links.length > 0) {
        const linksHeader = document.createElement('h3');
        linksHeader.textContent = 'Links:';
        resultsDiv.appendChild(linksHeader);

        const linksList = document.createElement('ul');
        data.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link;
            a.textContent = link;
            a.target = '_blank';
            li.appendChild(a);
            linksList.appendChild(li);
        });
        resultsDiv.appendChild(linksList);
    }

    // Display images
    if (data.images && data.images.length > 0) {
        const imagesHeader = document.createElement('h3');
        imagesHeader.textContent = 'Images:';
        resultsDiv.appendChild(imagesHeader);

        const imagesContainer = document.createElement('div');
        imagesContainer.style.display = 'flex';
        imagesContainer.style.flexWrap = 'wrap';
        imagesContainer.style.gap = '10px';

        data.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = src;
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.border = '1px solid #2196f3';
            img.style.borderRadius = '6px';
            img.style.background = '#e3f2fd';
            imagesContainer.appendChild(img);
        });
        resultsDiv.appendChild(imagesContainer);
    }

    // Display PDFs
    if (data.pdfs && data.pdfs.length > 0) {
        const pdfHeader = document.createElement('h3');
        pdfHeader.textContent = 'PDFs:';
        resultsDiv.appendChild(pdfHeader);

        const pdfList = document.createElement('ul');
        data.pdfs.forEach(pdf => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = pdf;
            a.textContent = pdf;
            a.target = '_blank';
            li.appendChild(a);
            pdfList.appendChild(li);
        });
        resultsDiv.appendChild(pdfList);
    }
}
