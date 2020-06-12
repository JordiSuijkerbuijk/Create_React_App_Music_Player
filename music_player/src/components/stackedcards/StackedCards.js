import React, { useEffect, useState } from 'react';

import style from './stackedCards.scss';

function StackedCards() {
  let position = 0;
  const [eventListener, setEventListener] = useState(false);

  function myFunction(e, wrapper, body, sectionWrapper, scale) {
    const clientHeight = wrapper.children[0].clientHeight;
    let deltaY = 0;
      
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

    if (window.pageYOffset < wrapper.offsetParent.offsetTop - 250) {
      for (var i2 = 0; i < wrapper.children.length; i2++) {
        wrapper.children[i].style.transform = `translateY(0px)`;
        // sectionWrapper.style.height = `${clientHeight - 5 + wrapper.children.length * 20}px`;
      }
    }
  }

  function scrolledFunction(wrapper) {
    const clientHeight = wrapper.children[0].clientHeight;
    if (position >= 0 && window.pageYOffset >= (wrapper.offsetParent.offsetTop - 250) && window.pageYOffset < (clientHeight * (wrapper.children.length - 1))){
      if (wrapper.children[wrapper.children.length - 1].style.transform === "translateY(-1365px)") {
        return false;
      }
      return true;
    }
    else if (position < 0) {
      return false;
    }
  }

  function testFunction (e, wrapper, body, sectionWrapper, scale ){
    const clientHeight = wrapper.children[0].clientHeight;

    if (scrolledFunction(wrapper) === true) {
      if(window.pageYOffset >= (wrapper.offsetParent.offsetTop - 250) && window.pageYOffset < (clientHeight * (wrapper.children.length - 1))) {
        if(window.scrollY > wrapper.offsetParent.offsetTop - 250) {
          window.scrollTo(0, wrapper.offsetParent.offsetTop - 250);
        }

        body.style.overflow = 'hidden';
        myFunction(e, wrapper, body, sectionWrapper, scale)
      }
    }
    else {
      body.style.overflow = 'auto';
    }
  }

  useEffect(() => {
    const wrapper = document.querySelector('#wrapper');
    const sectionWrapper = document.querySelector('#sectionWrapper');
    const body = document.querySelector('body');
    const clientHeight = wrapper.children[0].clientHeight;
    let scale = [];

    for (var i = 0; i < wrapper.children.length; i++) {
      scale = [...scale, 1];
    }

    console.log(wrapper.offsetParent.offsetTop - 250);

    if (eventListener !== true) {
      // 
      body.addEventListener('wheel', (e) => testFunction(e, wrapper, body, sectionWrapper, scale));

      if (window.pageYOffset > clientHeight * (wrapper.children.length - 1)) {
        position = clientHeight * (wrapper.children.length - 1);

        for (var i = 0; i < wrapper.children.length; i++) {
          wrapper.children[i].style.transform = `translateY(-${
            clientHeight * i
          }px)`;
          sectionWrapper.style.height = `${
            clientHeight - 5 + wrapper.children.length * 20
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
