# Infinite Marquee

Configurable package to create an infinite marquee effect. Animated with either CSS or JS.

## Installation

```bash
npm i infinite-marquee
# or
yarn add infinite-marquee
```

## Basic Usage

#### HTML

```html
<div class="marquee">
  <div class="marquee-inner">
    <div class="marquee-content">EXAMPLE</div>
  </div>
</div>
```

#### CSS - Add the base styles to your CSS file.

[`infinite-marquee.css `](https://github.com/JamesHRowe/infinite-marquee/blob/main/assets/css/infinite-marquee.css)
OR
`@import 'infinite-marquee/assets/css/infinite-marquee`

### Zero Config

```javascript
import InfiniteMarquee from 'infinite-marquee'

new InfiniteMarquee()
```

## Options

| Option          | Type          | Default                              | Description                                                                              |
| :-------------- | :------------ | :----------------------------------- | :--------------------------------------------------------------------------------------- |
| `el`            | `HTMLElement` | `document.querySelector('.marquee')` | Container element.                                                                       |
| `direction`     | `string`      | `left`                               | Animation direction.                                                                     |
| `duration`      | `number`      | `5`                                  | Animation duration in seconds.                                                           |
| `css`           | `boolean`     | `true`                               | Whether to animate using CSS. If false [GSAP](https://greensock.com/gsap/) will be used. |
| `disableResize` | `boolean`     | `false`                              | Disable internal window resize event so an external one can be used.                     |

## Methods

| Method     | Description                      |
| :--------- | :------------------------------- |
| `onResize` | Call the internal resize method. |
| `update`   | Recaculate DOM.                  |

## Properties

| Method      | Description                                                                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation` | With `{css: false}` this will return a GSAP [fromTo](<https://greensock.com/docs/v3/GSAP/gsap.fromTo()>) instance that can be controlled using all of GSAPs methods. |

## Advanced Usage

### Options Example

```HTML
<div class="marquee my-marquee">
    <div class="marquee-inner">
        <div class="marquee-content">
            EXAMPLE
        </div>
    </div>
</div>
```

```javascript
import InfiniteMarquee from 'infinite-marquee'

new InfiniteMarquee({
    el: document.querySelector('.my-marquee')
    direction: 'right',
    duration: 5
})
```

### Usage with external window resize

For if you would like to batch resizes using an external resize event.

> ⚠️ I recommend using a debounce on an external resize to maximise performance. Internally this package uses the [lodash](https://lodash.com/docs/4.17.15#debounce) debounce utility.

```javascript
import InfiniteMarquee from 'infinite-marquee'

const marquee = new InfiniteMarquee({
  disableResize: true
})

window.addEventListener(
  'resize',
  () => {
    marquee.onResize()
  },
  { passive: true }
)
```

## Notes

> ⚠️ If your content DOM is modified after load e.g. fonts, images being lazyloaded. Please look into initialising your instance after these have loaded OR calling the `update` method to recalculate the marquee. Below are some package recommendations that might help with this.

- Images - [imagesloaded](https://imagesloaded.desandro.com/)
- Fonts - [fontfaceobserver](https://fontfaceobserver.com/)
