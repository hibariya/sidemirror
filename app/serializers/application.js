import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serialize: function(record) {
    var json = this._super.apply(this, arguments);

    json.id = record.id;

    return json;
  }
});
