# Youtube Shorts Redirector & Hider

A lightwieght userscript that removes Youtube Shorts from your browsing experience.

## What it does
- **Hides Shorts:** Removes the Shorts shelves from the Youtube homepage and subscriptions feed
- **Removes the Sidebar Button:** Hides the "Shorts" link in the left-hand navigation menu
- **Redirects Links:** If you somehow click a Shorts link, it automatically redirects you from '/shorts/VIDEO_ID' to the standard video player ('/watch?v=VIDEO_ID')
- **Shows Real Dates:** Replaces relative timestamps like "1d ago" with the actual calendar date (e.g., "Nov 11, 2026").

## Where it runs
This script runs on 'https://www.youtube.com/*'

## How to install
1. Install a usercript manager like [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tapermonkey](https://www.tapermonkey.net) in your browser
2. **CRUCIAL STEP FOR CHORME USERS**: Chrome disables userscripts by default. Go to 'chrome://extensions', fidn your userscript manager, click **Details**, and turn on the **"Allow User Scripts"** toggle. (If you skip this, the script will silently do nothing)
3. Click the install link below
- **[Install from Greasy Fork](https://greasyfork.org/en/scripts/604999-youtube-enhancer-no-shorts-real-dates)**

## How to test it
1. Go to [Youtube](https://www.youtube.com)
2. Look at the homepage: The Shorts shelf should be completely gone
3. Look at the left sidebar The Shorts button should be missing
4. Paste a shorts link into your address bar (e.g., 'https://www.youtube.com/shorts/dQw4w9WgXcQ'). It should automatically reload as a normal video page.

## Feedback & Issues

Found a bug or have a feature request? Here is how you can let me know:

- **GitHub:** If you have a GitHub account, please [open an issue](github.com/jmesidor37/youtube-enhacer-userscript/issues) on this repository. 
- **Greasy Fork:** You can also leave a comment or report a bug in the **Feedback** tab on the Greasy Fork listing page.

## Known limitation
Youtube frequently updates its website code. If Youtube changes how their shleves or sidebar links are built, the sript's CSS slectors may need updating.

## Source code
The source code is public and readable in this repository [youtube-enhancer-usercript](https://github.com/jmesidor37/youtube-enhancer-userscript/blob/main/youtube-enhancer.user.js)
