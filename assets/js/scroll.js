let scrollTimeout = null;
function handleScrollListener() {
    updateBackground();
    document.addEventListener('scroll', () => {
        const page = document.querySelector('.page')?.id;
        if (page === 'page-index') {
            if (scrollTimeout)
                clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(scrollToNearestSection, 300);
            updateBackground();
        }
    });
}
function updateBackground() {
    if (document.querySelector('#menu').style.display != 'none') {
        return;
    }
    const totalHeight = document.body.scrollHeight;
    const bgNumber = Math.round((window.scrollY / totalHeight) * 4) + 1;
    const bg = document.querySelector('#background');
    if (!bg)
        return;
    bg.dataset.bgDesign = String(bgNumber);
}
/******************* / *******************/
function scrollToSection(no) {
    let totalHeight = document.body.scrollHeight;
    let sectionHeight = totalHeight / 4;
    smoothScrollTo(sectionHeight * no, 1500);
}
function scrollToNearestSection() {
    let totalHeight = document.body.scrollHeight;
    let sectionHeight = totalHeight / 4;
    let currentScroll = window.scrollY;
    let bgNumberZ = Math.round((currentScroll / totalHeight) * 4);
    let spos = sectionHeight * (bgNumberZ);
    let accuracyIndex = Math.abs(currentScroll % (sectionHeight));
    if (accuracyIndex > sectionHeight / 2)
        accuracyIndex = sectionHeight - accuracyIndex;
    accuracyIndex = accuracyIndex / sectionHeight;
    if (Number.isNaN(accuracyIndex))
        accuracyIndex = 0;
    if (accuracyIndex >= 0.02 && accuracyIndex <= 0.2) {
        smoothScrollTo(spos, 6000 * accuracyIndex);
    }
}
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    function animationStep(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }
    requestAnimationFrame(animationStep);
}
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
export { handleScrollListener };
window.scrollToSection = scrollToSection;
