# ELSE Team HR Backend API

## Heroku commands

Add heroku as remote in git
```sh
git remote add heroku https://git.heroku.com/elseteam-hr.git
```

Deploy master to heroku
```shell
git push heroku master
```

Set environment variable:
```shell
heroku config:set VARIABLE=VALUE
```

Run knex migrations
```shell
heroku run knex migrate:latest
```

Set NODE_ENV
```shell
heroku config:set NODE_ENV=development|production
```

Run heroku logs
```shell
heroku logs --tail
```