# FiML

A machine-learning powered film recommender system. The aim of this app is to provide users with a highly customizable recommendation experience by:
- Allowing users to choose exactly what data goes into their recommendation (only submitted ratings are taken into account).
- Having recommendations respond to ratings immediately, through an adaptive ML model.
- (Future capability) 'Nudging' recommendations to take into account specific input movies and overall user taste (think I want to watch a gangster movie tonight!).
- (Future capability) Interactively visualizing relationships between different movies.

Web app build on React and Django, recommender model powered by the `reclibwh` library: https://github.com/whong92/recommender

## Demo

Demo of FiML in action. Recommendations are shown in the cards under `My recommendations`, with the blue bar underneath each card indicating the model's prediction of the user's preference. The recommendations are ranked by this preference.

![](demo.gif)

## Usage

#### Step 1: Build the react frontend
```
npm run build
```

#### Step 2: Database Migration
Depending on your database implementation of choice, configure the DATABASES section in settings.py.

For sqlite3 do:
```
# sqlite 3
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'), # or the location of your ssqlite database
    }
}
```

For postgres, make sure the RDBMS process is running and receiving connections, then do:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fiml',
        'USER': <username>,
        'PASSWORD': <password>,
        'HOST': <url>,
        'PORT': <port>,
    }
}
```

The Data for the `Film` model sould be populated with the following entries:
```
name = models.CharField(max_length=512) # movie name
dataset_id = models.IntegerField(unique=True, primary_key=True) # unique id of movie
created_at = models.DateTimeField(auto_now_add=True)
poster = models.CharField(max_length=512, blank=True, null=True) # movie poster path
desc = models.TextField(blank=True, null=True) # movie description
mean_rating = models.FloatField(null=False, default=0.) # average rating the movie received
```
You can do this by either directly inserting into the underlying database, or using the Django models api. Note that the same underlying database needs to be available to the recommender app.

#### Step 3: Run the Django backend
```
cd FiML
python manage.py migrate # apply migrations
python manage.py runserver # run the app
```

Configure recommender endpoint in settings.py. This is a app from https://github.com/whong92/recommender
```
RECOMMENDER_ENDPOINT = 'http://localhost:5000/' # if your recommender app is hosted on port 5000 locally for instance
```

#### Step 4: Browse
Visit `localhost:8000` to use the recommender!

## Notes and References

#### Setting up django with React
https://www.valentinog.com/blog/drf/

#### Using react-window to speed up react-select rendering of menu list:
https://github.com/JedWatson/react-select/issues/3128
https://codesandbox.io/s/lxv7omv65l?file=/index.js:305-323

#### Djoser for authentication
https://djoser.readthedocs.io/_/downloads/en/stable/pdf/