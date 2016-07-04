import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  Meteor.methods({
    'file.update'(file) {
        check(file, Object)
        var fileId = file._id;
        delete file._id;
        Files.collection.update(fileId, {$set: file})
    },
    'file.remove'(file) {
        check(file, Object)
        Files.remove(file._id)
    },
    'file.getIdOf'(action, file) {
        check(action, String)
        check(file, Object)

        function getItem (type) {
          var actions = {
            'next': () => {
              const result = Files.collection.find({uploadedAt: {$lt: file.uploadedAt}}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0]
              // if at the end ost list return first
              if(!result){
                // get first item
                return Files.collection.find({}, {sort: {uploadedAt: -1}}).fetch()[0];
              }
              return result
            },
            'previous': () => {
              const result = Files.collection.find({uploadedAt: {$gt: file.uploadedAt}}, {sort: {uploadedAt: 1}, limit: 1}).fetch()[0]
              // if at the end ost list return first
              if(!result){
                // get first item
                return Files.collection.find({}, {sort: {uploadedAt: 1}}).fetch()[0];
              }
              return result
            },
          };
          return actions[type]();
        }

        // get item
        return getItem(action)._id;
    },
  });
}
