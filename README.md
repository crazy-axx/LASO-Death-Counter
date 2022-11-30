# LASO-Death-Counter
Death counter for Halo LASO

All the files needed are included, in order to make this work there are a few steps needed.
1) install node js https://nodejs.org/en/download/
2) you need a local host server to run this on, I used npm http-server https://www.npmjs.com/package/http-server

(follow the install steps on their documentation)

3) you need icons for the players, in order to make them look good crop them into a square
4) place those icons in the icons folder within the LASO-Death-Counter folder, easy enough

I used the browser's inbuilt local storage in order to save the player's data. I probably will include a video of how to do that but ehre are the steps.

5) open up the hosted server, for me it is http://localhost:8080
6) open up the console (f12 on chrome, ctrl+shift+c for opera, and ctrl+shift+j on firefox)
7) navigate to the Application tab
8) look for local storage
9) you should be able to click into the local storage and add a key/value
10) the key doesn't matter, I used the player's name
11) the value should be a JSON object formatted like {"name":"PLAYER'S NAME", "icon":"/icons/ICON'S NAME", "curentDeaths":0, "totalDeaths":0, "currentTK":0, "totalTK":0}

After adding player's it should be fully functional. You can add as many potential players (stored in the local storage) as can fit on the page. Drag and drop the players onto the grey pads and hit the plus/minus to add team kills or deaths. I may include a video of that too, who knows.
