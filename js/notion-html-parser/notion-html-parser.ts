import { load } from "npm:cheerio@1.0.0-rc.12";
import * as path from "https://deno.land/std/path/mod.ts";

const customIndex = ({
  htmlStr,
  indexTitle,
  matchedColor,
}: {
  htmlStr: string;
  indexTitle?: string;
  matchedColor: string;
}) => {
  const $ = load(htmlStr);
  const existingStyle = $("style").html();

  const newCssRule = `
    @media (max-width: 1029px) {
      nav { display: none !important; }
    }
  `;

  $("html").css("scroll-behavior", "smooth");
  $("style").text(`${existingStyle}\n${newCssRule}`);
  $("body")
    .css("max-width", "1000px")
    .css("display", "flex")
    .css("position", "relative");

  $("article")
    .css("width", "100%")
    .css("height", "fit-content")
    .css("display", "flex")
    .css("flex-direction", "column")
    .css("position", "relative");

  $("header > img")
    .css("border-radius", "4px")
    .css("border", "1px solid #00000008");

  $("nav")
    .insertBefore("body")
    .css("position", "sticky")
    .css("top", "2em")
    .css("padding", "0 0 0 40px")
    .css("min-width", "224px")
    .css("width", "fit-content")
    .css("height", "fit-content")
    .css("display", "flex")
    .css("flex-direction", "column")
    .css("align-items", "flex-start")
    .css("gap", "5px")
    .css("order", "2");
  $("nav > div")
    .css("display", "flex")
    .css("width", "fit-content")
    .css("height", "fit-content")
    .css("border", "none");
  $("nav > div > a").css("border", "none");

  if (indexTitle) {
    $("nav").prepend(
      `<div style="font-weight: 600; margin-bottom: 5px; color: #00000066;">${indexTitle}</div>`
    );
  }

  $("body").append(`<script>
    let ticking = false;
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav > div > a');

    function updateActiveNavLink() {
      if(!nav) return;

      let closestHeadingAboveScreenTop = null;
      const padding = 30;

      headings.forEach((heading) => {
        const distanceFromTop = heading.getBoundingClientRect().top - padding;
        if (distanceFromTop < 0 && (!closestHeadingAboveScreenTop || distanceFromTop > closestHeadingAboveScreenTop.getBoundingClientRect().top)) {
          closestHeadingAboveScreenTop = heading;
        }
      });
  
      navLinks.forEach((link) => {
        link.style.color = '';
      });
  
      if (closestHeadingAboveScreenTop) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + closestHeadingAboveScreenTop.id) {
            link.style.color = '${matchedColor}';
          }
        });
      }
    }

    function initHandler() {
      if(!nav) return;

      const currentHash = window.location.hash;

      document.querySelectorAll('a').forEach(function(link) {
        const linkHash = link.getAttribute('href');

        if (linkHash === currentHash) {
          link.style.color = '${matchedColor}';
        }
      });
    }

    document.addEventListener('DOMContentLoaded', initHandler);

    document.addEventListener('scroll', function(e) {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveNavLink();
          ticking = false;
        });

        ticking = true;
      }
    });
  </script>`);

  return $.html();
};

const changeTitle = ({ htmlStr }: { htmlStr: string }) => {
  const $ = load(htmlStr);

  const viewTitle = $(".page-body > p").first().text();
  $(".page-body > p").first().remove();

  $("header > h1").text(viewTitle);

  return $.html();
};

const removeImgAnchor = ({ htmlStr }: { htmlStr: string }) => {
  const $ = load(htmlStr);

  $("figure").each(function () {
    const $figure = $(this);
    const $a = $figure.find("figure > a");

    $a.each(function () {
      const $img = $(this).find("img");
      $(this).before($img);
      $(this).remove();
    });
  });

  return $.html();
};

const parse = ({
  originHtmlStr,
  indexTitle,
  matchedColor,
}: {
  originHtmlStr: string;
  indexTitle?: string;
  matchedColor: string;
}) => {
  let htmlStr: string;

  htmlStr = customIndex({
    htmlStr: originHtmlStr,
    indexTitle,
    matchedColor,
  });
  htmlStr = changeTitle({ htmlStr: htmlStr });
  htmlStr = removeImgAnchor({ htmlStr: htmlStr });

  return htmlStr;
};

const main = async () => {
  const fileName = "TestNotion cb26fb35f0f8443aa60bc1ac390414a0.html";

  const originHtmlStr = await Deno.readTextFile(
    path.join(new URL(".", import.meta.url).pathname, "TestNotion", fileName)
  );

  const resultHtml = parse({
    originHtmlStr,
    indexTitle: "목차",
    matchedColor: "#f47676",
  });

  await Deno.writeTextFile(
    path.join(new URL(".", import.meta.url).pathname, "_" + fileName),
    resultHtml
  );
};

main();
