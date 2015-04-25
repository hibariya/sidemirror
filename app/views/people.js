/* global Hammer */

import Ember from 'ember';

export default Ember.View.extend(Ember.TargetActionSupport, {
  classNames: ['people-view'],

  initializeGestureHandler: function() {
    this.hammer = new Hammer.Manager(this.element, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
      ]
    });

    this.hammer.on('swiperight', () => {
      this.transitionToRoute('people.index');
    });

    this.hammer.on('swipeleft', () => {
      this.transitionToRoute('people.others');
    });
  }.on('didInsertElement'),

  finalizeGestureHandler: function() {
    this.hammer.destroy();
  }.on('willDestroyElement'),

  transitionToRoute() {
    let router = this.get('controller.container').lookup('router:main');

    router.transitionTo(...arguments);
  }
});
