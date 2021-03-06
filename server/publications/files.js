import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {is_allowed} from '/lib/access_control';


export default function () {
  Meteor.publish('file.list', function (filterText) {
    check(filterText, Match.Optional(String));
    if(is_allowed('file.list', this.userId)){
      if (filterText === '' || !filterText) {
        return Files.collection.find({});
      } else {
        return Files.collection.find({$or: [
          {_id: {$regex: filterText}},
          {name: {$regex: filterText}},
          {description: {$regex: filterText}},
        ]})
      }
    }else{
      this.stop();
    }
  });

  Meteor.publish('file.item', function (fileId) {
    check(fileId, String);
    if(is_allowed('file.item', this.userId)){
      return Files.collection.find(fileId);
    }else{
      this.stop();
    }
  });

  Meteor.publish('file.cover', function (albumId) {
    check(albumId, String);
    if(is_allowed('file.cover', this.userId)){
      var result = Files.collection.find({
        "meta.albumId": albumId,
        "meta.usage": "cover"
      });
      return result;
    }else{
      this.stop();
    }
  });

  Meteor.publish('file.covers', function () {
    if(is_allowed('file.covers', this.userId)){
      var result = Files.collection.find({
        "meta.usage": "cover"
      });
      return result;
    }else{
      this.stop();
    }
  });
}
