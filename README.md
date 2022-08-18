# KFB frontend test

## Basic command overview

```bash
# Installs node modules
# This should be run during the initial setup, after branch switches and after merges.
yarn

# Starts the development server
yarn dev:kfb # starts KFB dev (http://localhost:8091/)
yarn dev:ssc # starts SSC dev (http://localhost:8092/)


# Checks the code for styling issues
yarn lint
# Fixes them if possible
yarn lint:fix
```

## Test scenario

Implement a component on the homepage, which shows the currently selected travel date.
Use the travelDate API service to fetch alternative travel dates. You must create a service method to fetch the
data from `https://mocki.io/v1/185679b9-8ed1-4080-9070-4034502b218d`.

Those dates should be displayed in a native HTML select using the following structure:

```
# Select option
<option>departureDate - arrivalDate / price €</option>

# Default option (not coming from the API, could be static):
departureDate: today
arrivalDate: today + 7 days
price: 213133
description: Lorem ipsum
```

The description should be displayed in a div somewhere underneath the selector.

When selecting an alternative travel date, the current selection should be updated. The dates must be formatted as
dd.mm.yyyy. Prices come as cent-based amounts (in Euro). Those must be formatted to german decimal representation.
Be aware, that the current selection can also be changed externally by resetting the component property.

To make use of our localization, create a `ComponentTranslationBundle` which translates the selector label
("Ausgewähltes Reisedatum"):

```
# Select label
Ausgewähltes Reisedatum: [SELECT]
```

To test translations, you can use the different dev environments (kfb/ssc).

Since we are using the BEM css methodology, make sure, that the components css is defined correctly using our
bem utility (`src/utilities/bem/bem.ts`). You only have to apply a grey background for the select element.
No more styling is required.
