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

    const workflowForms = document.querySelectorAll('#teacherForm, #parentForm');

    function showWorkflowStep(form, step) {
        const steps = form.querySelectorAll('.workflow-step');
        steps.forEach(section => {
            if (section.dataset.step === step) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        const containerCard = form.closest('.workflow-card');
        if (!containerCard) return;
        const indicators = containerCard.querySelectorAll('.workflow-step-indicator');
        indicators.forEach(indicator => {
            if (indicator.dataset.step === step) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function updateTeacherSummary(form) {
        const traits = form.querySelectorAll('input[name="teacherTraits"]:checked').length;
        const behaviours = form.querySelectorAll('input[name="teacherBehaviours"]:checked').length;
        const total = traits + behaviours;

        const summaryCard = document.getElementById('teacherSummaryCard');
        const badge = document.getElementById('teacherSummaryBadge');
        const content = document.getElementById('teacherSummaryContent');

        if (!summaryCard || !badge || !content) return;

        badge.classList.remove('summary-badge--high', 'summary-badge--moderate', 'summary-badge--low');

        let badgeText = 'Few indicators noticed';
        let badgeClass = 'summary-badge--low';
        let intro = 'You have selected a small number of indicators. This may suggest emerging strengths or that you need more time to observe.';

        if (total >= 5) {
            badgeText = 'Many indicators noticed';
            badgeClass = 'summary-badge--high';
            intro = 'You have selected many traits and classroom patterns often seen in gifted learners.';
        } else if (total >= 3) {
            badgeText = 'Some indicators noticed';
            badgeClass = 'summary-badge--moderate';
            intro = 'You have selected a few traits that might point towards higher potential.';
        }

        badge.textContent = badgeText;
        badge.classList.add(badgeClass);

        const recommendations = [];

        if (traits >= 3) {
            recommendations.push('Offer more open-ended tasks or extension work within your subject.');
        }

        if (behaviours > 0) {
            recommendations.push('Schedule a short one-to-one check-in to understand the student\'s perspective on classwork.');
        }

        recommendations.push('Discuss your observations with a fellow teacher or school counsellor and decide whether formal identification or enrichment is needed.');
        recommendations.push('Share strengths with the family during PTM so that school and home can coordinate support.');

        const listItems = recommendations.map(item => '<li>' + item + '</li>').join('');
        content.innerHTML = '<p>' + intro + '</p><ul>' + listItems + '</ul>';

        summaryCard.classList.remove('hidden');
    }

    function updateParentSummary(form) {
        const concerns = Array.from(form.querySelectorAll('input[name="parentConcerns"]:checked')).map(c => c.value);
        const interests = Array.from(form.querySelectorAll('input[name="parentInterests"]:checked')).map(c => c.value);

        const summaryCard = document.getElementById('parentSummaryCard');
        const badge = document.getElementById('parentSummaryBadge');
        const content = document.getElementById('parentSummaryContent');

        if (!summaryCard || !badge || !content) return;

        badge.classList.remove('summary-badge--high', 'summary-badge--moderate', 'summary-badge--low');

        let badgeText = 'Starter plan';
        let badgeClass = 'summary-badge--moderate';

        if (concerns.length === 0 && interests.length === 0) {
            badgeText = 'Begin by observing';
            badgeClass = 'summary-badge--low';
        } else if (concerns.length >= 3) {
            badgeText = 'Focused support';
            badgeClass = 'summary-badge--high';
        }

        badge.textContent = badgeText;
        badge.classList.add(badgeClass);

        const recommendations = [];

        if (concerns.includes('bored')) {
            recommendations.push('Add one enrichment activity this week aligned with your child\'s interests (project, puzzle, advanced book).');
        }

        if (concerns.includes('perfectionism')) {
            recommendations.push('Normalise mistakes at home by sharing your own learning stories and praising effort, not only results.');
        }

        if (concerns.includes('social')) {
            recommendations.push('Help your child connect with like-minded peers through clubs, hobby classes, or school activities.');
        }

        if (concerns.includes('emotional')) {
            recommendations.push('Create a short daily check-in routine where your child can talk about their day without judgement.');
        }

        if (concerns.includes('underachievement')) {
            recommendations.push('Talk to teachers about whether the work feels too easy or too hard and explore options for differentiation.');
        }

        if (interests.includes('stem')) {
            recommendations.push('Plan one hands-on STEM activity this week (simple experiment, robotics kit, coding challenge).');
        }

        if (interests.includes('arts')) {
            recommendations.push('Set aside a weekly creativity block for drawing, music, dance, or theatre.');
        }

        if (interests.includes('language')) {
            recommendations.push('Visit a library or set up a small reading corner at home and explore age-appropriate books together.');
        }

        if (interests.includes('leadership')) {
            recommendations.push('Encourage your child to organise a small project at home or in the community (e.g., book swap, family science evening).');
        }

        if (interests.includes('other')) {
            recommendations.push('Notice and appreciate the unique interest your child has chosen and look for low-cost ways to nurture it.');
        }

        if (recommendations.length === 0) {
            recommendations.push('Spend this week simply observing your child\'s play, questions, and energy patterns, and make a few notes for yourself.');
        }

        const listItems = recommendations.map(item => '<li>' + item + '</li>').join('');
        content.innerHTML = '<p>Here is a simple plan you can try over the next 1-2 weeks:</p><ul>' + listItems + '</ul>';

        summaryCard.classList.remove('hidden');
    }

    function resetWorkflow(form) {
        form.reset();
        showWorkflowStep(form, '1');

        if (form.id === 'teacherForm') {
            const summaryCard = document.getElementById('teacherSummaryCard');
            if (summaryCard) summaryCard.classList.add('hidden');
        }

        if (form.id === 'parentForm') {
            const summaryCard = document.getElementById('parentSummaryCard');
            if (summaryCard) summaryCard.classList.add('hidden');
        }
    }

    workflowForms.forEach(form => {
        form.addEventListener('click', (event) => {
            const target = event.target.closest('button');
            if (!target) return;

            if (target.classList.contains('next-step')) {
                const step = target.getAttribute('data-target');
                if (step) {
                    showWorkflowStep(form, step);
                    if (form.id === 'teacherForm' && step === '4') {
                        updateTeacherSummary(form);
                    }
                    if (form.id === 'parentForm' && step === '4') {
                        updateParentSummary(form);
                    }
                }
            } else if (target.classList.contains('prev-step')) {
                const step = target.getAttribute('data-target');
                if (step) {
                    showWorkflowStep(form, step);
                }
            } else if (target.classList.contains('reset-workflow')) {
                event.preventDefault();
                resetWorkflow(form);
            }
        });
    });

    console.log("Gifted Education CIC - Phase 2 Loaded");
});
