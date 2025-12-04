document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll(".svg-inline");

  svgImages.forEach(async (img) => {
    const src = img.src;

    try {
      const res = await fetch(src);
      const text = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "image/svg+xml");
      const svg = doc.querySelector("svg");

      if (!svg) return;

      // Copy all attributes from <img> to <svg>
      for (const attr of img.attributes) {
        if (attr.name !== "src") {
          svg.setAttribute(attr.name, attr.value);
        }
      }

      // Clean unwanted attributes
      svg.removeAttribute("xmlns:a");

      img.replaceWith(svg); // Replace <img> with inline <svg>
    } catch (e) {
      console.error("Error inlining SVG:", e);
    }
  });
});
