function turnPage(pageId) {
    const page = document.getElementById(pageId);
    page.classList.add('flipped');
}

function turnPageBack(pageId) {
    const page = document.getElementById(pageId);
    page.classList.remove('flipped');
}