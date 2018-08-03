
# Vuejs
This coding style guide extends the [recommendations from Vuejs](https://vuejs.org/v2/style-guide/). If something is not mentionned refers youself to the Vuejs Guideline to make a decision.

It also serves as a reference on how to do certain things.

## IDE tools and extensions
* [Visual Studio Code](https://code.visualstudio.com/)

* [vuetify-vscode](https://marketplace.visualstudio.com/items?itemName=vuetifyjs.vuetify-vscode)
* [Vue 2 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
* [Advance New File](https://marketplace.visualstudio.com/items?itemName=dkundel.vscode-new-file)

* [Prettier](https://prettier.io/)
* [Eslint](https://eslint.org/)

## Structure of a Vuejs project
The structure is intended to organise logically the code. 

```
├── dist // generated
├── public
├── src
| ├── components
| ├── filters
| ├── helpers
| ├── plugins
| ├── router
| ├── vuex
| ├── App.vue
| └── main.js
└── tests
  ├── e2e
  └── unit
```
## Components
Components organsie the code by functionnality and exist to maximize code reuse.
```
├── base
└── user
  ├── Profile.vue
  └── ProfileApp.vue
```
All components suffixed by `App` combine other components to create a fully woring page or 'app' that is mapped to a route. A component can import component from an other component, typically headers would come from `base` components unless the header is so specific.

Often the `...App.vue` component are purely functional or `higher order` components and do not contain design but only a function that renders the elements while applying some logic

```js
import SimpleHeader from "@/components/base/SimpleHeader.vue";
import SiteFooter from "@/components/base/SiteFooter.vue";
import Login from "@/components/authentication/Login.vue";
import UserProfile from "@/components/user/Profile.vue";
import { mapGetters } from "vuex";

export default {
  name: "profile-app",
  components: { SimpleHeader, Login, UserProfile, SiteFooter },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated"])
  },
  render(h) {
    const tag = this.isAuthenticated ? "user-profile" : "login";
    return h(
      "div",
      {
        style: {
          width: "100%"
        }
      },
      [h("simple-header"), h(tag), h(SiteFooter)]
    );
  }
};
```
::: tip
the `h()` rendering function is a __convention__ 
:::

## Vuex 
Vuex is the the data store for the application, its the data layer. API calls happen in action files. Vuex is organised in modules. Each modules somewhat reflects the components structure.
```
├── modules
└── store.js
```
Module Structure:
```
└── module-name
    ├── actions.js
    ├── getters.js
    ├── mutation-types.js
    ├── mutations.js
    └── store.js
```
Each module should be:
* name spaced
* imported in the main store

```js{4}
    import moduleName from "./modules/module-name/store";
    export default new Vuex.Store({
        modules: {
            moduleName,
            // ...
```

`moduleName` will be the name space of the module. More on this below.

### Actions
Actions can be asynchronous. This is typically where API calls are done. Here is an example of an HTTP request that requires authentication.

```js{1,5}
export const getArticle = async ({ commit, rootState, state }) => {
  const type = state.type;
  const route = `training-data?type=${type}`;

  const { ok, response, error } = await sureThing(
    HTTP.get(route, {
      headers: {
        Authorization: `Bearer ${rootState.authentication.token}`
      }
    })
  );

  ok
    ? commit(types.SET_ARTICLE, response.data)
    : commit(types.SET_ERROR, error);

  commit(types.SET_TYPE, state.type === "content" ? "title" : "content");
};
```
Each action needs to be exported in order to be usable elsewhere in the app, notice the `async/await` keywords. `sureThing()` is a wrapper for HTTP requests catches errors. It allows to clean up functions.

### Getters
Getters are simple functions that transforms reactivly the data that is in the store.
```js
export const interestsMethods = state => {
  return state.interests.reduce((a, c) => {
    if (c.title === "methods") {
      a.push(c.values);
    }
    return a;
  }, [])[0];
};
```
Getters also need to be exported. To be available. 
### Mutations Types
Mutations Types allow to change the names of mutation and to set them in one place. This also serves as "documentations" as it list all the available mutations in a condensed manner.
```js
export const SET_USER = "SET_USER";
```
### Mutations
Mutations are synchronus. They just commit or save data to the store.
```js
export default {
  [types.SET_ERROR](state, data) {
    state.error = data;
  }
  // ...
```
You can do some transformation and or logic before saving if necessary. For example set a modification timestamp etc. 
### Store
The store puts together actions, mutations and getters here is an example:
```js
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

export default {
  namespaced: true,
  actions,
  getters,
  state: {
      error: null,
      // ...
  },
  mutations: mutations.default
};
```
Notice the namespaced properties set to true, this is mandatory. In the state object define all the variable that your component needs. Rember that in the end this create one store, so you do not need to repeat states, use it from other namespaced store by using the `rootState`.

Get a store value in an action:
```js
rootState.<name space>.<property>
```
Dispatch an action from the same module:
```js
dispatch("actionName", data);
```
Dispatch an action from an other module:
```js
dispatch("nameSpace/actionName", data, { root: true });
```
Commit data to the current store:
```js
commit(types.<TYPE>, data),
```
Commit data to an other store:
```js
commit("nameSpace/TYPE", data, { root: true })
```
### Import States, Getters, Actions in a vue compoenent
Vuex comes with nice short cuts to import methods
```js
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    computed: {
        ...mapState("nameSpace", ["stateName"]),
        ...mapState("otherNameSpace", ["stateName"]),
        ...mapGetters("nameSpace", ["getterName"]),
        // ...
    },

    methods: {
        ...mapActions("nameSpace", ["actionName"])
        //...
    }

```
## Filters
Filters are very useful as the allow to transform data just before displaying it `{{ stringVariable | toUppercase }}`. The `index.js` file is the main entry point of this module and just import and exports all the filters.
```
├── index.js
└── filterName.js
```
They are exported as an object so that we could destructure it while importing.

```js
import { slugify } from "./slugify";
import { upperCase, uperCaseEachWords, uperCaseFirstLetter } from "./toUpper";
export { slugify, upperCase, uperCaseEachWords, uperCaseFirstLetter };
```
This is important as it allows to import only what is necessary and therefore keep to the minimum the size of a component.
## Helpers

## Plugins

## Router
The router maps routes to components and applyse 'guards' to protect routes and redirect when necessary. If the router gets too big, it can be split in modules.
The `paths.js` is used to generate the main navigation. The idea is that this was replaced by an API call and the returned data cached locally. One of the @TODO is to generate routes based on the `path.js`
```
├── index.js
└── paths.js
```

## ESLint
Never disable eslint rules unless you have a good reason. You may see a lot of legacy files with /* eslint-disable some-rule, some-other-rule */ at the top, but legacy files are a special case. Any time you develop a new feature or refactor an existing one, you should abide by the eslint rules.

Never Ever EVER disable eslint globally for a file
```js
// bad
/* eslint-disable */

// better
/* eslint-disable some-rule, some-other-rule */

// best
// nothing :)
```

If you do need to disable a rule for a single violation, try to do it as locally as possible
```js
// bad
/* eslint-disable no-new */

import Foo from 'foo';

new Foo();

// better
import Foo from 'foo';

// eslint-disable-next-line no-new
new Foo();
```
When they are needed always place ESlint directive comment blocks on the first line of a script, followed by any global declarations, then a blank newline prior to any imports or code.
```js
// bad
/* global Foo */
/* eslint-disable no-new */
import Bar from './bar';

// good
/* eslint-disable no-new */
/* global Foo */

import Bar from './bar';
```
Never disable the `no-undef` rule. Declare globals with /* global Foo */ instead.

## Modules, Imports, and Exports
Use ES module syntax to import modules
```js
  // bad
  const SomeClass = require('some_class');

  // good
  import SomeClass from 'some_class';

  // bad
  module.exports = SomeClass;

  // good
  export default SomeClass;
```

Relative paths: when importing a module in the same directory, a child directory, or an immediate parent directory prefer relative paths. When importing a module which is two or more levels up, prefer either `~/` or `@/`. `@/` is an alias for `src`


In src/components/my-module/subdir:
```js
// bad
import Foo from '~/my-feature/foo';
import Bar from '~/my-feature/subdir/bar';
import Bin from '~/my-feature/subdir/lib/bin';

// good
import Foo from '../foo';
import Bar from './bar';
import Bin from './lib/bin';
```

In spec/javascripts:
```js
// bad
import Foo from '../../app/assets/javascripts/my-feature/foo';

// good
import Foo from '~/my-feature/foo';

When referencing an EE component:

// bad
import Foo from '../../../../../ee/app/assets/javascripts/my-feature/ee-foo';

// good
import Foo from 'ee/my-feature/foo';
```

Avoid using IIFE. Although we have a lot of examples of files which wrap their contents in IIFEs (immediately-invoked function expressions). They were used in the past to create scoped module. This is no longer necessary.

Avoid adding to the global namespace.
```js
  // bad
  window.MyClass = class { /* ... */ };

  // good
  export default class MyClass { /* ... */ }
```

Side effects are forbidden in any script which contains exports
```js
  // bad
  export default class MyClass { /* ... */ }

  document.addEventListener("DOMContentLoaded", function(event) {
    new MyClass();
  }
```

## Naming 
Extensions: Use `.vue` extension for Vue components. Do not use `.js` as file extension.
Reference Naming: Use PascalCase for their instances:
```js
// bad
import cardBoard from 'cardBoard.vue'

components: {
  cardBoard,
};

// good
import CardBoard from 'cardBoard.vue'

components: {
  CardBoard,
};
```
Props Naming: Avoid using DOM component prop names.

Props Naming: Use kebab-case instead of camelCase to provide props in templates.
```html
// bad
<component class="btn">

// good
<component css-class="btn">

// bad
<component myProp="prop" />

// good
<component my-prop="prop" />
```

## Alignment 
Follow these alignment styles for the template method:

With more than one attribute, all attributes should be on a new line:
```html
// bad
<component v-if="bar"
    param="baz" />

<button class="btn">Click me</button>

// good
<component
  v-if="bar"
  param="baz"
/>

<button class="btn">
  Click me
</button>
```

The tag can be inline if there is only one attribute:
```html
// good
  <component bar="bar" />

// good
  <component
    bar="bar"
    />

// bad
 <component
    bar="bar" />
```
Quotes 
Always use double quotes " inside templates.

// bad
template: `
  <button :class='style'>Button</button>
`

// good
template: `
  <button :class="style">Button</button>
`

## Props 
Props should be declared as an object
```js
// bad
props: ['foo']

// good
props: {
  foo: {
    type: String,
    required: false,
    default: 'bar'
  }
}
```

Required key should always be provided when declaring a prop
```js
// bad
props: {
  foo: {
    type: String,
  }
}

// good
props: {
  foo: {
    type: String,
    required: false,
    default: 'bar'
  }
}
```
Default key should be provided if the prop is not required. Note: There are some scenarios where we need to check for the existence of the property. On those a default key should not be provided.
```js
// good
props: {
  foo: {
    type: String,
    required: false,
  }
}

// good
props: {
  foo: {
    type: String,
    required: false,
    default: 'bar'
  }
}

// good
props: {
  foo: {
    type: String,
    required: true
  }
}
```
## Data 
data method should always be a function
```js
  // bad
  data: {
    foo: 'foo'
  }

  // good
  data() {
    return {
      foo: 'foo'
    };
  }
```

## Directives 
Shorthand @ is preferable over v-on
```html
// bad
<component v-on:click="eventHandler"/>

// good
<component @click="eventHandler"/>
```
Shorthand : is preferable over v-bind
```html
// bad
<component v-bind:class="btn"/>

// good
<component :class="btn"/>
```
## Closing tags 
Prefer self closing component tags

```js
// bad
<component></component>

// good
<component />
```
## Ordering 
### Tag order in .vue file
```html
<template>
  <!-- ... -->
</template>

<script>
  // ...
</script>

// We don't use scoped styles but there are few instances of this
<style>
  /* ... */
</style>
```
### Properties in a Vue Component
The linter enforces that. [Here](https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended) is the detail about that.
### :key 
When using v-for you need to provide a unique :key attribute for each item.

If the elements of the array being iterated have an unique id it is advised to use it:
```html
  <div
    v-for="item in items"
    :key="item.id"
  >
    <!-- content -->
  </div>
```
When the elements being iterated don't have a unique id, you can use the array index as the :key attribute
```html
  <div
    v-for="(item, index) in items"
    :key="index"
  >
    <!-- content -->
  </div>
```
When using v-for with template and there is more than one child element, the :key values must be unique. It's advised to use kebab-case namespaces.
```html
  <template v-for="(item, index) in items">
    <span :key="`span-${index}`"></span>
    <button :key="`button-${index}`"></button>
  </template>
```
When dealing with nested v-for use the same guidelines as above.
```html
    <div
      v-for="item in items"
      :key="item.id"
    >
      <span
        v-for="element in array"
        :key="element.id"
      >
        <!-- content -->
      </span>
    </div>
```