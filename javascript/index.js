// module화
import DataGenerator from "./dataGenerator.js";
import MainPageEvent from "./main.js";

const dataGenerator = new DataGenerator();
const mainPageEvent = new MainPageEvent();

dataGenerator.setup();
// /module화

// wrap 스크롤에 따라 width 값 조정
function pageScroll() {
  const wrapElements = document.querySelectorAll(".wrap");
  const hasScroll = window.innerWidth > document.documentElement.clientWidth;

  if (hasScroll) {
    wrapElements.forEach((wrap) => {
      wrap.classList.add('scroll');
    });
  } else {
    wrapElements.forEach((wrap) => {
      wrap.classList.remove('scroll');
    });
  }
}

document.addEventListener("DOMContentLoaded", pageScroll);

window.addEventListener('resize', pageScroll);
// /wrap 스크롤에 따라 width 값 조정


// url 설정

// /url 설정

