// ------------------ Insect Page Trigger with Animation ------------------
const secretTrigger = document.getElementById('secret-trigger');
const insectPage = document.getElementById('insect-page');
const codeViewer = document.getElementById('code-viewer');

secretTrigger.addEventListener('click', () => {
    // Start fade-out animation
    insectPage.classList.add('fade-out');

    // After fade-out, hide insect page and fade-in code viewer
    setTimeout(() => {
        insectPage.style.display = 'none';
        codeViewer.style.display = 'flex';
        codeViewer.classList.add('fade-in');
    }, 600); // 600ms matches fadeOut duration in CSS
});

// ------------------ Sidebar Scroll Spy ------------------
const sidebarLinks = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.content section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ------------------ Copy Buttons ------------------
const codeBoxes = document.querySelectorAll('.code-box');

codeBoxes.forEach(box => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.classList.add('copy-btn');
    box.appendChild(copyBtn);

    const tooltip = document.createElement('span');
    tooltip.textContent = 'Click to copy';
    tooltip.classList.add('tooltip');
    copyBtn.appendChild(tooltip);

    copyBtn.addEventListener('click', () => {
        const code = box.querySelector('pre code').innerText;
        navigator.clipboard.writeText(code);
        tooltip.textContent = 'Copied!';
        setTimeout(() => { tooltip.textContent = 'Click to copy'; }, 1500);
    });
});

// ------------------ Resizable Sidebar ------------------
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
let isResizing = false;
let lastDownX = 0;

sidebar.addEventListener('mousedown', e => {
    if (e.offsetX > sidebar.offsetWidth - 10) {
        isResizing = true;
        lastDownX = e.clientX;
        document.body.style.cursor = 'ew-resize';
    }
});

document.addEventListener('mousemove', e => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < 500) {
        sidebar.style.width = newWidth + 'px';
        content.style.marginLeft = newWidth + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});
