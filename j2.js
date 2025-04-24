// Create the popup HTML
const popupHTML = `
    <div class="popup-overlay" id="popup" style="display: none;position: fixed;top: 0; left: 0;width: 100%; height: 100%;background: rgba(0, 0, 0, 0.5);justify-content: center;align-items: center;z-index: 9999;">
        <div class="popup-box" style="background: #fff;padding: 20px 30px;border-radius: 10px;text-align: center;box-shadow: 0 0 20px rgba(0,0,0,0.2);max-width: 300px;">
            <img style="width: 100%;" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpe6ABsCCuF4hDX1_nhEfsWfesrXRhvVbyp8tFaopzNFePND1rCTRjLB06u59Kzr8CP-ww3nu7oKHX-r8Citn-KKwdaFOD94AwIJejnjngN2dBqR0TlcJpKFSn6malsSV6HSuRllGGHu8L5psnZQtmYfatscH0pUxe_w6QaouWuU2e4H8kWAuXAYDmO5eI/s1600/hourglass.gif">
            <p style="font-family: verdana;font-size: 2rem;font-weight: 900;">Start Test</p>
            <button style="background: green; color: white;   border: none;   width: 100px;   cursor: pointer;   font-size: 2rem;   padding: 5px 0;   border-radius: 25px;" background: green;" onclick="redirectToTest()">Yes</button>
            <button style="background: crimson; color: white;   border: none;   width: 100px;   cursor: pointer;   font-size: 2rem;   padding: 5px 0;   border-radius: 25px;" background: crimson;" onclick="closePopup()">No</button>
        </div>
    </div>
`;

// Append popup to body
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    setTimeout(() => {
        document.getElementById('popup').style.display = 'flex';
    }, 10000);
});

// Redirect function
function redirectToTest() {
    window.location.href = link;
}

// Close popup function
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
