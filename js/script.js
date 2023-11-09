let currentTab = 0;
const tabList = document.getElementsByClassName("tab");
const stepList = document.getElementsByClassName("step");
showTab(currentTab)

function showTab(tabNum) {
    // Display the current tab
    tabList[tabNum].style.display = "block";

    // Change button name according to current tab
    if (tabNum === (tabList.length - 1)) {
        document.getElementById("continue").textContent = "Confirm";
    } else {
        document.getElementById("continue").textContent = "Continue";
    }

    // Display correct step indicator
    updateStep(tabNum);
}

function updateStep(tabNum) {
    // Remove the "active" class of all steps
    for (let step of stepList) {
        step.className = step.className.replace(" active", "");
    }

    // Add "active" class to current step
    stepList[tabNum].className += " active";
}

function nextTab() {
    // Mark previous tab as finished and hide it
    stepList[currentTab].className += " finish";
    tabList[currentTab].style.display = "none";

    // Move to next tab
    currentTab++;

    // Check if form has been completed
    if (currentTab >= tabList.length) {
        document.getElementById("regForm").submit();
        return false;
    }

    // Display new tab
    showTab(currentTab);
}