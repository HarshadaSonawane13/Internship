document.getElementById("registerBtn").addEventListener("click", function () {
    document.getElementById("successMsg").innerText = "Registered successfully!";
});

document.getElementById("openPdf").onclick = () => {
    const pdf = document.getElementById("pdfViewer");
    pdf.src = "Harshada_Sonawane.pdf";
    pdf.style.display = "block";
};

