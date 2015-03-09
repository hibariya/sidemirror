import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('people').rejectBy('id', this.get('session.person.id'));
  }
});
