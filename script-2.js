const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
});

sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    const clickedOutsideMenu = !sideMenu.contains(e.target);
    const clickedOutsideButton = !menuBtn.contains(e.target);

    if (sideMenu.classList.contains('open') && clickedOutsideMenu && clickedOutsideButton) {
        sideMenu.classList.remove('open');
    }
});

function toggleContent(element, event) {
    const anchor = event.target.closest('a');
    const selection = window.getSelection();

    if ((anchor && anchor.hasAttribute('href'))
        || (selection && selection.toString().length > 0)) {
        return;
    }

    element.classList.toggle('open');
}

function setupCaptionHoverColors() {
    document.querySelectorAll('.caption.default-show').forEach((el) => {
        const baseBg = el.getAttribute('base-bg');
        const hoverBg = el.getAttribute('hover-bg');
        const hoverColor = el.getAttribute('hover-color');

        const baseColor = window.getComputedStyle(el).color;

        el.style.backgroundColor = baseBg;

        const parent = el.closest('.hover-caption');
        if (!parent) return;

        parent.addEventListener('mouseenter', () => {
            el.style.backgroundColor = hoverBg;
            el.style.color = hoverColor;
        });

        parent.addEventListener('mouseleave', () => {
            el.style.backgroundColor = baseBg;
            el.style.color = baseColor;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCaptionHoverColors();
});

document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('#filters input[type="radio"]');
    const apCheckbox = document.getElementById('ap-filter');
    const rows = document.querySelectorAll('#courses tr');

    function updateVisibility() {
        const selected = document.querySelector('#filters input[type="radio"]:checked').value;
        const apChecked = apCheckbox.checked;

        rows.forEach(row => {
            const tags = row.dataset.tags.split('|');
            let visible = (selected === "All" || tags.includes(selected));

            if (tags.includes("AP") && !apChecked) {
                visible = false;
            }

            row.style.display = visible ? "" : "none";
        });
    }

    radios.forEach(radio => radio.addEventListener('change', updateVisibility));
    apCheckbox.addEventListener('change', updateVisibility);

    updateVisibility();
});

document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list");
    const detailBlocks = document.querySelectorAll(".project-details");
    const container = document.getElementById("project-details-container");

    const projects = Array.from(projectList.querySelectorAll(".project-item"));
    let currentlyVisibleId = null;

    projects.forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.detailId;
            const selected = document.getElementById(targetId);

            if (currentlyVisibleId === targetId) {
                selected.classList.add("hidden");
                container.classList.add("hidden");
                currentlyVisibleId = null;
                return;
            }

            detailBlocks.forEach(block => block.classList.add("hidden"));

            if (selected) {
                selected.classList.remove("hidden");
                container.classList.remove("hidden");
                selected.scrollIntoView({ behavior: "smooth", block: "start" });
                currentlyVisibleId = targetId;
            }
        });
    });

    const params = new URLSearchParams(window.location.search);
    const projectParam = params.get("project");
    if (projectParam) {
        const autoItem = projects.find(item => item.dataset.detailId === "project-"
                                                + projectParam);
        if (autoItem) {
            autoItem.click();
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', () => {
            const li = box.closest('li');

            if (!li) return;

            // 1. Toggle all descendants
            const descendants = li.querySelectorAll('input[type="checkbox"]');
            descendants.forEach(child => {
                if (child !== box) {
                    child.checked = box.checked;
                }
            });
        });
    });
});