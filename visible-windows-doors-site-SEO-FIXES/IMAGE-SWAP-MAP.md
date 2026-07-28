# Image Swap Map — Visible Windows & Doors

This file documents every hero and gallery image currently in use, flags one confirmed data-integrity issue that was fixed, and lists what still needs client input. No image files were deleted or replaced in this pass — only HTML caption text was corrected where it was factually wrong.

## Fixed this pass (no approval needed — this was a bug, not a design choice)

The homepage gallery preview (`index.html`) reused 8 photos from the real project gallery (`projects.html`) but paired them with **different, inconsistent captions**, including two claiming out-of-state locations (Aspen, Colorado and Manhattan, New York) for a company positioned as Southern-California-only. The real gallery page had the correct captions for these same files all along. Corrected the homepage captions to match:

| Image file | Old homepage caption | Corrected caption (matches projects.html) |
|---|---|---|
| img-548b3868554b.jpg | Aspen, Colorado — European Window Install | Coronado, California — Door & Glazing Install |
| img-53bc6f2dd7b0.jpg | Crystal Cove, California — French Door Install | Los Angeles, California — Window Install |
| img-ba6459888013.jpg | Manhattan, New York — Service & Maintenance | San Diego, California — Bifold Patio Door Install |
| img-3f26150df796.jpg | Laguna Beach, California — Service & Maintenance | Irvine, California — Window Replacement |
| img-3e9d52203c2e.jpg | Stinson Beach, California — Sliding Door Install | Newport Beach, California — Glass Entry Door Install |
| img-9beaa16bab0f.jpg | Westlake Village, California — Installation | Beverly Hills, California — European Albertini Install |
| img-8ee8a2d7f6f1.jpg | Malibu, California — Installation | Malibu, California — Sliding Glass Door Install |
| img-de128bb99d58.jpg | La Jolla, California — Sliding Door Service | Santa Barbara, California — European Casement Install |

## Needs client confirmation

I cannot determine from the files alone which images are actual completed Visible Windows & Doors project photos versus licensed stock photography. Do not treat any image below as verified until you confirm it.

| Page | Current image(s) | Issue | Client approval needed? |
|---|---|---|---|
| Home hero | img-0efc155bb22d.jpg | Same hero image is reused identically on Home, Installation, and Lift-and-Slide Door Installation (3 pages). Not broken, but reduces visual distinctiveness between pages. | Yes — confirm this is a real project photo, and consider sourcing a second hero for one of the three pages. |
| Sales hero / Large-Opening Screens hero | img-96e8cca62fce.jpg | Same hero reused on both pages. | Yes — same as above. |
| Home "Why Visible" section | img-ba6459888013.jpg | Reused a third time here (also used in the gallery grid on the same page). | Yes |
| All 34 gallery images (projects.html) | img-53bc6f2dd7b0.jpg through img-1f79e38ba234.jpg | Captions all claim specific Southern California cities (Los Angeles, San Diego, Malibu, Beverly Hills, etc.) with no visible evidence in the codebase of which, if any, are stock photography rather than real completed jobs. | Yes — please confirm which of these 34 are real Visible project photos. Any that are stock should either be removed or have their location claims removed, per your own instruction not to caption stock photos with fake project locations. |
| About page | (no dedicated hero image currently) | Spec calls for an About hero; none is currently set. | Needs a photo selection from you if you want one added. |
| Service & Maintenance page | (no dedicated hero image currently) | Spec calls for a Service hero; none is currently set. | Needs a photo selection from you if you want one added. |

## Recommended crop / format guidance (for any new images supplied)

- Page heroes: 16:9 or wider, minimum 1600px wide, so they crop cleanly behind the scrim text overlay.
- Gallery grid tiles: roughly 4:3, minimum 800px wide.
- All new images should ship as optimized WebP with a JPEG fallback, and every `<img>` should keep explicit `width`/`height` attributes (already standard practice across this codebase) to avoid layout shift.

## What I did NOT do

- Did not delete or replace any image file.
- Did not invent new captions, locations, or project descriptions beyond correcting the 8 entries that already had a verified-accurate version elsewhere in the same codebase.
- Did not add stock photography.

---

## Revision Pass 2 addendum

The sales page rebuild, the expanded screens and lift-and-slide pages, the new specialty repair page, and the homepage card refresh reuse existing images from the same 37-image pool documented above (no new files were added). All of the confirmation notes above still apply — none of these are confirmed as real client project photos yet.

New placements added this pass:

| Page | Section | Image used |
|---|---|---|
| sales.html | Product category cards (6) | img-2f48528e04f7.jpg, img-e7fe62e688ea.jpg, img-e963d5f5001a.jpg, img-c4764de3a5f0.jpg, img-1f79e38ba234.jpg, img-de128bb99d58.jpg |
| sales.html | Windows section | img-2a0ecb37a23a.jpg |
| sales.html | European systems section | img-a6b99717f688.jpg |
| sales.html | Related projects gallery (6) | img-bb49fc1b7cca.jpg, img-d71c13ffa07f.jpg, img-437a4bd085e3.jpg, img-8b1c421b064c.jpg, img-de128bb99d58.jpg, img-1e504908a9c6.jpg |
| large-opening-screens.html | Selection-considerations section | img-9a6aa76ef2f9.jpg |
| large-opening-screens.html | Project gallery (3) | img-1f79e38ba234.jpg, img-e963d5f5001a.jpg, img-ba6459888013.jpg |
| specialty-window-door-repair.html | Hero | img-9a6aa76ef2f9.jpg |
| index.html (homepage) | 4 core-service cards | img-47355df79f8d.jpg, img-8b1c421b064c.jpg, img-1f79e38ba234.jpg, img-9a6aa76ef2f9.jpg |

Note: several images are reused across 2-3 placements given the limited pool. This is a placeholder strategy, not a final design decision — once you confirm which photos are real completed Visible projects, each of these slots should get a distinct, verified image rather than a shared one.
