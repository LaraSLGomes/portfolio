const pagesContainer = document.getElementById('pages');
const contentSource = document.getElementById('content-source');

function buildPages() {
    pagesContainer.innerHTML = '';
    
    // Pega todos os blocos de página que definimos no HTML
    const pageDataBlocks = Array.from(contentSource.querySelectorAll('.page-data'));
    const totalSpreads = Math.ceil(pageDataBlocks.length / 2);

    for (let i = 0; i < totalSpreads; i++) {
        const spread = document.createElement('div');
        spread.className = 'page-right';
        spread.id = `spread${i}`;
        
        // A primeira página começa com o z-index mais alto para ficar por cima
        spread.style.zIndex = totalSpreads - i;

        // FRENTE DA FOLHA
        const front = document.createElement('div');
        front.className = 'page-front';
        const frontIndex = i * 2;
        if (pageDataBlocks[frontIndex]) {
            front.appendChild(pageDataBlocks[frontIndex].cloneNode(true));
        }
        
        const frontFooter = document.createElement('div');
        frontFooter.className = 'page-footer';
        
        // Se houver uma próxima página (ou um verso), mostra o botão de avançar
        const hasNextFromFront = (frontIndex + 1 < pageDataBlocks.length);
        const frontNextBtn = hasNextFromFront ? `<button class="next-btn" onclick="turnPage('spread${i}', ${i}, ${totalSpreads})">❯</button>` : `<span></span>`;
        
        frontFooter.innerHTML = `<span>${frontIndex + 1}</span> ${frontNextBtn}`;
        front.appendChild(frontFooter);

        // VERSO DA FOLHA
        const back = document.createElement('div');
        back.className = 'page-back';
        const backIndex = i * 2 + 1;
        if (pageDataBlocks[backIndex]) {
            back.appendChild(pageDataBlocks[backIndex].cloneNode(true));
        }

        const backFooter = document.createElement('div');
        backFooter.className = 'page-footer';
        
        // Verifica se existe outra folha depois dessa para colocar o botão de avançar no verso
        const hasNextFromBack = (i < totalSpreads - 1);
        const backNextBtn = hasNextFromBack ? `<button class="next-btn" onclick="turnPage('spread${i + 1}', ${i + 1}, ${totalSpreads})">❯</button>` : `<span></span>`;
        
        backFooter.innerHTML = `<button class="prev-btn" onclick="turnPageBack('spread${i}', ${i}, ${totalSpreads})">❮</button> <span>${backIndex + 1}</span> ${backNextBtn}`;
        back.appendChild(backFooter);

        spread.append(front, back);
        pagesContainer.appendChild(spread);
    }
}

// A mágica acontece aqui: mudamos o z-index no meio do giro (400ms)
function turnPage(spreadId, spreadIndex, totalSpreads) {
    const spread = document.getElementById(spreadId);
    spread.classList.add('flipped');
    
    setTimeout(() => {
        // Quando vai para a esquerda, precisa ir para o fundo da pilha
        spread.style.zIndex = 20 + spreadIndex; 
    }, 400); 
}

function turnPageBack(spreadId, spreadIndex, totalSpreads) {
    const spread = document.getElementById(spreadId);
    spread.classList.remove('flipped');
    
    setTimeout(() => {
        // Quando volta para a direita, recupera a ordem original
        spread.style.zIndex = totalSpreads - spreadIndex;
    }, 400);
}

// Constrói o livro ao carregar
buildPages();