# Editing the Avenall Site — A Practical Guide

This is a plain HTML/CSS site. No build step, no framework — what you see in
the files is exactly what gets published. That makes it very safe to edit:
if you can find the right sentence and change the words between the right
symbols, you're done.

## 1. The big picture

Each page you see on the live site is its own file:

| File | Page |
|---|---|
| `index.html` | Home |
| `technology.html` | Technology |
| `advantage.html` | The Advantage |
| `products.html` | Products |
| `science.html` | Science |
| `contact.html` | Contact |

`styles.css` controls colors, fonts, spacing, layout — everything visual.
`script.js` controls small behaviors (mobile menu, the splash screen, the
contact form). You'll almost never need to touch these two for a copy
change; 95% of your edits will happen inside the `.html` files.

## 2. Reading HTML: the one thing you need to understand

HTML is just text wrapped in **tags**. A tag is a word in angle brackets,
and most tags come in an opening/closing pair:

```html
<h1>A new generation of oats, featuring glove coatings and botanical extracts.</h1>
```

- `<h1>` — opening tag, says "a big heading starts here"
- `A new generation of oats...` — the actual text you read on the page
- `</h1>` — closing tag (note the `/`), says "the heading ends here"

**The rule that matters most: only edit the text between the tags.**
Leave the tags themselves (anything with `<` and `>`) exactly as they are,
including the closing tag. If you delete a `<` or a `>` by accident, or
delete a closing tag, the page can break.

Safe to change:
```html
<h1>THIS PART</h1>
<p>THIS PART TOO</p>
```

Don't touch (unless you specifically mean to):
```html
<h1 class="hero-title" style="color:red">...</h1>
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ leave this alone
```

## 3. The tags you'll actually run into on this site

- **`<h1>`, `<h2>`, `<h3>`, `<h4>`** — headings, biggest to smallest. Every
  page has one `<h1>` (the main headline) and several `<h2>`/`<h3>` for
  section titles.
- **`<p>`** — a paragraph of regular body text.
- **`<a href="...">link text</a>`** — a clickable link. The `href="..."`
  part is *where it goes* (don't touch it unless you're changing the
  destination); the text between `>` and `</a>` is what's visible and
  editable.
- **`<img src="..." alt="...">`** — an image. `src` is the file path,
  `alt` is a text description (used for accessibility, not usually
  visible) — both editable but only if you're changing which image shows.
- **`<div>` and `<span>`** — invisible containers used purely for layout.
  They don't mean anything on their own; ignore them and look for the
  actual text inside.
- **`<svg>...</svg>`** — an icon drawn in code (like the arrow icons next
  to buttons). These look intimidating but you'll never need to edit one
  by hand — just don't delete the whole block.

## 4. `class="..."` — what it is and why you can ignore it (mostly)

You'll see `class="btn btn-primary"` or similar constantly. A class is a
label that connects a piece of HTML to styling rules in `styles.css` (what
color it is, how much padding it has, etc.). **You don't need to
understand or edit these to change text** — just leave `class="..."` as-is
and edit the text like normal. If you ever *do* want to change a color or
spacing sitewide, that's a `styles.css` edit, which is a different (and
more advanced) kind of change than a copy edit.

## 5. Three places that look similar but do different jobs

This tripped us up once already, worth remembering:

```html
<title>Avenall™ | Fermented Oat Glove Coatings & Skincare</title>
<meta name="description" content="...">
```
```html
<h1>A new generation of oats, featuring glove coatings and botanical extracts.</h1>
```

- **`<title>`** (near the top, inside `<head>`) — shows in the **browser
  tab** and in **Google search results**. Keep this short (under ~60
  characters) and describe *what the business is*, since search engines
  cut it off.
- **`<meta name="description" content="...">`** — the little blurb Google
  shows under your title in search results. Also gets cut off if too long
  (~150-160 characters is the safe zone).
- **`<h1>`** — the actual big headline visitors read on the page itself.
  This is your marketing copy — can be as punchy/stylized as you want,
  length isn't as strict since it just wraps to multiple lines visually.

## 6. HTML entities — the weird `&something;` codes

Occasionally you'll see things like `&amp;`, `&nbsp;`, `&middot;` inside
text. These are how HTML writes characters it can't type directly:

- `&amp;` = `&`
- `&nbsp;` = a space that won't break onto a new line
- `&middot;` = `·` (a small dot, used in labels like "Before · Sanitizer")
- `&#8209;` = a non-breaking hyphen

Safe to leave alone, safe to delete if you don't want the effect (e.g.
deleting an `&nbsp;` just lets that spot wrap normally), just don't
retype them incorrectly (missing the `;` at the end will break it).

## 7. A worked example

Say you want to change the Products page subheading. Open `products.html`
in VS Code, use **Find** (Cmd+F) to search for a few words you remember
from the current text, e.g. "before and after every glove":

```html
<h1>Avenall™: before and after every glove.</h1>
```

Change only the part between `<h1>` and `</h1>`:

```html
<h1>Avenall™: your complete shift-long skincare system.</h1>
```

Save the file. That's the whole edit.

## 8. Publishing your change (recap)

1. Save the file in VS Code.
2. Open the **Source Control** panel (icon in the left sidebar, or
   Cmd+Shift+G).
3. You'll see the changed file listed. Type a short commit message
   (e.g. "Update Products subheading") in the box at the top.
4. Click the checkmark (✓) to commit.
5. Click **"Sync Changes"** (or **Push**) to send it to GitHub.
6. Give it about a minute — GitHub Pages rebuilds automatically, then
   `avenalloats.com` shows your change.

## 9. If something looks broken after an edit

The most common cause is a missing closing tag or a stray `<` / `>`. In
VS Code, HTML tags are color-coded and matching open/close tags highlight
together when you click near one — if you click right after an `<h1>` and
its matching `</h1>` *doesn't* highlight, that's usually your bug. Worst
case, everything is saved in git history — you can always undo by finding
the previous commit and reverting.
