let currentTab = 0;
let inputName, inputEmail;
const tabList = document.getElementsByClassName("tab");
const stepList = document.getElementsByClassName("step");
const topicList = document.getElementsByClassName("topic");

// Adds event listeners to all topics on page 2
for (let topic of topicList) {
    topic.addEventListener("click", () => {
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

    // Change button name according to current tab, display proper contents for last page
    if (tabNum === tabList.length - 1) {
        document.getElementById("continue").textContent = "Confirm";

        document.getElementById("name-val").textContent = inputName;
        document.getElementById("email-val").textContent = inputEmail;
        let topics = document.getElementById("topics");
        for (let topic of topicList) {
            if (topic.className.includes(" selected")) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(topic.textContent));
                topics.appendChild(li);
            }
        }
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
    document.getElementById("step-count").textContent =
        "Step " + (currentTab + 1) + " of 3";
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

    // Form has been completed
    if (currentTab >= tabList.length) {
        alert("✅ Success");
        document.getElementById("regForm").submit();
        return false;
    }

    // Display new tab
    showTab(currentTab);
}

function validateForm() {
    // Form is valid by default, get input field values
    let valid = true;
    const inputList = tabList[currentTab].getElementsByTagName("input");

    if (currentTab === 0) {
        // Check if name and email are valid
        // if not, prompt user with warnings
        let re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const warning = document.getElementsByClassName("warning");

        inputName = inputList[0].value;
        inputEmail = inputList[1].value;

        function validateInput(input, index){
            if(input === "" || (!re.test(input) && index)){
                valid = false;
                warning[index].style.display = "block";
                inputList[index].className = "invalid";
            } else {
                warning[index].style.display = "none";
                inputList[index].className = "";
            }
        }

        validateInput(inputName, 0);
        validateInput(inputEmail, 1);

    }
    if (currentTab === 1) {
        // Invalid if no topics are selected
        valid = false;
        for (let topic of topicList) {
            valid |= topic.className.includes("selected");
        }
    }

    // Return result
    return valid;
}
