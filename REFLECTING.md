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

## ISSUES

### SOLVED

- Add Expiring date on Modals. DONE!

- Paginator has rounded corners and table it self don't. DONE!

- Add all necessary Columns to adapt to needs of our firm. DONE!

- When creating new product/license, the width of selects for manufacturer and vendor are dynamic. Should be static. Was resolved trough: `grid, col-span and gap`. Example of it was already on the modal dialog with `price` and `quantity`. DONE!

- FIX the messages that are not appearing, when deleting, editing or saving changes on Licenses. The only thing was missing is `<Toast/>` right under the closing tag from `<DataTable></DataTable>`. DONE!

- WBS gets generated automatically, even when we put in our own one. PO behaves OK. Resolved trough deletion of `createID()` function, which was generation and saving a random ID and WBS in the `saveLicense()` function.

- Add Comments. Done!

- Actions Column is too wide. Need a find a way to make it as wide as content. Setting style="width: 1rem" on Actions Column did the job. DONE!

### NOT SOLVED

- Preselect on `Select` to show the current status of a License. (optionValue with `const = statuses` was the solution). However it has now a bug, when creating a new item, selected status is not saved. I've deleted for now `optionValue`. Need another solution.

- While saving new expiry date, table shows an entire date including time.

- CANNOT register new components!!!

- Add Filters from the first table.

- Change Top reference cards content
