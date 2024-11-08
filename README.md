# vue-monitor

## RETROSPECTIVE:

- Problem: Fix the bold font on `<p>` element.
- Link to the top of the page ist too small.
- Learned how to make image fill the entire width and height of the container

## REFLECTING: 23.10.2024

- Learned how to initiate Vue Router

## REFLECTING: 05.11.2024

- Label does not get aligned to the left when display flex used on parent element. It stays align in the middle/center. How to fix it?

#TODO:

1.  Make `h3` element bigger and add "Remember me" with checkbox and forgot password container. Done!

2.  Find out how to change color of checkbox.
    Done with some crazy rules on lines `244` till `288`.

3.  Button and inputs still have outlines when focusing them with keyboard. DONE! We have to use `&` near each state e.g.

```
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
```
