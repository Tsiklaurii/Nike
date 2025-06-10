function loadContent(id, file) {
    fetch(file)
        .then((res) => res.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;
        })
}
loadContent('footer', 'footer.html');