# Chat application with AngularJS and Firebase

Please create an account on [Firebase](https://firebase.google.com) and create a new application. Copy the realtime database URL in your Application Settings page (such as https://<db-id>.firebaseio.com/) into file `app\scripts\controllers\chat.js`

```js
var fireBaseUrl = 'https://<db-id>.firebaseio.com/';
```

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Note

1) If you choose SCSS option for your style files, you may got the error **Warning: Running "compass:server" (compass) task** when running `grunt serve` or `grunt`. In order to solve this problem, please install Ruby and Compass gem on your machine.

I solved this problem on my Ubuntu with following commands:

```bash
sudo apt-get install ruby
sudo apt-get install ruby-compass
sudo gem install compass
```

2) Sometimes you are able to get the error message such as **"Client doesn't have permission to access the desired data"**, you should go to the Realtime Database section on your Firebase Settings page and change the configuration.

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

