import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const steps = [
  {
    selector: '.first-step',
    content: 'This is your daily water intake target.',

  },
  {
    selector: '.second-step',
    content: 'This is your water progress bar.',

  },
  {
    selector: '.third-step',
    content: 'Click here to add more water to your daily intake.',
  },
]

  export const disableBody = (target) => disableBodyScroll(target)
  export const enableBody = (target) => enableBodyScroll(target)