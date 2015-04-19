/* global uuid */

import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    this.signUp();
    this.join();
  },

  signUp: function() {
    var person = this.get('store').createRecord('person', { id: uuid.v1() });

    this.set('session.person', person);
  },

  join: function() {
    // TODO: Firefox, Opera
    // TODO: make options configurable
    navigator.webkitGetUserMedia({ audio: true, video: { mandatory: { maxWidth: 640, maxHeight: 360, maxFrameRate: 15 } } }, (stream) => {
      this.get('session.person').set('stream', stream);

      this.controllerFor('peer').subscribe();

      this.transitionTo('people');
    }, function(error) {
      console.log(error.name + ': ' + error.message);
    });
  }
});
