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
    navigator.webkitGetUserMedia({ audio: true, video: true }, (stream) => {
      this.get('session.person').set('stream', stream);

      this.controllerFor('peer').subscribe();

      this.transitionTo('people');
    }, function(error) {
      alert(error.name + ': ' + error.message);
    });
  }
});
