function validform(form) {
    const name = form["contact[Name]"].value.trim();
    const email = form["contact[email]"].value.trim();
    const content = form["contact[body]"].value.trim();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    // Check if the name field is empty
    if (name === "") {
        alert("Vui lòng nhập họ và tên.");
        return false;
    }

    // Check if the email is in the correct format
    if (!emailPattern.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return false;
    }

    // Check if the content field is empty
    if (content === "") {
        alert("Vui lòng nhập nội dung liên hệ.");
        return false;
    }

    // If all fields are valid, allow form submission
    alert("Form is valid. Submitting...");
    return true;
}
