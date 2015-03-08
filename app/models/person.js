import DS from 'ember-data';

export default DS.Model.extend({
  socketId: DS.attr('string'),

  stream: undefined,
  peer:   undefined,

  streamURL: (function() {
    return window.URL.createObjectURL(this.get('stream'));
  }).property('stream')
});
