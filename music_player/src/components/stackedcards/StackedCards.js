import React, { useEffect, useState } from 'react';

import style from './stackedCards.scss';

function StackedCards() {
  let position = 0;
  const [eventListener, setEventListener] = useState(false);
  function myFunction(e, wrapper, body, sectionWrapper, scale) {

    if ( e.pageY > wrapper.offsetTop + 100) {
        if(position > 400 * (wrapper.children.length - 1)) {
            body.style.overflow = 'auto';
        }
        else if (position === 0) {
            body.style.overflow = 'auto';
        }
        else {
            body.style.overflow = 'hidden';
        }
        let deltaY = 0;

        console.log('pageY', e.pageY - wrapper.offsetTop);

        //scroll power, the higher the deltaY the faster the scroll.
        console.log('position', position);
        if (e.deltaY > 0) {
            deltaY = e.deltaY > 5 ? 5 : e.deltaY;
            position += deltaY * 3;
        } else {
            deltaY = e.deltaY < -5 ? -5 : e.deltaY;
            position += position <= 0 ? 0 : deltaY * 3;
        }

        //   When pageY is higher than the offsetTop of the wrapper + 100 pixels.
        // position = e.deltaY < 0 ? position - deltaY * 1 : position + deltaY * 1;
        // console.log(position);

        if (wrapper.children.length >= 0) {
            for (var i = 0; i < wrapper.children.length; i++) {
                if (i > 0) {
                    if (position <= i * 400) {
                        wrapper.children[i].style.transform = `translateY(-${position}px) scale(${scale[i] > 1 ? 1 : scale[i]})`;
                        sectionWrapper.style.height = `${400 * wrapper.children.length - position + 100}px`;
                    } 
                }
            }
        }

          


          //if the current item i is equal to 0, translateY is newPosition.

          if (i === 0) {

            if (position > (i + 1) * 395) {

              if (position < 395 * (wrapper.children.length - 1) + wrapper.children.length * 20 ) {
                scale[i] = e.deltaY < 0 ? scale[i] + 0.0002 : scale[i] - 0.0002;
                wrapper.children[i].style.transform = `scale(${scale[i] > 1 ? 1 : scale[i]})`;
              }
            } else if ( e.pageY < wrapper.offsetTop + 100 + wrapper.children.length * 20 || position === 395 * (wrapper.children.length - 1) + wrapper.children.length * 20 ) {
              wrapper.children[i].style.transform = `scale(1)`;
              scale[i] = 1;
            }
          }
        // position += e.deltaY;

    //   }

    // } else {

    //   //PageY is higher than offsetTop the cards should start stacked

    //   for (var i2 = 0; i < wrapper.children.length; i2++) {

    //     wrapper.children[i].style.transform = `translateY(-${(400 - 5) *

    //       wrapper.children.length}px)`;

    //     sectionWrapper.style.height = `${395 + wrapper.children.length * 20}px`;

    //   }

    // }

        }
        else if (e.pageY < wrapper.offsetTop) {
                for (var i2 = 0; i < wrapper.children.length; i2++) {
        wrapper.children[i].style.transform = `translateY(0px)`;
        sectionWrapper.style.height = `${395 + wrapper.children.length * 20}px`;
                }
        }
  else {
    body.style.overflow = 'auto';
    // // position = position < 400 * (wrapper.children.length - 1) - 1;

    // for (var i2 = 0; i < wrapper.children.length; i2++) {
    //     wrapper.children[i].style.transform = `translateY(-${(400 - 5) * wrapper.children.length}px)`;
    //     sectionWrapper.style.height = `${395 + wrapper.children.length * 20}px`;
    //   }
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
      body.addEventListener('wheel', e => myFunction(e, wrapper, body, sectionWrapper, scale));
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
            <img class="image" src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg" />
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
            <img class="image" src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg" />
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
            <img class="image" src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg" />
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
            <img class="image" src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StackedCards;