function loadEmojis() {
    const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'b', 'i'];
    document.querySelectorAll('emoji').forEach(el => {
        const replacement = document.createElement('img');

        for (let attr of el.attributes) replacement.setAttribute(attr.name, attr.value);
        replacement.setAttribute('emoji', '');
        replacement.setAttribute('emoji-text', textElements.includes(el.parentNode.tagName.toLowerCase()));

        replacement.src = `/assets/emojis/color/${el.innerHTML.trim()}.svg`;
        // replacement.alt = el.getAttribute('alt') || `{${el.innerHTML.trim()}}`;
        replacement.alt = '';
        replacement.loading = 'lazy';

        el.parentNode.replaceChild(replacement, el);
    });
}


export { loadEmojis };