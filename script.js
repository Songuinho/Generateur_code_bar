document.addEventListener('DOMContentLoaded', function() {
    var button_code_bar = document.getElementById("button_code_bar");
    var text = document.getElementById("text");
    var box = document.getElementById("box");
    var pdf_box = document.getElementById("pdf_box");

    button_code_bar.onclick = function () {
        if (text.value.length > 0) {
            if (text.value.length < 50) {
                // Générer le code bar
                box.innerHTML = `<svg id="barcode"></svg>`;
                JsBarcode("#barcode", text.value);
                // Bouton pour télécharger le code
                pdf_box.innerHTML = `<button onclick="genererPDF()">Télécharger le code bar</button>`;
                pdf_box.style.display = "flex";
                pdf_box.style.border = "1px solid #999";
            } else {
                // Le cas où le texte est trop long
                box.style.border = "0";
                box.innerHTML = `<p class="error">Le texte est trop long !</p>`;
                pdf_box.style.display = "none";
            }
        } else {
            // Le cas où le champ est vide
            box.style.border = "0";
            box.innerHTML = `<p class="error">Remplissez le champ svp !</p>`;
            pdf_box.style.display = "none";
        }
    };

    // Fonction pour générer le pdf
    window.genererPDF = function() {
        var opt = {
            margin: 1,
            filename: `${text.value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a6', orientation: '1' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(box).save();
        console.log('pass');
    };
});