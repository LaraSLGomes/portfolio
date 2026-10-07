const pagesContainer = document.getElementById('pages');
const contentSource = document.getElementById('content-source');

function buildPages() {
    pagesContainer.innerHTML = '';

    const pageDataBlocks = Array.from(contentSource.querySelectorAll('.page-data'));
    const totalSpreads = Math.ceil(pageDataBlocks.length / 2);

    for (let i = 0; i < totalSpreads; i++) {
        const spread = document.createElement('div');
        spread.className = 'page-right';
        spread.id = `spread${i}`;

        spread.style.zIndex = totalSpreads - i;

        const front = document.createElement('div');
        front.className = 'page-front';
        const frontIndex = i * 2;
        if (pageDataBlocks[frontIndex]) {
            front.appendChild(pageDataBlocks[frontIndex].cloneNode(true));
        }

        const frontFooter = document.createElement('div');
        frontFooter.className = 'page-footer';

        const hasNextFromFront = (frontIndex + 1 < pageDataBlocks.length);
        const frontNextBtn = hasNextFromFront ? `<button class="next-btn" onclick="turnPage('spread${i}', ${i}, ${totalSpreads})">❯</button>` : `<span></span>`;

        frontFooter.innerHTML = `<span>${frontIndex + 1}</span> ${frontNextBtn}`;
        front.appendChild(frontFooter);

        const back = document.createElement('div');
        back.className = 'page-back';
        const backIndex = i * 2 + 1;
        if (pageDataBlocks[backIndex]) {
            back.appendChild(pageDataBlocks[backIndex].cloneNode(true));
        }

        const backFooter = document.createElement('div');
        backFooter.className = 'page-footer';

        const hasNextFromBack = (i < totalSpreads - 1);
        const backNextBtn = hasNextFromBack ? `<button class="next-btn" onclick="turnPage('spread${i + 1}', ${i + 1}, ${totalSpreads})">❯</button>` : `<span></span>`;

        backFooter.innerHTML = `<button class="prev-btn" onclick="turnPageBack('spread${i}', ${i}, ${totalSpreads})">❮</button> <span>${backIndex + 1}</span> ${backNextBtn}`;
        back.appendChild(backFooter);

        spread.append(front, back);
        pagesContainer.appendChild(spread);
    }
}

function turnPage(spreadId, spreadIndex, totalSpreads) {
    const spread = document.getElementById(spreadId);
    spread.classList.add('flipped');

    setTimeout(() => {
        spread.style.zIndex = 20 + spreadIndex;
    }, 400);
}

function turnPageBack(spreadId, spreadIndex, totalSpreads) {
    const spread = document.getElementById(spreadId);
    spread.classList.remove('flipped');

    setTimeout(() => {
        spread.style.zIndex = totalSpreads - spreadIndex;
    }, 400);
}

buildPages();

const languageOptions = document.querySelectorAll('.language-option');

function setLanguage(lang) {
    if (lang === 'pt-BR') {
        document.body.classList.add('lang-pt');
        document.documentElement.lang = 'pt-BR';
    } else {
        document.body.classList.remove('lang-pt');
        document.documentElement.lang = 'en';
    }

    languageOptions.forEach(btn => {
        if (btn.dataset.language === lang) {
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    localStorage.setItem('portfolio-language', lang);
}

languageOptions.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.language));
});

setLanguage(localStorage.getItem('portfolio-language') || 'en');