# Portfolio Website Template

A clean, modern, and responsive portfolio website template built with HTML, CSS, and vanilla JavaScript. Features basic language switching support (EN/ID).

## Features

*   Responsive Design (Mobile-first approach)
*   Language Switching Placeholder (EN/ID)
*   Smooth Scrolling Navigation
*   CSS Custom Properties for easy styling
*   Semantic HTML5 structure
*   Vanilla JavaScript (No external libraries needed for core functionality)
*   Fullscreen mobile navigation with animated toggle
*   Sections for Hero, About, Skills, Services, Projects, Testimonials, Contact

## Customization

1.  **Personal Information:**
    *   Open `index.html`.
    *   Search for placeholders like `[Your Name]`, `Your City`, `your.email@example.com`. Replace them with your details.
    *   Update the generic text in the "About Me" section.
    *   Update the social media links (`href` attributes) in the Contact section to your actual profile URLs.
    *   Update the copyright year/name in the Footer.
2.  **Images:**
    *   Replace the profile picture URL (`img src="..."`) in the "About Me" section.
    *   Replace project image URLs (`img src="..."`) in the "Projects" section. Ensure corresponding `alt` text is updated for accessibility.
3.  **Skills:**
    *   Modify the list items (`<li>`) within `<ul class="skills-list">` in the "Skills" section to reflect your actual skills.
4.  **Services:**
    *   Update the text content for each `.service-item`. Rename or remove the "Additional Service" item as needed.
5.  **Projects:**
    *   Update the content within each `.project-card`:
        *   Project title (`<h3>`)
        *   Tech stack (`.tech-stack`)
        *   Description paragraphs (replace Lorem Ipsum)
        *   Project link URL (`a href="..."`)
6.  **Testimonials:**
    *   Replace the placeholder quotes and citations within each `.testimonial-item` with real testimonials if you have them, or remove the section.
7.  **Styling (Optional):**
    *   Modify CSS variables in `assets/css/main.css` (`:root` section) to change the color scheme (primary colors, surface colors, text colors).
    *   Adjust other styles in `assets/css/main.css` as needed.
8.  **Language Switching (Advanced):**
    *   The template uses `<span lang="en">...` and `<span lang="id">...`.
    *   To add/remove languages, modify the `lang` attributes, the corresponding buttons in `index.html`, and the language switching logic in `assets/js/main.js`.

## Deployment

You can deploy this template to various static hosting platforms like GitHub Pages, Netlify, Vercel, etc.

## License

(Consider adding a license like MIT License if you want others to freely use and modify it)

This template is provided as-is. Feel free to use and modify it for your own portfolio.
