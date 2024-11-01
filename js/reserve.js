//button event
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const searchingButton = document.getElementById('searchingButton');
    const reservationTable = document.getElementById('reservationTable');

    // Lưu và in ngày
    searchingButton.addEventListener('click', () => {
        const selectedDate = dateInput.value;
        const selectedTime = timeInput.value;
        const selectedAccommodation = accommodationInput.value;

        if (selectedDate && selectedTime && selectedAccommodation) {
            const [hours, minutes] = selectedTime.split(':').map(Number);

            // Kiểm tra nếu giờ nằm trong khoảng 8:00 - 22:00
            if (hours >= 8 && hours < 22) {
                localStorage.setItem('savedDate', selectedDate);
                const formattedDate = formatDate(selectedDate);
                const formattedTime = formatTime(selectedTime);

                // Cập nhật ngày và thời gian vào bảng
                const dateCells = document.querySelectorAll('.date-cell');
                dateCells.forEach(cell => {
                    cell.innerHTML = formattedDate;
                });

                const timeCells = document.querySelectorAll('.time-cell');
                timeCells.forEach(cell => {
                    cell.innerHTML = formattedTime;
                });

                const accommodationCells = document.querySelectorAll('.accommodation-cell');
                accommodationCells.forEach(cell => {
                    cell.innerHTML = selectedAccommodation;
                });

                // Hiển thị bảng và ẩn nút
                reservationTable.style.visibility = "visible";
                searchingButton.style.visibility = "hidden";
                resetButton.style.visibility = "visible";
                document.getElementById('pick').innerHTML = "Ngày, giờ, số khách đã chọn";
            } else {
                alert('Đã quá giờ hoạt động của quán. Vui lòng chọn giờ từ 08:00 đến 22:00.');
            }
        }
        else if (!selectedDate) {
            alert('Vui lòng chọn ngày.');
        }
        else if (!selectedTime) {
            alert('Vui lòng chọn giờ.');
        }
        else if (!selectedAccommodation) {
            alert('Vui lòng chọn số người.');
        }
    });

    resetButton.addEventListener('click', () => {
        reservationTable.style.visibility = "hidden";
        searchingButton.style.visibility = "visible";
        resetButton.style.visibility = "hidden";
        document.getElementById('pick').innerHTML = "Nhập ngày, giờ và số khách";
        alert('Hãy chọn lại thời gian đặt bàn');
    });

    // Định dạng ngày
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Định dạng thời gian
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const startHour = String(Math.floor(hours)).padStart(2, '0');
        const startMinute = '00';
        const endHour = String(Math.floor(hours) + 1).padStart(2, '0');
        return `${startHour}:${startMinute}-${endHour}:${startMinute}`;
    }
});


//checknull
function checknull(txt) {
    if (txt.value.length == 0)
        return false;
    else
        return true;
}

//popup1
function popupFn() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupDialog").style.display = "block";
}

//popup2
function popupFn2() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupDialog").style.display = "none";
    document.getElementById("overlay2").style.display = "block";
    document.getElementById("popupDialog2").style.display = "block";
    if (checknull(ipname)) {
        const username = document.getElementById('ipname').value;
        document.getElementById('opname').textContent = username;
    }
    if (checknull(ipcontact)) {
        const contact = document.getElementById('ipcontact').value;
        document.getElementById('opcontact').textContent = contact;
    }
    if (checknull(ipnote)) {
        const note = document.getElementById('ipnote').value;
        document.getElementById('opnote').textContent = note;
    }
}

//closepopup
function closeFn() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupDialog").style.display = "none";
    document.getElementById("overlay2").style.display = "none";
    document.getElementById("popupDialog2").style.display = "none";
}

//validform
function validform(f) {
    const contact = document.getElementById('ipcontact').value;
    if (checknull(f.ipname) == false) {
        alert("Tên khách hàng không thể để trống");
        f.ipname.focus();
        return;
    }
    else if (checknull(f.ipcontact) == false) {
        alert("Liên hệ không thể để trống");
        f.ipcontact.focus();
        return;
    }
    else if (containsAtSymbol(contact) == true) {
        if (isValidEmail(contact) == false) {
            alert("Email sai");
        }
        else popupFn2();
    }
    else if (containsAtSymbol(contact) == false) {
        if (isValidPhoneNumber(contact) == false) {
            alert("Số điện thoại sai");
        }
        else popupFn2();
    }
}

//check @
function containsAtSymbol(text) {
    return text.includes("@");
}

//validphonenumber
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^(03|05|07|08|09|01|02|04|06|)\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

//validemail
function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}