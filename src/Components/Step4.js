import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Step4.css'; // Kerakli stil faylini import qiling
import { useNavigate } from 'react-router-dom';
import undo from '../assets/undo.png';
import cube from "../Step4-imgs/cube.svg"
import fig2 from "../Step4-imgs/fig2.svg"
import fig3 from "../Step4-imgs/fig3.svg"
import fig4 from "../Step4-imgs/fig4.svg"
import fig5 from "../Step4-imgs/fig5.svg"
import clean from "../Step4-imgs/ic_clean.svg"
import print from "../Step4-imgs/ic_print.svg"
import pdf from "../Step4-imgs/ic_pdf.svg"
import share from "../Step4-imgs/ic_share.svg"
import Union from "../Step4-imgs/Union.svg"
import disable from "../Step4-imgs/1_disabled.svg"
import img2 from "../Step4-imgs/2.svg"
import img3 from "../Step4-imgs/3.svg"
import img4 from "../Step4-imgs/4.svg"
import more from "../Step4-imgs/more.svg"





function Step4() {





    const [activeBar, setActiveBar] = useState(0);
    const [map, setMap] = useState([]);
    const [pixelCodes, setPixelCodes] = useState({});
    const [counts, setCounts] = useState({
        "count-cube": 0,
        "count-circle": 0,
        "count-angle": 0,
        "count-cube_d": 0,
        "count-circle_d": 0,
    });

    const navigate = useNavigate()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("images-data") || "[]");
        const { url = null, index = null } = JSON.parse(localStorage["selected-img"] || "[]");
        const [mapData = [], pixelCodesData = {}] = [data?.generateds[index]?.map, data?.pixel_codes];
        setMap(mapData);
        setPixelCodes(pixelCodesData);

        const newCounts = {
            "count-cube": mapData.filter(num => num === 0).length,
            "count-circle": mapData.filter(num => num === 1).length,
            "count-angle": mapData.filter(num => num === 2).length,
            "count-cube_d": mapData.filter(num => num === 3).length,
            "count-circle_d": mapData.filter(num => num === 4).length
        };
        setCounts(newCounts);
    }, []);
    const printableArea = document.getElementById('printable-area');



    const navigatee = useNavigate()

    const handlePdfSave = () => {
        document.body.classList.add("loading");
        setTimeout(() => {
            const canvasPromise = html2canvas(document.getElementById("mosaic__col"), {
                allowTaint: true,
                useCORS: true,
            });
            canvasPromise.then(function (canvas) {
                const contentWidth = canvas.width;
                const contentHeight = canvas.height;

                const pageWidth = 210;
                const pageHeight = 297;
                const margin = 10;

                const adjustedWidth = pageWidth - (margin * 2);
                const adjustedHeight = (contentHeight * adjustedWidth) / contentWidth;

                const doc = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });

                const imgData = canvas.toDataURL('image/jpeg');

                if (adjustedHeight <= pageHeight - (margin * 2)) {
                    doc.addImage(imgData, 'JPEG', margin, margin, adjustedWidth, adjustedHeight);
                } else {
                    console.error("Content too tall to fit with margins, consider adjusting scale or content.");
                }

                doc.save('mosaic.pdf');
                document.body.classList.remove("loading");
            });
        }, 500);
    };

    const handleMoreButtonClick = () => {
        const popupMenu = document.querySelector('.popup-menu');
        if (popupMenu) {
            if (popupMenu.style.display === 'block') {
                popupMenu.style.display = 'none';
            } else {
                popupMenu.style.display = 'block';
            }
        }
    };

    const handleSendToPrint = () => {
        const printableArea = document.createElement('div');

        const printWindow = window.open('', '_blank');

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Document</title>
            <style>
                /* Kerakli stil turlari */
                /* Masalan: */
                body { font-family: Arial, sans-serif; }
            </style>
        </head>
        <body>
            <!-- Chiqarishga tayyor HTML kod -->
            ${printableArea.innerHTML}
        </body>
        </html>
    `;

        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.print();
    };


    const handleSaveToPDF = () => {
        const printableArea = document.getElementById('printable-area').innerHTML;

        var pdf = new jsPDF();

        pdf.fromHTML(printableArea, 15, 15);

        pdf.save('document.pdf');
    };

    return (
        <div className="Step4">
            <nav className='navbarnd-card'>
                <h1>Photobrix</h1>
                <div class="header-controls">
                    <button data-index="0" class="active"><img src={Union} /></button>
                    <button data-index="1"><img src={disable} /></button>
                    <button data-index="2"><img src={img2} /></button>
                    <button data-index="3"><img src={img3} /></button>
                    <button data-index="4"><img src={img4} /></button>
                </div>

                <div className="icons">
                    <button onClick={handleMoreButtonClick}><img src={more} alt="..." /></button>
                    <button onClick={() => navigate("/Step3")}><span><img src={undo} alt="..." /> Назад</span></button>
                </div>
            </nav>

            <div class="container-card">
                <div class="app-controls">
                    <div class="controls-item">
                        <img src={cube} alt='...' />
                        <span id="count-cube">0</span>
                    </div>

                    <div class="controls-item">
                        <img src={fig2} alt='...' />
                        <span id="count-circle">0</span>
                    </div>

                    <div class="controls-item">
                        <img src={fig3} alt='...' />
                        <span id="count-angle">0</span>
                    </div>

                    <div class="controls-item">
                        <img src={fig4} alt='...' />
                        <span id="count-cube_d">0</span>
                    </div>

                    <div class="controls-item">
                        <img src={fig5} alt='...' />
                        <span id="count-circle_d">0</span>
                    </div>
                </div>

                <div class="app__controls app__controls--mobile">
                    {/*  */}
                    {/* <div>
                        <div class="controls__item">
                            <img src={cube} alt='...' />
                            <span id="count-cube-mobile">0</span>
                        </div>

                        <div class="controls__item">
                            <img src={fig2} alt='...' />
                            <span id="count-circle-mobile">0</span>
                        </div>

                        <div class="controls__item">
                            <img src={fig3} alt='...' />
                            <span id="count-angle-mobile">0</span>
                        </div>

                        <div class="controls__item">
                            <img src={fig4} alt='...' />
                            <span id="count-cube_d-mobile">0</span>
                        </div>

                        <div class="controls__item">
                            <img src={fig5} alt='...' />
                            <span id="count-circle_d-mobile">0</span>
                        </div>
                    </div> */}
                </div>


                <canvas id="pdf-renderer">

                </canvas>

                <div class="popup-menu">
                    <button onClick={() => navigate("/")} id="cleaner">
                        <img src={clean} alt='...' />
                        Очистить схему
                    </button>

                    <button onClick={handleSendToPrint} id="printer">
                        <img src={print} alt='...' />
                        Отправить в печать
                    </button>
                    <button onClick={handleSaveToPDF} id="pdf-saver">
                        <img src={pdf} alt='...' />
                        Сохранить в PDF
                    </button>
                    <button id="share">
                        <img src={share} alt='...' />
                        Поделиться
                    </button>
                </div>
            </div>

            <div className="footernd">
                <a href="#">Пользовательское соглашение</a>
                <span>© Photobrix, 2023</span>
            </div>

        </div>
    );
}

export default Step4;
