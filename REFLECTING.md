# vue-monitor

## RETROSPECTIVE

- Problem: Fix the bold font on `<p>` element.
- Link to the top of the page ist too small.
- Learned how to make image fill the entire width and height of the container

## REFLECTING: 23.10.2024

- Learned how to initiate Vue Router

## REFLECTING: 05.11.2024

- Label does not get aligned to the left when display flex used on parent element. It stays align in the middle/center. How to fix it?

1. Buttons and inputs still have outlines when focusing them with keyboard. DONE! We have to use `&` near each state e.g.

```css
&:hover,
&:active,
&:focus {
 outline: none;
}
```

## REFLECTING

- It is possible to wrap a router link around some content and style it just like a component

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

- How to set up projects in GitHub: Done!

- BUG: When exploring Charts.vue page with developer tools, the quarter-based chart do not expand to its original size after closing the dev tools. It stays shrinked. FIXED: by adding `class="h-[60rem]"` to the `<Chart>` properties. Find out more about it!

- Change Top reference cards content

### NOT SOLVED

- Preselect on `Select` to show the current status of a License. (optionValue with `const = statuses` was the solution). However it has now a bug, when creating a new item, selected status is not saved. I've deleted for now `optionValue`. Need another solution.

- CANNOT register new components!!!

- Add a clear button (option) to the search bar. (SOLVED partially. Button appears as expected and it resets the table, but the text in the input field stays, and it also clears all filter, so it is not possible to search any further until the page gets refreshed. Need to adjust the behavior.)

## BACKLOG

- While saving new expiry date, table shows an entire date including time.
- Add Filters from the first table.
- Weekly backups (overridden)

!IMPORTANT:

1. docker compose build
2. docker compose up -d

That way, we assure, that the latest image is on use.

TODO: ASK PAUL IF THIS IS GOING TO CONFLICT WITH IDS FROM HIS BACKEND

``` TypeScript
const createId = () => {
 let id = '';
 var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 for (var i = 0; i < 5; i++) {
  id += chars.charAt(Math.floor(Math.random() * chars.length));
 }
 return id;
};
```
