# WeChatMiniAppSearcher

No more api for mini-app, so I have to use hooking instead.

Usage: frida -U 微信 -l miniapp-search.js --no-pause

Search anything first, and invoke click("**search_keywords**") to get some mini-app metadata.

Quite a pity that appid can't be obtained in this way. I'll leave the rest to uiautomator.
