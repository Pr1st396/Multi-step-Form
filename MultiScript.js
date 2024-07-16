document.addEventListener("DOMContentLoaded", function () {
    const steps = Array.from(document.querySelectorAll(".card"));
    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const confirm = document.getElementById("confirm");
    const form = document.getElementById("userInformation");
    const counter = document.querySelector('.counter');
    const circles = document.querySelectorAll('.circle');

    let currentStep = 0;

    function showStep(step) {
        steps.forEach((el, index) => {
            el.classList.toggle("active", index === step);
        });
        updateProgress(step + 1);
    }

    function validateStep(step) {
        const inputs = steps[step].querySelectorAll("input");
        let valid = true;
        inputs.forEach((input) => {
            if (!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });
        return valid;
    }

    function fillSummary() {
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const topics = document.querySelectorAll('input[name="products"]:checked');
        const summaryTopics = document.getElementById('summaryTopics');
    
        document.getElementById('summaryUserName').textContent = userName;
        document.getElementById('summaryUserEmail').textContent = userEmail;
    
        const topicList = Array.from(topics).map((topic) => `<li>${topic.value}</li>`).join('');
        summaryTopics.innerHTML = topicList;
    }

    function updateProgress(step) {
        counter.textContent = `Step ${step} of 3`;
        circles.forEach((circle, index) => {
            if (index < step) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }

    next1.addEventListener("click", () => {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    next2.addEventListener("click", () => {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            fillSummary();
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            alert("Form submitted!");
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });

    showStep(currentStep);
});
