let currentTab = 2;
const tabList = document.getElementsByClassName("tab");
const stepList = document.getElementsByClassName("step");
const topicList = document.getElementsByClassName("topic");

for (let topic of topicList) {
    topic.addEventListener("click", event => {
        if (topic.className.includes(" selected")) {
            topic.className = topic.className.replace(" selected", "");
        } else {
            topic.className += " selected";
        }
    });
}

showTab(currentTab);

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

    // Update step text
    document.getElementById("step-count").textContent = "Step " + (currentTab + 1) + " of 3";
}

function nextTab() {
    // Exit the function if any field in the current tab is invalid
    if (!validateForm()) {
        return false;
    }

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

function validateForm() {
    let valid = true;
    const inputList = tabList[currentTab].getElementsByTagName("input");

    if (currentTab === 0) {
        let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        valid = inputList[0].value !== "" && re.test(inputList[1].value);
    }
    if (currentTab === 1) {
        valid = false;
        for (let topic of topicList) {
            valid |= topic.className.includes("selected");
        }
    }

    return valid;
}