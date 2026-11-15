# Automotive Engineering Console — local design study

This is a review-only prototype on `design/profile-aqua-orange-prototype`, based on `docs/profile-redesign-2026` at e3aa10e. Branch publication is solely for prototype review; no production implementation or merge is authorized. Production files are unchanged.

## Recommendation

Choose **Concept A / Automotive Wireframe Console** with **bare outline icons**. The vehicle illustration and local reference frame communicate engineering before the visitor reads the project list. The split name is prominent at mobile width. Concept B / Automotive ASCII Console is a credible alternative for a stronger software identity, but conveys less mechanical detail.

Bare icons work better at the README's actual 28–32 px sizes: containers add visual weight, spacing and another border beside the existing card outlines. Both options appear at equal image sizes in the comparison sheets. Containers are a preview treatment, not baked into icon files.

## Visual concept and references

A structured instrument-workbench aesthetic: a window header, two intentional information regions, generous text space and an original isometric vehicle. Aqua Launch's source and README from Jenesyx/pretty-github were inspected for terminal structure and ASCII presentation. No template artwork, portrait, animation or code was copied. Bombshell's minimalist principles are interpreted from the supplied brief; its original artwork was not retrieved or copied. Orange technical drawing replaces aqua glow. No simulated telemetry values or unsupported live-system claims appear.

## Color and typography

| Role | Light | Dark |
| --- | --- | --- |
| Background | #FAFAF9 | #090B0F |
| Text | #18181B | #F5F5F4 |
| Primary orange | #C2410C | #FF8A3D |
| Secondary orange | #EA580C | #FB923C |
| Muted text | #64748B | #94A3B8 |
| Border | #D6D3D1 | #30343B |

Large Arial/Helvetica typography establishes identity in A; monospace labels use Consolas/Liberation Mono. B uses monospace throughout, with a manually authored ASCII vehicle. Font fallbacks are intentional; no external font request is required. Small terminal labels and domain pills are secondary details: at phone width they become small, while the name stays prominent. The full positioning is repeated as readable README text and banner alternative text.

## Icons and content

Ten transparent, rounded outline symbols share 100×100 viewBoxes, matching effective stroke weight and theme-aware orange. VECTOR is a newly simplified local three-axis frame with a small chassis; ORBIT is a pill and single orbital loop/status dot. The original locomotive path geometry is retained. Home Heating and THERMA use distinct residential and technical-envelope symbols. Existing clear engineering geometry is retained for continuity; no imagery or external dependencies are embedded.

README content comes from the current production README, including all project limitations, Codex acknowledgment, technical tags and colored Shields badges. VIBRA retains its implementation-branch link. The two-column project tables are preserved. On mobile they remain narrow columns and consequently tall; GitHub strips arbitrary layout CSS, so automatic card stacking cannot be promised. A production decision could instead use ordinary single-column headings, at the cost of desktop density.

## GitHub compatibility and motion

Both heroes are standalone SVGs with internal `prefers-color-scheme` CSS and one slowly pulsing decorative status dot. There is no JavaScript, external font, foreignObject, filter or glow. `prefers-reduced-motion: reduce` disables the pulse. Complete static alternatives are included as `banner-wireframe-static.svg` and `banner-ascii-static.svg`; their content is visible without animation.

Browser tests exercise SVGs embedded as README images in light/dark schemes. GitHub's theme choice, inherited `color-scheme`, caching and image processing can affect results; the live GitHub page has not been changed or tested with this prototype. If automatic switching is inconsistent in production, a compatible alternative is a `<picture>` with dark/light `source media="(prefers-color-scheme: …)"` and explicit static SVG variants. It is more predictable to inspect but duplicates assets and still depends on the viewer's color-scheme preference. Do not substitute it without review.

The preview renderer uses GitHub-like width, borders, fonts and table layout; it is not GitHub's renderer. Animation is decorative and not relied on for content; screenshots capture one phase. Avoid declaring it supported on GitHub until reviewed there.

## Rendering and validation

All generated assets and preview images are in this directory. Chromium rendered both heroes, both full README themes and 390px mobile layouts. All images loaded, no horizontal overflow occurred, hero text remained within bounds, and reduced-motion disabled the pulse. All ten icons appear at 24/30/64px in bare/container comparisons. SVG XML, image references, badge syntax and repository links are checked separately. Production README/SVG bytes are unchanged.

The 29 badge images in previews are generated locally with the official Shields `badge-maker` package and Simple Icons. Original HTTPS Shields.io URLs remain in README; live badge endpoint responses are not claimed. Current-versus-prototype comparison uses the preserved current design's previously rendered full README at the same width. Both columns are labelled.

`render-readme.mjs` and `render-comparisons.cjs` record the rendering procedure for this workspace; they reference existing Playwright, marked, sharp and temporary badge-maker/Simple Icons installations. These paths are environment-specific, not portable setup instructions. A future export should pin dependencies and configure paths without altering the production repository.

## Preview index

- [Concept A — light](previews/concept-a-light.png), [dark](previews/concept-a-dark.png)
- [Concept B — light](previews/concept-b-light.png), [dark](previews/concept-b-dark.png)
- [Full README — light](previews/readme-light.png), [dark](previews/readme-dark.png)
- [Mobile — light](previews/mobile-light.png), [dark](previews/mobile-dark.png)
- [Icon and container comparison — light](previews/icons-light.png), [dark](previews/icons-dark.png)
- [Current vs prototype](previews/before-after.png)

Measured base text/accent contrast against the hero background (excluding antialiasing):

Light: primary text 16.96:1, muted text 4.56:1, orange 4.96:1.

Dark: primary text 18.05:1, muted text 7.68:1, orange 8.4:1.
