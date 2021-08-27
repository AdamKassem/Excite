# EXCITE
Beat cabin fever by experiencing dynamically generated schedules that take you through a day's worth of regional activities!

## Expo Go: 
https://expo.io/@imaadsyed/projects/exite

## Objective:
How long has it been since we’ve all had an adventure? With current affairs, exploring the outside world has become harder than ever. However, this is no longer the case with Excite - a mobile-app assisting our return to regular life! After months of isolation, users will be able to see, plan, and experience all the amazing opportunities around them. Tailored to each user’s needs, Excite sets up entire day plans which guarantee fun, leisure, and of course, excitement!

## Minimum viable product goals:
User Schedule:
-	Plan outings around user-entered schedule (weekly basis)
-	Potential use of user profiles

Event/Activity Scanning:
-	Scan a certain radius from the user's home for attractions, events, and unique activities

Chain Events:
-	Create 'day-plan' for users consisting of different genre chained events (ex. concert -> food -> park)

Rate Activities:
- Allow user to rate events/attractions through the app and carry them onto yelp or google reviews
- Display activity ratings within the app

## Stretch Goals:
- Allow user to share day-plans for other users to view and join
- Save entire day-plans or specific activities as ‘favorites’ for app to prioritize when setting up future day-plans.
- Select activity types based on factors such as time, day of the week, and crowdedness
- Factor in google ratings/reviews when selecting specific events within the plan

## Tech Stack (pending)
**IDEs:**
- [Android Studio](https://developer.android.com/studio) (built-in emulator)
- [Visual Studio Code](https://code.visualstudio.com/)

**Frameworks:**
- [React Native](https://facebook.github.io/react-native/)
    - React Native is an open-source mobile application framework created by Facebook, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use React's framework along with native platform capabilities.
- [Flutter](https://flutter.dev/)
    - Flutter is an open-source UI software development kit created by Google. It is used to develop applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia, and the web from a single codebase.
    - Potentially more compatible with google API services; however, if using other API resources then React Native will be prioritized.

**APIs:**
-	[Sygic Travel](https://travel.sygic.com/en/b2b)
    - Offers global tourism and travel data available as a consumable database. Over 20 million places from around the world are available. The places are ranked by popularity among travellers. Information such as location, description, photos, admission fees, tags and opening hours is included in the API.
    - Note: free version limited to 1000 API calls/month
-	Google API
    - Go to [Reverse Geocoding | Maps JavaScript API | Google Developers](https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse ) where your can use lat and long as input to this API, it will spit out an address in the response
    - Take this address and give it as input to [Place Search | Places API | Google Developers](https://developers.google.com/places/web-service/search) which will in turn spit out a list of points of interest (POI) along with an ID for each. If you want, filter your results basis the types found here: [Place Types | Places API | Google Developers](https://developers.google.com/places/web-service/supported_types)
    - (Optional Step) Take the POI ID list generated in step 2 and run it through [Place Details | Places API | Google Developers](https://developers.google.com/places/web-service/details) to get additional details such as user reviews
    - (Optional Step) Take the list generated in step 2 and find the ‘photoreference’ ID and run it through [Place Photos | Places API | Google Developers](https://developers.google.com/places/web-service/photos) to get an image of the POI. I believe that the image URL is also returned in step 3, place details

**Backend:**
- [Firebase](https://firebase.google.com/)
    - Manage personal user accounts through google email and personal password
    - Hold user schedule, visited locations, and selected day plans

## Learning Resources:
*shoutout to Cady!*
-   [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
-	[Choosing between React Native and Flutter](https://hackr.io/blog/react-native-vs-flutter)
-	[Getting started with React](https://facebook.github.io/react-native/docs/getting-started)
-	[Getting started with Flutter](https://flutter.dev/docs/get-started/install)
-	[Comparing top databases](https://dzone.com/articles/firebase-vs-mongodb-which-database-to-use-for-your)
-	[Connecting Flutter and Firebase](https://firebase.google.com/docs/flutter/setup)
-	[Connecting React Native and Firebase](https://blog.jscrambler.com/integrating-firebase-with-react-native/)
-	[Overview of making API calls](https://snipcart.com/blog/apis-integration-usage-benefits)


