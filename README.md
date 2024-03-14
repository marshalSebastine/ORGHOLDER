How to deploy in Local ???

    Step 1: Take build of react app. steps to follow.
        • cd in to "client" directory and run "npm i", followed by "npm run build"
    Step 2: Deploy server in localhost. Steps to follow.
        • cd in to "server" directory and run "npm i", followed by "npm run start"
    Finally, app will be listening  at "http://localhost:8000"

How to validate the app?
     
      Step 1: Seed the app.
        • cd in to "server" directory and run "node seed.js" to seed the atlas mongo db. Take note of the console output.
            From this output take note of "organisationName", "mailId", "password", etc... to give as input on later validations....
      Step 2: Go to "http://localhost:8000" and validate by inputing the valid data.
  

  
