import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'video',
  attributeBindings: ['src', 'autoplay', 'controls'],

  autoplay: true,
  controls: true,

  src: Ember.computed.alias('model.streamURL')
});
