function loadContent(id, file) {
    fetch(file)
        .then((res) => res.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;

            // Header scroll
            if (id === "header") {
                window.addEventListener('scroll', function () {
                    const menuDiv = document.querySelector('.menu');

                    if (window.scrollY > 80) {
                        menuDiv.classList.add('scrolled');
                    } else {
                        menuDiv.classList.remove('scrolled');
                    }
                });
            }

        })
}
loadContent('header', 'header.html');
loadContent('footer', 'footer.html');