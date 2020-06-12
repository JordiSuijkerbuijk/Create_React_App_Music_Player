import React, { useEffect, useState } from 'react';

import style from './stackedCards.scss';

function StackedCards() {
  let position = 0;
  const [eventListener, setEventListener] = useState(false);

  function myFunction(e, wrapper, body, sectionWrapper, scale) {
    const clientHeight = wrapper.children[0].clientHeight;
    let deltaY = 0;

    if (
      window.pageYOffset > wrapper.offsetParent.offsetTop - 100 &&
      window.pageYOffset < wrapper.offsetParent.offsetTop
    ) {
      if (position > clientHeight * (wrapper.children.length - 1)) {
        body.style.overflow = 'auto';
      } else if (position <= 0) {
        body.style.overflow = 'auto';
      } else if (
        window.pageYOffset > wrapper.offsetParent.offsetTop - 100 &&
        window.pageYOffset < wrapper.offsetParent.offsetTop
      ) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'hidden';
      }

      // determine scrollspeed, so that scrolling won't be to fast;
      if (e.deltaY > 0) {
        deltaY = e.deltaY > 3 ? 3 : e.deltaY;
        position += deltaY * 2.5;
      } else {
        deltaY = e.deltaY < -3 ? -3 : e.deltaY;
        position += position <= 0 ? 0 : deltaY * 2.5;
      }

      if (wrapper.children.length >= 0) {
        for (var i = 0; i < wrapper.children.length; i++) {
          if (i > 0) {
            if (position <= i * clientHeight) {
              wrapper.children[i].style.transform = `translateY(-${position}px) scale(${
                scale[i] > 1 ? 1 : scale[i]
              })`;
              // sectionWrapper.style.height = `${400 * wrapper.children.length - position + 100}px`;
            } else {
              wrapper.children[i].style.transform = `translateY(-${clientHeight * i - i * 5}px)`;
            }
          }
          if (position > (i + 1) * clientHeight) {
            if (deltaY < 0) {
              if (scale[i] <= 1) {
                scale[i] += 0.0002;
              }
            } else {
              if (scale[i] > 1 - (wrapper.children.length - i) * 0.01) {
                scale[i] -= 0.0002;
              } else {
                scale[i] = 1 - (wrapper.children.length - i) * 0.01;
              }
            }

            wrapper.children[i].style.transform = `translateY(-${
              i * clientHeight - i * 5
            }px) scale(${scale[i] > 1 ? 1 : scale[i]})`;
          }
        }
      }

      // if (i === 0) {
      //   if (position > (i + 1) * clientHeight - 5) {
      //     if (
      //       position <
      //       clientHeight - 5 * (wrapper.children.length - 1) + wrapper.children.length * 20
      //     ) {
      //       scale[i] = e.deltaY < 0 ? scale[i] + 0.0002 : scale[i] - 0.0002;
      //       wrapper.children[i].style.transform = `scale(${scale[i] > 1 ? 1 : scale[i]})`;
      //     }
      //   } else if (
      //     e.pageY < wrapper.offsetParent.offsetTop + 100 + wrapper.children.length * 20 ||
      //     position ===
      //       (wrapper.offsetParent.offsetTop - 5) * (wrapper.children.length - 1) +
      //         wrapper.children.length * 20
      //   ) {
      //     wrapper.children[i].style.transform = `scale(1)`;
      //     scale[i] = 1;
      //   }
      // }
    } else if (window.pageYOffset < wrapper.offsetParent.offsetTop - 100) {
      for (var i2 = 0; i < wrapper.children.length; i2++) {
        wrapper.children[i].style.transform = `translateY(0px)`;
        // sectionWrapper.style.height = `${clientHeight - 5 + wrapper.children.length * 20}px`;
      }
    }
  }

  useEffect(() => {
    const wrapper = document.querySelector('#wrapper');
    const sectionWrapper = document.querySelector('#sectionWrapper');
    const body = document.querySelector('body');
    let scale = [];

    for (var i = 0; i < wrapper.children.length; i++) {
      scale = [...scale, 1];
    }

    if (eventListener !== true) {
      body.addEventListener('wheel', (e) => myFunction(e, wrapper, body, sectionWrapper, scale));

      if (window.pageYOffset > wrapper.children[0].clientHeight * (wrapper.children.length - 1)) {
        position = wrapper.children[0].clientHeight * (wrapper.children.length - 1);

        for (var i = 0; i < wrapper.children.length; i++) {
          wrapper.children[i].style.transform = `translateY(-${
            wrapper.children[0].clientHeight * i
          }px)`;
          sectionWrapper.style.height = `${
            wrapper.children[0].clientHeight - 5 + wrapper.children.length * 20
          }px`;
        }
      }

      setEventListener(true);
    }
  }, []);

  return (
    <section class="stackedCards" id="sectionWrapper">
      <div class="test">
        <div class="wrapper" id="wrapper">
          <div class="stackedCard">
            <div class="text">
              <h1 style={{ color: '#023171', fontWeight: 100, lineHeight: '36px' }}>
                Worry-free time saver
              </h1>
              <p style={{ fontSize: 16 }}>
                Supports complex multi tier customer order to prevent over collection
              </p>
            </div>
            <img
              class="image"
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            />
          </div>
          <div class="stackedCard">
            <div class="text">
              <h1 style={{ color: '#023171', fontWeight: 100, lineHeight: '36px' }}>
                Worry-free time saver
              </h1>
              <p style={{ fontSize: 16 }}>
                Supports complex multi tier customer order to prevent over collection
              </p>
            </div>
            <img
              class="image"
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            />
          </div>
          <div class="stackedCard">
            <div class="text">
              <h1 style={{ color: '#023171', fontWeight: 100, lineHeight: '36px' }}>
                Worry-free time saver
              </h1>
              <p style={{ fontSize: 16 }}>
                Supports complex multi tier customer order to prevent over collection
              </p>
            </div>
            <img
              class="image"
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            />
          </div>
          <div class="stackedCard">
            <div class="text">
              <h1 style={{ color: '#023171', fontWeight: 100, lineHeight: '36px' }}>
                Worry-free time saver
              </h1>
              <p style={{ fontSize: 16 }}>
                Supports complex multi tier customer order to prevent over collection
              </p>
            </div>
            <img
              class="image"
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StackedCards;
