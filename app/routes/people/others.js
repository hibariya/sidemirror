import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('people').rejectBy('id', this.get('session.person.id'));
  }
});
