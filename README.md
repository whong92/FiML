# FiML

A machine-learning powered film recommender system.

Web app build on React and Django, recommender model powered by the `reclibwh` library: https://github.com/whong92/recommender

## Usage

Build the react frontend
```
npm run build
```

Run the Django backend:
```
cd FiML
python manage.py runserver
```

Visit `localhost:8000` to use the recommender!

## Demo

Demo of FiML in action. Recommendations are shown in the cards under `My recommendations`, with the blue bar underneath each card indicating the model's prediction of the user's preference. The recommendations are ranked by this preference.

![](demo.gif)