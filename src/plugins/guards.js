// use this globally for each route
// imported into main.js file
// checks weather the user is logged in or not and what should happen depending on the route meta data
// requires visitor only allows those that are not logged in to view
// requires auth only allows routes that contain the requires auth meta and is logged in
// password reset is always allowed to be viewed however requires token in which is checked on that view passwordreset.vue
export function beforeEachCustom(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      var token = store.getters.loggedIn;
      if (!token || token == null || token == undefined ) {
        next({
          path: '/login',
        })
      } else {
        next()
      }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (token || token != null || token != undefined) {
        next({
          path: '/documents',
        })
      } else {
        next()
      }
    }
}