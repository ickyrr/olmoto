import {Pages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.methods({
    'page.update'(page) {
        check(page, Object)
        if(!is_allowed('page.update', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        var pageId = page._id;
        delete page._id;
        Pages.update(pageId, {$set: page})
    },
    'page.insert'(page) {
        check(page, Object)
        if(!is_allowed('page.insert', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        return Pages.insert(page)
    },
    'page.remove'(page) {
        check(page, Object)
        if(!is_allowed('page.remove', this.userId)){
          throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
        }
        Pages.remove(page._id)
    },
  });
}
