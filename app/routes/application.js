/* global uuid */

import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    this.signUp();
    this.join();
  },

  signUp() {
    let person = this.get('store').createRecord('person', { id: uuid.v1() });

    this.set('session.person', person);
  },

  join() {
    // TODO: Firefox, Opera
    // TODO: make options configurable
    navigator.webkitGetUserMedia({ audio: true, video: { mandatory: { maxWidth: 640, maxHeight: 360, maxFrameRate: 15 } } }, (stream) => {
      this.get('session.person').set('stream', stream);

      this.controllerFor('peer').subscribe();

      this.transitionTo('people');
    }, (error) => {
      console.log(error.name + ': ' + error.message);
    });
  }
});
