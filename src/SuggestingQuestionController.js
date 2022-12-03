function validateSuggestionForm() {
    var worked = true;
    if (document.getElementById("question-type").value == "Type of Question:") {
        document.getElementById("question-type-error").style.display = "block";
        worked &&= false;
    }
    else {
        document.getElementById("question-type-error").style.display = "none";
    }
    if (document.getElementById("question-info").value == "") {
        document.getElementById("question-info-error").style.display = "block";
        worked &&= false;
    }
    else {
        document.getElementById("question-info-error").style.display = "none";
    }
    if (!worked) {
        return false;
    }
    alert("Question submitted!");
    location.replace("home.html");
    return true;
}