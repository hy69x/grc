document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Optional: Animate burger bars (simple swap logic or class toggle)
            const bars = hamburger.querySelectorAll('.bar');
            // Logic can be added here if CSS needs helper classes for X animation
        });
    }

    // --- 2. Accordion Logic (Knowledge Hub) ---
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            // Close others (optional - for 'accordion' vs 'expandable' behavior)
            accordions.forEach(other => {
                if (other !== acc) other.classList.remove('active');
            });

            acc.classList.toggle('active');

            // Adjust max-height for smooth animation
            const content = acc.querySelector('.accordion-content');
            if (acc.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- 3. Identification Checklist Logic ---
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const resultBox = document.getElementById('checklistResult');
    const scoreText = document.getElementById('scoreText');

    function checkScore() {
        const checkedCount = document.querySelectorAll('#checklist input:checked').length;

        // Show result if at least 3 are checked (simple arbitrary threshold for demo)
        if (checkedCount >= 3) {
            resultBox.classList.remove('hidden');
            scoreText.textContent = `${checkedCount} / 5 Traits`;
        } else {
            resultBox.classList.add('hidden');
        }
    }

    checkboxes.forEach(box => {
        box.addEventListener('change', checkScore);
    });

    // --- 4. Dropdown Menu Logic ---
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // --- 5. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });

            item.classList.toggle('active');

            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    console.log("Gifted Education CIC - Phase 2 Loaded");
});
