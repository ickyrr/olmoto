const acl = {
  "routes": [
    { "name" : "file.edit",
      "roles" : ["Admin"] },
    { "name" : "user.list",
      "roles" : ["Admin"] },
    { "name" : "event.edit",
      "roles" : ["Admin"] },
    { "name" : "page.edit",
      "roles" : ["Admin"] },
  ],
  "actions": [
    { "name" : "event.remove",
      "roles" : ["Admin"] },
    { "name" : "event.update",
      "roles" : ["Authenticated"] },
    { "name" : "event.insert",
      "roles" : ["Admin"] },

    { "name" : "event.list",
      "roles" : ["Authenticated"] },
    { "name" : "event.item",
      "roles" : ["Authenticated"] },
    { "name" : "event.getIdOf",
      "roles" : ["Authenticated"] },

    { "name" : "file.remove",
      "roles" : ["Authenticated"] },
    { "name" : "file.update",
      "roles" : ["Authenticated"] },
    { "name" : "file.upload",
      "roles" : ["Authenticated"] },

    { "name" : "file.list",
      "roles" : ["Authenticated"] },
    { "name" : "file.item",
      "roles" : ["Authenticated"] },
    { "name" : "file.cover",
      "roles" : ["Authenticated"] },
    { "name" : "file.covers",
      "roles" : ["Authenticated"] },
    { "name" : "file.getIdOf",
      "roles" : ["Authenticated"] },

    { "name" : "user.insert",
      "roles" : ["Admin"] },
    { "name" : "user.update",
      "roles" : ["Admin"] },
    { "name" : "user.remove",
      "roles" : ["Admin"] },

    { "name" : "user.list",
      "roles" : ["Admin"] },
    { "name" : "user.participants",
      "roles" : ["Authenticated"] },

    { "name" : "page.insert",
      "roles" : ["Admin"] },
    { "name" : "page.update",
      "roles" : ["Admin"] },
    { "name" : "page.remove",
      "roles" : ["Admin"] },

    { "name" : "page.item",
      "roles" : ["Public"] },
  ]
}

function log(level, result, object, name, userId, message){
  Meteor.call('log.insert', level, result, object, name, userId, message, (err, res) => {
    if (err) {
      console.log(err.message)
    }
  });
}

export function is_allowed(action, userId) {
  var roles = _.findWhere(acl.actions, {name: action}).roles;
  if (Meteor.isServer) {
    var user = Meteor.users.findOne(userId);
  }else{
    var userId = Meteor.userId();
    var user = Meteor.user();
  }
  var admin = user ? user.admin : null;
  if(_.contains(roles, "Authenticated") && userId){
    log("info", "allow", "action", action, userId)
    return true;
  }
  if(_.contains(roles, "Admin") && admin){
    log("info", "allow", "action", action, userId)
    return true;
  }
  if(_.contains(roles, "Public")){
    log("info", "allow", "action", action, userId)
    return true;
  }
  log("warning", "deny", "action", action, userId)
  return false;
}

export function cannot_access(routename, userId) {
  var roles = _.findWhere(acl.routes, {name: routename}).roles;
  if (Meteor.isServer) {
    var user = Meteor.users.findOne(userId);
  }else{
    var userId = Meteor.userId();
    var user = Meteor.user();
  }
  var admin = user ? user.admin : null;
  var result = true;
  if(_.contains(roles, "Authenticated") && userId){
    log("info", "allow", "route", routename, userId)
    result = false;
  }
  if(_.contains(roles, "Admin") && admin){
    log("info", "allow", "route", routename, userId)
    result = false;
  }
  if(_.contains(roles, "Public")){
    log("info", "allow", "route", routename, userId)
    result = false;
  }
  if(result){
    log("warning", "deny", "route", routename, userId)
  }
  return result;
}

export function can_view_component(routename, component) {
  var roles = _.findWhere(acl.routes, {name: routename}).roles;
  var userId = Meteor.userId();
  var user = Meteor.user();
  var admin = user ? user.admin : null;
  if(_.contains(roles, "Authenticated") && userId){
    return true;
  }
  if(_.contains(roles, "Admin") && admin){
    return true;
  }
  if(_.contains(roles, "Public")){
    return true;
  }
  return false;
}
