# ERS Documentation Project

## Installation

```
$ git clone <this repo> <target folder>
```

```
$ npm install -g vuepress
```

## Add content

1. Run the project `npm run docs:dev`
2. add folders and markdown `.md` files, you can create vuejs components as the `Foo.vue` example in the `.vuepress` the insert it anywhere with <foo/>
3. menu are congigured in `config.js`
4. when happy with your changes
    1. `$ git add -A` (or `$ git add --all .`)
    2. `$ git commit -m"describe your change"`
    3. `$ git pull origin master` you might need to resolve conflicts then
    3. `$ git push origin master`

From here everything is handled for you. It takes about 4 minutes (time to build and go through the automated process) and changes will be online.

if you want to do a lot of changes you could do a branch:

1. `$ git checkout -b <name of the branch>`
2. work and do your commits
3. `$ git pull origin master` solve potential conflicts
4. `$ git checkout master`
5. `$ git merge <name of the branch>`
6. `$ git push origin master`

