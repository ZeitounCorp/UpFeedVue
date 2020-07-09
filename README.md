# UpFeed
NB: Every requirements and bonuses have been done, it approximately took me 7 hours for the whole thing.
Hope you'll enjoy

Requirements & Guides:
This app contains one main view - the Activities view. -DONE-
The main activities feed you should be using is the Activities V1 API. -DONE-
When the user clicks on the 'View work' link on an activity, it should open a modal as seen on the Zoom screenshot. This modal shows the activity info plus the teacher comment on that activity. -DONE-
The app should support direct access to the zoom view via your router. -DONE-
The activities timeline should be grouped and ordered by months as seen in the Activities view screenshot. -DONE-
Each activity has its own set of attributes that determine the way it is rendered. Available activities and their attributes are listed in the Activity Types and Settings section. -DONE-
The app should support two types of filters:
Free text filter
Activity type filter
The app should display 10 activities at a time and support pagination for loading additional ones in the form of a 'Load more' button.
No additional API calls are required for that, you already have all the info you need. -DONE-
There are two products variants. 'bp' and 'bpjr'. The product affects the topic icon rendering as seen in the Activities view screenshot. -DONE-

Bonus
Have the app support another feed, Activities V2 API, that is structured differently. Same data, but a different structure. Make sure your code supports both structures from API #V1 and API #V2. Create a new route that demonstrates this support. -DONE-
Add support for hiding activities. Every activity row should have a hide icon that hides it when clicked. This hidden state should be persistent. -DONE-
Add autocomplete support to the text filter input. -DONE-
Use the topics names from your main API V1 feed to generate the autocomplete items list. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
