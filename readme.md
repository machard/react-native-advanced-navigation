React Native Advanced Navigation
===================

This example app shows some patterns I came up with when writing RN apps. The goal was to make my life easier and be quicker by avoiding to loose time with navigation.

- 2 default app patterns (side menu and tabbar)
- Navbar <-> scene binding (https://github.com/facebook/react-native/issues/2615)
- Lazy rendering
- Easy transitions and in app navigation
- Scenes onFocus, onBlur, onWillFocus, onWillBlur helpers
- Big lists do not break fluid navigation. (related to https://github.com/facebook/react-native/issues/4359)
- Use of removeClippedSubviews do not render blank lists. (https://github.com/facebook/react-native/issues/1831)

All the core logic is in src/navigation. src/archi is an abstraction on top of it to make the real app code (/src/containers) really easy.
I released it as an app example but it may become a npm module if it meets demand.
All of this is made using the builtin < Navigator /> Component. So it works with Android too.


----------

Lazy Rendering
-------------

Scene are rendered for the first time when they have the focus (when scene transition is over). It can be disabled by removing the waitForFocus property.

It avoids to :
* mount all scenes (accessible from the nav bar) at the same time. App is directly responsive.
* break the push animation if the view is hard to render.

I still need to implement the api to specifiy a custom loader component to render in the meantime.

![Lazy rendering](/gifs/lazyrender.gif?raw=true)

App Patterns
-------------

![App patterns](/gifs/multiarchi.gif?raw=true)

Scene Binding
-------------

![Lazy rendering](/gifs/binding.gif?raw=true)

In App navigation
-------------

![Transitions](/gifs/transitions.gif?raw=true)

Big List
-------------

![Big list](/gifs/biggrowinglist.gif?raw=true)


----------


Some todos
-------------
* ability to show/hide the bar(s) every time. currently it’s only possible between views transition.
* api to specify custom loader component for lazyrendered view
* add other navigation patterns
* assert that there is only ONE NavigationSetting per route.
* Update list example with what come up from https://github.com/facebook/react-native/issues/4359 to handle more than 100 shuffling rows
* Modal patterns
* Tests/cleanup